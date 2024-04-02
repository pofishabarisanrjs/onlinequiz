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
	  var scrollableElement = document.getElementById('quizpage');

	  scrollableElement.addEventListener('wheel', function(e) {
		e.preventDefault();
	  });
	
	  var startX, startY;
	
	  scrollableElement.addEventListener('touchstart', function(e) {
		var touch = e.touches[0];
		startX = touch.clientX;
		startY = touch.clientY;
	  });
	
	  scrollableElement.addEventListener('touchmove', function(e) {
		if (Math.abs(startX - e.touches[0].clientX) > 10 ||
			Math.abs(startY - e.touches[0].clientY) > 10) {
		  e.preventDefault();
		}
	  });
	
		$(document).ready(function () {
			$('.popup-youtube').YouTubePopUp(); // Initialize Magnific Popup for YouTube videos
		 });
   