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
	
	  const quizpageElement = document.getElementById('quizpage');

	  quizpageElement.addEventListener('touchstart', function(event) {
		// Allow the initial touch to register (e.g., for click events)
		event.stopPropagation();
	  
		let startX = event.touches[0].clientX;
		let startY = event.touches[0].clientY;
	  
		quizpageElement.addEventListener('touchmove', function(moveEvent) {
		  const deltaX = moveEvent.touches[0].clientX - startX;
		  const deltaY = moveEvent.touches[0].clientY - startY;
	  
		  // Check for significant movement (adjust threshold as needed)
		  if (Math.abs(deltaX) > 10 || Math.abs(deltaY) > 10) {
			// Hide the element or perform other actions based on movement
			quizpageElement.classList.add('hidden');
			moveEvent.preventDefault(); // Prevent scrolling if desired
		  }
		});
	  
		// Clean up event listeners after touch ends
		quizpageElement.addEventListener('touchend', function() {
		  quizpageElement.removeEventListener('touchmove');
		});
	  });
	  
	
		$(document).ready(function () {
			$('.popup-youtube').YouTubePopUp(); // Initialize Magnific Popup for YouTube videos
		 });
   