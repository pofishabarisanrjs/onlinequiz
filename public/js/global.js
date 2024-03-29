;(function( $ ) {

	function debounce( callback, time ) {
		var timeout;

		return function() {
			var context = this;
			var args = arguments;
			if ( timeout ) {
				clearTimeout( timeout );
			}
			timeout = setTimeout( function() {
				timeout = null;
				callback.apply( context, args );
			}, time );
		}
	}

	function handleFirstTab(e) {
		var key = e.key || e.keyCode;
		if ( key === 'Tab' || key === '9' ) {
			$( 'body' ).removeClass( 'no-outline' );

			window.removeEventListener('keydown', handleFirstTab);
			window.addEventListener('mousedown', handleMouseDownOnce);
		}
	}

	function handleMouseDownOnce() {
		$( 'body' ).addClass( 'no-outline' );

		window.removeEventListener('mousedown', handleMouseDownOnce);
		window.addEventListener('keydown', handleFirstTab);
	}

	window.addEventListener('keydown', handleFirstTab);

	// Fit slide video background to video holder
	function resizeVideo() {
		var $holder = $( '.videoHolder' );
		$holder.each( function() {
			var $that = $( this );
			var ratio = $that.data( 'ratio' ) ? $that.data( 'ratio' ) : '16:9',
				width = parseFloat( ratio.split( ':' )[0] ),
				height = parseFloat( ratio.split( ':' )[1] );
			$that.find( '.video' ).each( function() {
				if ( $that.width() / width > $that.height() / height ) {
					$( this ).css( { 'width': '100%', 'height': 'auto' } );
				} else {
					$( this ).css( { 'width': $that.height() * width / height, 'height': '100%' } );
				}
			} );
		} );
	}

	function AjaxNew(data, $buttonWrapper, $insightsList, isMore = false) {
		$.ajax( {
			url: ajax.url,
			type: 'POST',
			data: data,
			success: function( resp ) {
				if (resp.html) {
					if (isMore) {
						$insightsList.append(resp.html);
						$('#loadmore').attr('data-paged', data.offset);
					}
					else {
						$insightsList.html(resp.html);
						$('#loadmore').attr('data-paged', 1);
					}
				}
				if ( resp.last_page ) {
					$buttonWrapper.hide();
				}
				else {
					$buttonWrapper.show();
				}
				// console.log(resp.paged);
			},
			error: function( err ) {
				console.log( err.textStatus );
			}
		} );
	}

	// Load more
	$( document ).on( 'click', '#loadmore', function( e ) {
		var $insightsList = $( '.insights__list .grid-x' );
		var $this = $( this ), $buttonWrapper = $this.closest( '.posts-list__more' );
		var data = {
			'action': 'load_more_posts',
			'nonce': ajax.nonce,
			'terms': $('.insights-is-active').data('term'),
			'offset': parseInt( $this.attr('data-paged') ) + 1,
		};

		AjaxNew(data, $buttonWrapper, $insightsList, true);
	} );

	$( document ).on( 'click', '.insights-cat__links', function( e ) {
		var $buttonWrapper = $( '.posts-list__more' );
		var $this = $( this ), $insightsList = $( '.insights__list .grid-x');
		var data = {
			'action': 'load_more_posts',
			'nonce': ajax.nonce,
			'terms': $this.data('term'),
		};
		$('.insights-cat__links').removeClass('insights-is-active');
		$this.addClass('insights-is-active');

		AjaxNew(data, $buttonWrapper, $insightsList);
	} );



	// Init Jquery UI select
	function initJUIselect(elem) {
		var $field = $( elem );
		var $gfield = $field.closest( ".gfield" );
		var args = {
			change: function( e, ui ) {
				$( this ).trigger( "change" );
			}
		}
		if ( $gfield.length ) {
			args.appendTo = $gfield;
		}
		$field.selectmenu( args ).on('change',function() {
			$(this).selectmenu('refresh');
		});
		
// 		for newspaper page dont want jquery ui
		
		$( "#jquerynotselect" ).selectmenu( "destroy" );
	}

	function resizeSelect( elem ) {
		$( "select" ).each( function() {
			if ( typeof $( this ).selectmenu( "instance" ) !== "undefined" ) {
				$( this ).selectmenu( "refresh" );
			}
		} );
	}

	// Scripts which runs after DOM load
	var scrollOut;
	$( document ).ready(function() {
        AOS.init({once: true});
		// Init LazyLoad
		var lazyLoadInstance = new LazyLoad({
			elements_selector: 'img[data-lazy-src],.pre-lazyload',
			data_src: "lazy-src",
			data_srcset: "lazy-srcset",
			data_sizes: "lazy-sizes",
			skip_invisible: false,
			class_loading: "lazyloading",
			class_loaded: "lazyloaded",
		});
		// Add tracking on adding any new nodes to body to update lazyload for the new images (AJAX for example)
		window.addEventListener('LazyLoad::Initialized', function (e) {
			// Get the instance and puts it in the lazyLoadInstance variable
			if (window.MutationObserver) {
				var observer = new MutationObserver(function(mutations) {
					mutations.forEach(function(mutation) {
						mutation.addedNodes.forEach(function(node) {
							if (typeof node.getElementsByTagName !== 'function') {
								return;
							}
							imgs = node.getElementsByTagName('img');
							if ( 0 === imgs.length ) {
								return;
							}
							lazyLoadInstance.update();
						} );
					} );
				} );
				var b      = document.getElementsByTagName("body")[0];
				var config = { childList: true, subtree: true };
				observer.observe(b, config);
			}
		}, false);

		// Load all images in slider after init
		$( document ).on( "init", ".slick-slider", function( e, slick ) {
			lazyLoadInstance.loadAll( slick.$slider[0].getElementsByTagName( 'img' ) );
		} );

		// Detect element appearance in viewport
		scrollOut = ScrollOut( {
			offset: function() {
				return window.innerHeight - 200;
			},
			once: true,
			onShown: function( element ) {
				if ( $( element ).is( '.ease-order' ) ) {
					$( element ).find( '.ease-order__item' ).each( function( i ) {
						var $this = $( this );
						$( this ).attr( 'data-scroll', '' );
						window.setTimeout( function() {
							$this.attr( 'data-scroll', 'in' );
						}, 300 * i );
					} );
				}
			}
		} );


		// Init parallax
		/*$('.jarallax').jarallax({
			speed: 0.5,
		});

		$('.jarallax-inline').jarallax({
			speed: 0.5,
			keepImg: true,
			onInit : function() { lazyLoadInstance.update(); }
		});*/

		// IE Object-fit cover polyfill
		if ( $( '.of-cover, .stretched-img' ).length ) {
			objectFitImages( '.of-cover, .stretched-img' );
		}

		//Remove placeholder on click
		$( 'input,textarea' ).each( function() {
			$( this ).data( 'holder', $( this ).attr( 'placeholder' ) );

			$( this ).on( 'focusin', function() {
				$( this ).attr( 'placeholder', '' );
			} );

			$( this ).on( 'focusout', function() {
				$( this ).attr( 'placeholder', $( this ).data( 'holder' ) );
			} );
		} );

		// Init Jquery UI select
		$( "select" ).not( "#billing_state, #shipping_state, #billing_country, #shipping_country, [class*='woocommerce'], #product_cat" ).each( function() {
			initJUIselect(this);
		} );

		$(document).on('gform_post_render', function(event, form_id, current_page){
			$('#gform_' + form_id).find('select').each( function() {
				initJUIselect(this)
			} );
		});



		//Make elements equal height
		$( '.matchHeight' ).matchHeight();


		// Add fancybox to images
		$( '.gallery-item' ).find('a[href$="jpg"], a[href$="png"], a[href$="gif"]').attr( 'rel', 'gallery' ).attr( 'data-fancybox', 'gallery' );
		$( 'a[rel*="album"], .fancybox, a[href$="jpg"], a[href$="png"], a[href$="gif"]' ).fancybox( {
			minHeight: 0,
			helpers: {
				overlay: {
					locked: false
				}
			}
		} );

		/**
		 * Scroll to Gravity Form confirmation message after form submit
		 */
		$( document ).on( 'gform_confirmation_loaded', function( event, formId ) {
			var $target = $( '#gform_confirmation_wrapper_' + formId );
			if ( $target.length ) {
				$( 'html, body' ).animate( {
					scrollTop: $target.offset().top - 50,
				}, 500 );
				return false;
			}
		} );

		/**
		 * Hide gravity forms required field message on data input
		 */
		$( 'body' ).on( 'change keyup', '.gfield input, .gfield textarea, .gfield select', function() {
			var $field = $( this ).closest( '.gfield' );
			if ( $field.hasClass( 'gfield_error' ) && $( this ).val().length ) {
				$field.find( '.validation_message' ).hide();
			} else if ( $field.hasClass( 'gfield_error' ) && !$( this ).val().length ) {
				$field.find( '.validation_message' ).show();
			}
		} );

		/**
		 * Add `is-active` class to menu-icon button on Responsive menu toggle
		 * And remove it on breakpoint change
		 */
		$( window ).on( 'toggled.zf.responsiveToggle', function() {
			$( '.menu-icon' ).toggleClass( 'is-active' );
		} ).on( 'changed.zf.mediaquery', function( e, value ) {
			$( '.menu-icon' ).removeClass( 'is-active' );
		} );

		/**
		 * Close responsive menu on orientation change
		 */
		$( window ).on( 'orientationchange', function() {
			setTimeout( function() {
				if ( $( '.menu-icon' ).hasClass( 'is-active' ) && window.innerWidth < 641 ) {
					$( '[data-responsive-toggle="main-menu"]' ).foundation( 'toggleMenu' )
				}
			}, 200 );
		} );

		resizeVideo();

		/*
		*  This function will render each map when the document is ready (page has loaded)
		*/

		$('.acf-map').each(function(){
			render_map( $(this) );
		});

	} );


	// Scripts which runs after all elements load

	$( window ).on( 'load', function() {

		if ( typeof scrollOut !== "undefined" ) {
			scrollOut.update();
		}

		//jQuery code goes here
		if ( $( '.preloader' ).length ) {
			$( '.preloader' ).addClass( 'preloader--hidden' );
		}

	} );

	// Scripts which runs at window resize
	var resizeSelectCallback = debounce( resizeSelect, 200 );
	$( window ).on( 'resize', function() {

		//jQuery code goes here

		resizeVideo();
		resizeSelectCallback();
		
	} );

	// Scripts which runs on scrolling
	$(document).ready(function() {
		$(document).on('click','#clickBtn', function(e) {
			$(this).next('#popup').css('display', 'block');

		});
		$(document).on('click','#closeBtn', function(e) {
			$(this).closest('#popup').css('display', 'none');
		});
	});


	// $(window).scroll(function() {
	// 	var winTop = $(window).scrollTop();
	// 	if (winTop >= 1) {
	// 		$(".header").addClass("header-fixed");
	// 	} else{
	// 		$(".header").removeClass("header-fixed");
	// 	}
	// });

	$( window ).on( 'scroll', function() {

		//jQuery code goes here
		$('.related-posts').slick({
			dots: false,
			infinite: true,
			slidesToShow: 2,
			arrow: true,
			responsive: [
				{
					breakpoint: 641,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1
					}
				}
			]
		});
	} );


	// $('.post-block__block').slick({
	// 	dots: false,
	// 	infinite: true,
	// 	speed: 300,
	// 	slidesToShow:  2,
	// 	slidesToScroll: 1,
	// 	appendArrows: $('.post-block-arrow'),
	// 	prevArrow: '<button id="prev" type="button" class="btn btn-juliet"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
	// 		'<path d="M2.2002 12L5.8701 9V12V15L2.2002 12Z" fill="white"/>\n' +
	// 		'<path d="M23.2002 12H2.2002M2.2002 12L5.8701 9V15L2.2002 12Z" stroke="white" stroke-width="1.5" stroke-linecap="square"/>\n' +
	// 		'</svg>\n</button>',
	// 	nextArrow: '<button id="next" type="button" class="btn btn-juliet"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
	// 		'<path d="M22 12L18.3301 9L18.3301 12L18.3301 15L22 12Z" fill="white"/>\n' +
	// 		'<path d="M0.999999 12L22 12M22 12L18.3301 9L18.3301 15L22 12Z" stroke="white" stroke-width="1.5" stroke-linecap="square"/>\n' +
	// 		'</svg>\n</button>',
	// 	responsive: [
	// 		{
	// 			breakpoint: 1440,
	// 			settings: {
	// 				slidesToShow: 1,
	// 				slidesToScroll: 1
	// 			}
	// 		},
	// 		{
	// 			breakpoint: 1025,
	// 			settings: {
	// 				slidesToShow: 2,
	// 				slidesToScroll: 1
	// 			}
	// 		},
	// 		{
	// 			breakpoint: 641,
	// 			settings: {
	// 				slidesToShow: 1,
	// 				slidesToScroll: 1
	// 			}
	// 		}
	// 	]
	// });

	/*$('.testimonials__img').slick({
		slidesToShow: 3,
		slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 6000,
        draggable:true,
        arrows: false,
		asNavFor: '.testimonials__content',
		centerMode: true,
		centerPadding: '0px',
		responsive: [
			{
				breakpoint: 641,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}
		]
	});
	$('.testimonials__content').slick({
		slidesToShow: 1,
        autoplay: true,
        autoplaySpeed: 6000,
		slidesToScroll: 1,
		asNavFor: '.testimonials__img',
		dots: false,
		responsive: [
			{
				breakpoint: 641,
				settings: {
					arrows: false,
				}
			}
		]
	});*/

    const $rootSingle = $('.testimonials__content');
    const $rootNav = $('.testimonials__img');
    /**/
    // $rootSingle.slick({
    //     slide: '.testimonials__content-block',
    //     slidesToShow: 1,
    //     slidesToScroll: 1,
    //     autoplay: true,
    //     autoplaySpeed: 6000,
    //     arrows: true,
    //     dots: false,
    //     responsive: [
    //         {
    //             breakpoint: 641,
    //             settings: {
    //                 arrows: false,
    //             }
    //         }
    //     ]
    // });

    // $rootNav.on('init', function(event, slick) {
    //     $(this).find('.slick-slide.slick-current').addClass('is-active');
    // })
    //     .slick({
    //         slide: '.testimonials__img-item',
    //         slidesToShow: 3,
    //         slidesToScroll: 1,
    //         autoplay: true,
    //         autoplaySpeed: 6000,
    //         centerMode: true,
    //         draggable:true,
    //         centerPadding: '0px',
    //         dots: false,
    //         arrows: false,
    //         responsive: [
    //             {
    //                 breakpoint: 641,
    //                 settings: {
    //                     slidesToShow: 1,
    //                     slidesToScroll: 1
    //                 }
    //             }
    //         ]
    //     });

    $rootSingle.on('afterChange', function(event, slick, currentSlide) {
        $rootNav.slick('slickGoTo', currentSlide);
        $rootNav.find('.slick-slide.is-active').removeClass('is-active');
        $rootNav.find('.slick-slide[data-slick-index="' + currentSlide + '"]').addClass('is-active');
    });

    $rootNav.on('click', '.slick-slide', function(event) {
        event.preventDefault();
        var goToSingleSlide = $(this).data('slick-index');
        $rootSingle.slick('slickGoTo', goToSingleSlide);
    });


    $(window).scroll(function () {

    	var sc = $(window).scrollTop();
		if (sc > 3000) {
			$(".ct-tabs").addClass("fixed_s")
		}else {
			$(".ct-tabs").removeClass("fixed_s");
		}
		if(sc > 5800){
			$(".ct-tabs").removeClass("fixed_s");
		}

    });

    $(window).scroll(function () {
        var y = $(this).scrollTop();

        $('#mainNav li a').each(function () {
            if (y >= $($(this).attr('href')).offset().top - 200) {
                $('#mainNav li a').not(this).removeClass('active');
                $(this).addClass('active');
            }
        });

    });


    $("#mainNav li a[href^='#']").on('click', function(e) {

        e.preventDefault();
        var target = this.hash;
        var $target = $(target);
        $('html, body').stop().animate({
            'scrollTop': $target.offset().top
        }, 900, 'swing', function () {
            // window.location.hash = target;
        });

    });


    /*
     *  This function will render a Google Map onto the selected jQuery element
     */

	function render_map( $el ) {
		// var
		var $markers = $el.find( '.marker' );
		// var styles = []; // Uncomment for map styling

		// vars
		var args = {
			zoom: 16,
			center: new google.maps.LatLng( 0, 0 ),
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			scrollwheel: false,
			// styles : styles // Uncomment for map styling
		};

		// create map
		var map = new google.maps.Map( $el[0], args );

		// add a markers reference
		map.markers = [];

		// add markers
		$markers.each( function() {
			add_marker( $( this ), map );
		} );

		// center map
		center_map( map );
	}

	/*
	 *  This function will add a marker to the selected Google Map
	 */

	var infowindow;

	function add_marker( $marker, map ) {
		// var
		var latlng = new google.maps.LatLng( $marker.attr( 'data-lat' ), $marker.attr( 'data-lng' ) );

		// create marker
		var marker = new google.maps.Marker( {
			position: latlng,
			map: map,
			//icon: $marker.data('marker-icon') //uncomment if you use custom marker
		} );

		// add to array
		map.markers.push( marker );

		// if marker contains HTML, add it to an infoWindow
		if ( $.trim( $marker.html() ) ) {
			// create info window
			infowindow = new google.maps.InfoWindow();

			// show info window when marker is clicked
			google.maps.event.addListener( marker, 'click', function() {
				// Close previously opened infowindow, fill with new content and open it
				infowindow.close();
				infowindow.setContent( $marker.html() );
				infowindow.open( map, marker );
			} );
		}
	}

	/*
	*  This function will center the map, showing all markers attached to this map
	*/

	function center_map( map ) {
		// vars
		var bounds = new google.maps.LatLngBounds();

		// loop through all markers and create bounds
		$.each( map.markers, function( i, marker ) {
			var latlng = new google.maps.LatLng( marker.position.lat(), marker.position.lng() );
			bounds.extend( latlng );
		} );

		// only 1 marker?
		if ( map.markers.length == 1 ) {
			// set center of map
			map.setCenter( bounds.getCenter() );
		} else {
			// fit to bounds
			map.fitBounds( bounds );
		}
	}

}( jQuery ));
