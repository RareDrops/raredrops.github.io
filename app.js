const sections = document.querySelectorAll('.section'); //select the section
const sectBtns = document.querySelectorAll('.controls'); // selects the buttons
const sectBtn = document.querySelectorAll('.control'); // selects a button
const fadeInUp = document.querySelectorAll('.fade-in-up');
const fadeIn = document.querySelectorAll('.fade-in');
const allSections = document.querySelector(".main-content");

function PageTransition() {
	// Button click active class
	for (let i = 0; i < sectBtn.length; i++) {
		sectBtn[i].addEventListener('click', (event) => {
			let currentBtn = document.querySelector(".active-btn");
			currentBtn.classList.remove('active-btn');
			event.target.classList.add('active-btn');
		})
	}

	// activate sections
	allSections.addEventListener('click', (event) => {
		const id = event.target.dataset.id;
		// remove selected from the other buttons
		if (id) {
			// finds the container that contains the id, in this case the section
			const element = document.getElementById(id);
			element.classList.add('active');
		}
	})
}

function updateActiveButton(sectionId) {
	// Iterate through buttons and remove all the class token active-btn, then add the active section if it matches the section id
	sectBtn.forEach((button) => {
		button.classList.remove('active-btn'); // removes the highlight on all other buttons
		if (button.dataset.id === sectionId) {
			button.classList.add('active-btn'); // adds the highlight on currently viewing section
		}
	});
}

function addActiveClass(section) {
    const fadeInUp = section.querySelectorAll('.fade-in-up');
    const fadeIn = section.querySelectorAll('.fade-in');

    fadeInUp.forEach((item) => {
        item.classList.add('active');
    });

    fadeIn.forEach((item) => {
        item.classList.add('active');
    });
}
function sectionObserver() {
	// IntersectionObserver API to track the current visible section in the webpage and do something with it
	const observer = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				const sectionId = entry.target.id; // Get the ID of the visible section
				const section = entry.target;
				updateActiveButton(sectionId); // Update the active button
				addActiveClass(section); // Add active class on the visible section to use the animation
		  	}
		});
	}, {threshold: 0.15}); // Trigger when 20% of the section is visible

  
	// Start observing all sections
	sections.forEach((section) => {
		observer.observe(section);
	});
}

function darkenSections(sectionId) {
	// Get the section element by ID
	sections.forEach((section) => {
		sectionId = section.id;
		if (sectionId == 'home' || sectionId == 'contact') {
			section.style.backgroundColor = ''
		}
		else {
			// Add background color to the visible section
			section.style.backgroundColor = 'rgb(196, 195, 180)';
		}
	});
}

function lightenSections() {
	// Get the section element by ID
	sections.forEach((section) => {
		// Resets the backgroundColor to its default
		section.style.backgroundColor = '';
	}
	);
}

function sectionObserverDarken() {
	// Separate observer for darkenSections, higher threshold to trigger the function when the section is almost visible
	const observer = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				const sectionId = entry.target.id; // Get the ID of the visible section
				if (sectionId == 'portfolio') {
					darkenSections(sectionId); // Darken the navigation bar after scrolling to portfolio section
				}
			}
		});
	}, {threshold: 0.15}); // ADJUST THIS VALUE TO LOWER WHEN ADDING MORE PORTFOLIO

	// Start observing all sections
	sections.forEach((section) => {
		observer.observe(section);
	});
}

function sectionObserverLighten() {
	// Separate observer for lightenSections, lower threshold to trigger the function as soon as the section is visible
	const observer = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				const sectionId = entry.target.id; // Get the ID of the visible section
				if (sectionId == 'home' || sectionId == 'contact') {
					lightenSections(); // Lighten the navigation bar scrolling on the home and footnote sections NEED FIX FOR FOOTNOTE (NONE YET)
				}
			}
		});
	}, {threshold: 0.08}); // ADJUST THIS VALUE TO LOWER WHEN ADDING MORE PORTFOLIO

	// Start observing all sections
	sections.forEach((section) => {
		observer.observe(section);
	});
}

function toggleSidebar() {
	const sidebar = document.querySelector('.sidebar');
	if (sidebar.classList.contains('visible')) {
		sidebar.classList.add('hidden');
		sidebar.classList.remove('visible');
	}
	else {
		sidebar.classList.add('visible');
		sidebar.classList.remove('hidden');
	}
}



function init() {
	PageTransition();
	sectionObserver();
	sectionObserverDarken();
	sectionObserverLighten();
}


init();