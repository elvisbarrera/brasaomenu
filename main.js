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




// ── REVIEW LOCATION POPUP ──

function openReviewPopup() {
	const popup = document.getElementById('review-popup');
	const overlay = document.getElementById('review-overlay');
	popup.style.display = 'flex';
	overlay.style.display = 'block';
	requestAnimationFrame(() => {
		popup.classList.add('review-popup-visible');
		overlay.classList.add('review-overlay-visible');
	});
}

function closeReviewPopup() {
	const popup = document.getElementById('review-popup');
	const overlay = document.getElementById('review-overlay');
	popup.classList.remove('review-popup-visible');
	overlay.classList.remove('review-overlay-visible');
	setTimeout(() => {
		popup.style.display = 'none';
		overlay.style.display = 'none';
		backToLocationSelect();
	}, 400);
}

function selectReviewLocation(loc) {
	const selectStep = document.getElementById('review-step-select');
	const widgetStep = document.getElementById('review-step-widget');
	selectStep.style.opacity = '0';
	setTimeout(() => {
		selectStep.style.display = 'none';
		document.querySelectorAll('.review-widget-slot').forEach(el => el.style.display = 'none');
		document.getElementById('review-' + loc).style.display = 'block';
		widgetStep.style.display = 'flex';
		requestAnimationFrame(() => {
			widgetStep.style.opacity = '1';
		});
	}, 250);
}

function backToLocationSelect() {
	const selectStep = document.getElementById('review-step-select');
	const widgetStep = document.getElementById('review-step-widget');
	widgetStep.style.opacity = '0';
	setTimeout(() => {
		widgetStep.style.display = 'none';
		document.querySelectorAll('.review-widget-slot').forEach(el => el.style.display = 'none');
		selectStep.style.display = 'flex';
		requestAnimationFrame(() => {
			selectStep.style.opacity = '1';
		});
	}, 250);
}

document.getElementById('close-review-popup').addEventListener('click', closeReviewPopup);
document.getElementById('review-overlay').addEventListener('click', closeReviewPopup);
