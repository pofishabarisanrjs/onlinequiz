// Function to scroll to a section and update URL
function scrollToSection(sectionId) {
   let section = document.getElementById(sectionId);
   if (section) {
     section.scrollIntoView({ behavior: 'smooth' });
     // Update URL
     window.history.pushState({}, '', `#${sectionId}`);
   }
}

// Add event listener to navigation elements
document.addEventListener('DOMContentLoaded', function() {
   // Assuming your navigation elements have class 'nav-link' and data attribute 'data-section' containing the section id
   let navLinks = document.querySelectorAll('.nav-link');
   navLinks.forEach(function(link) {
      link.addEventListener('click', function(event) {
         event.preventDefault(); // Prevent default anchor behavior
         let sectionId = this.getAttribute('data-section');
         scrollToSection(sectionId); // Scroll to section
      });
   });
});

// Handle initial page load
window.addEventListener('DOMContentLoaded', function() {
   // Scroll to the section if there is a hash in the URL
   if (window.location.hash) {
      let sectionId = window.location.hash.substring(1); // Remove '#'
      scrollToSection(sectionId);
   }
});

 
var clickedContainers = [];

function toggleBox(containerID) {
    var container = document.getElementById(containerID);
    container.classList.toggle('show-box');

    // Check if container is now showing box
    if (container.classList.contains('show-box')) {
        // If yes, add container ID to clickedContainers array
        if (!clickedContainers.includes(containerID)) {
            clickedContainers.push(containerID);
        }
        // Check the associated checkbox
        document.getElementById('containerCheckbox' + containerID.charAt(containerID.length - 1)).checked = true;
        // Store the container's state in localStorage
        localStorage.setItem(containerID, 'checked');
    } else {
        // If not, remove container ID from clickedContainers array
        var index = clickedContainers.indexOf(containerID);
        if (index !== -1) {
            clickedContainers.splice(index, 1);
        }
        // Uncheck the associated checkbox
        document.getElementById('containerCheckbox' + containerID.charAt(containerID.length - 1)).checked = false;
        // Remove the container's state from localStorage
        localStorage.removeItem(containerID);
    }
}

function submitClicked() {
   // Get form inputs
   var name = document.getElementById('name').value.trim();
   var email = document.getElementById('email').value.trim();
   var company = document.getElementById('company').value.trim();
   var message = document.getElementById('message').value.trim();
   
   // Simple validation
   if (name === '' || email === '' || company === '' || message === '') {
       alert('Please fill in all fields.');
       return false;
   }
   
   // More complex email validation
   var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   if (!emailPattern.test(email)) {
       alert('Please enter a valid email address.');
       return false;
   }
   
   // If all validations pass, you can submit the form or perform further actions
   // For demonstration, let's just alert that the form is valid
   alert('Form is valid. Submitting...');
   return true;
}

// Restore checked containers from localStorage on page load
document.addEventListener('DOMContentLoaded', function () {
   var containers = document.querySelectorAll('.container');
   containers.forEach(function (container) {
      var containerID = container.id;
      if (localStorage.getItem(containerID) === 'checked') {
         container.classList.add('show-box');
         clickedContainers.push(containerID);
      }
   });
});

document.addEventListener('DOMContentLoaded', function () {
   // Retrieve image URL from the query parameter
   const queryString = window.location.search;
   const urlParams = new URLSearchParams(queryString);
   const imageUrl = urlParams.get('qrcode_url');

   if (imageUrl) {
      const img = new Image();
      img.src = imageUrl;

      img.onload = function () {
         document.getElementById('qrCodeImg').src = imageUrl;
      };
   }

   // Listen for beforeunload event
   window.addEventListener('beforeunload', function () {
      // You can choose whether to clear local storage or perform other actions when the user leaves the page
      // localStorage.removeItem('qrcode_url');
   });
});
var video_popup_unprm_general_settings = {
   'unprm_r_border': ''
};
function toggleCheckbox(labelId) {
   var checkbox = document.getElementById(labelId);
   checkbox.classList.toggle("active");
 }
 
 function submitSelection() {
   var selectedLabels = document.querySelectorAll('.inner-square.active');
   var selectedLabelsText = Array.from(selectedLabels).map(function(label) {
     return label.id;
   }).join(', ');
   alert("Selected labels: " + selectedLabelsText);
 }

 document.addEventListener('DOMContentLoaded', function() {
  const sections = document.querySelectorAll('section');

  function setActiveSection() {
    const scrollPosition = window.scrollY;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        section.classList.add('active');
      } else {
        section.classList.remove('active');
      }
    });
  }

  setActiveSection(); // Set initial active section

  window.addEventListener('scroll', setActiveSection);
});
