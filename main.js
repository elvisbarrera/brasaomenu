// MAIN FUNCTION FOR TABS
function openTab(event, tabId) {

	tabContent = document.getElementsByClassName('tabContent');

	for (i = 0; i < tabContent.length; i++) {
		tabContent[i].style.display = 'none';
	}

	tabLinks = document.getElementsByClassName('tabLinks');

	for (i = 0; i < tabLinks.length; i++) {
		tabLinks[i].className = tabLinks[i].className.replace(' is-active', '');
	}

	document.getElementById(tabId).style.display = 'block';
	event.currentTarget.className += ' is-active';
}





// POP UP
function closePopup() {
	const popup = document.getElementById('cocktail-popup');
	const overlay = document.getElementById('popup-overlay');
	popup.classList.remove('popup-visible');
	overlay.classList.remove('overlay-visible');
	setTimeout(() => {
		popup.style.display = 'none';
		overlay.style.display = 'none';
	}, 400);
}

window.addEventListener('load', () => {
	const popup = document.getElementById('cocktail-popup');
	const overlay = document.getElementById('popup-overlay');

	setTimeout(() => {
		popup.style.display = 'flex';
		overlay.style.display = 'block';
		requestAnimationFrame(() => {
			popup.classList.add('popup-visible');
			overlay.classList.add('overlay-visible');
		});
	}, 1800);
});

document.getElementById('close-popup').addEventListener('click', closePopup);

const discoverBtn = document.getElementById('discover-menu');
if (discoverBtn) {
	discoverBtn.addEventListener('click', closePopup);
}

document.getElementById('popup-overlay').addEventListener('click', closePopup);


