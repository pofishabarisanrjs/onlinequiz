var myFullpage = new fullpage('#quizpage', {
			//anchors: ['hero','video_popup','scantojoin','question1','answer1','video_popup_2','scancode','question2','answer2','slide1','slide2','slide3','slide4','slide5','slide6','slide7','slide8','slide9','slide10','slide11','slide12','question3','answer3','slide13'],
			sectionsColor: ['#0A0909', '#0A0909', '#0A0909','#0A0909', '#0A0909','#0A0909','#0A0909','#0A0909','#0A0909','#0A0909','#0A0909','#171616','#0A0909','#171616','#0A0909','#171616','#0A0909','#171616','#0A0909','#171616','#0A0909','#171616','#0A0909','#171616'],
			// navigation: false,
			// navigationPosition: 'right',
			// scrollOverflow: true,
			// onScrollOverflow: function(section, slide, position, direction){
			// 		var params = {
			// 			section: section,
			// 			slide: slide,
			// 			position: position,
			// 			direction: direction
			// 		};

			// 	}
// 			navigationTooltips: ['First page', 'Second page', 'Third and last page']
		});
	  // Disable mouse scroll and swipe gestures for the element with ID 'scrollable'
    // JavaScript to prevent scrolling on the #quizpage section
    document.getElementById('quizpage').addEventListener('wheel', function(e) {
        e.preventDefault(); // Prevent default scrolling behavior
    }, { passive: false }); // Ensure it's not passive to prevent default

    // JavaScript to allow scrolling inside the .form-container
    var formContainer = document.querySelector('.form-container');
    formContainer.addEventListener('wheel', function(e) {
        e.stopPropagation(); // Stop the event from bubbling up
    });
	document.addEventListener('touchmove', function(event) {
		event.preventDefault();
	}, { passive: false });
	formContainer.addEventListener('touchmove', function(e) {
        e.stopPropagation(); // Stop the event from bubbling up
    });
	
		$(document).ready(function () {
			$('.popup-youtube').YouTubePopUp(); // Initialize Magnific Popup for YouTube videos
		 });
   