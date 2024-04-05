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
	// document.addEventListener('touchmove', function(event) {
	// 	event.preventDefault();
	// }, { passive: false });
	// formContainer.addEventListener('touchmove', function(e) {
    //     e.stopPropagation(); // Stop the event from bubbling up
    // });
	
	document.addEventListener('DOMContentLoaded', function() {
		var currentSection = 1;
		toggleButtons(currentSection);
	
		document.getElementById('prevButton').addEventListener('click', function() {
			if (currentSection > 1) {
				currentSection--;
				toggleButtons(currentSection);
				scrollToSection(currentSection);
			}
		});
	
		document.getElementById('nextButton').addEventListener('click', function() {
			if (currentSection < 22) {
				currentSection++;
				toggleButtons(currentSection);
				scrollToSection(currentSection);
			}
		});
	
		// Function to show or hide prev/next buttons based on current section
		function toggleButtons(currentSection) {
			console.log(currentSection)
			var prevBtn = document.getElementById('prevButton');
			var nextBtn = document.getElementById('nextButton');
	
			if (currentSection === 1) {
				prevBtn.style.display = 'none';
			} else {
				prevBtn.style.display = 'block';
			}
	
			if (currentSection === 22) {
				nextBtn.style.display = 'none';
			} else {
				nextBtn.style.display = 'block';
			}
		}
	
		// Function to scroll to a specific section
		function scrollToSection(sectionNumber) {
			var sectionId = 'section' + sectionNumber;
			var section = document.getElementById(sectionId);
			if (section) {
				section.scrollIntoView({ behavior: 'smooth' });
			}
		}
	});
	
		$(document).ready(function () {
			$('.popup-youtube').YouTubePopUp(); // Initialize Magnific Popup for YouTube videos
		 });
   