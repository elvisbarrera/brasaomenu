// SERVICE WORKER REGISTRATION
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(err => {
      console.warn('Service worker registration failed:', err);
    });
  });
}


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





// COCKTAIL FILTER
document.addEventListener('click', function (e) {
    const btn = e.target.closest('.cocktail-filter-btn');
    if (!btn) return;

    const inSpirits = !!btn.closest('#spirits');
    const inCocktails = !!btn.closest('#cocktails');
    const inWines = !!btn.closest('#wines');
    if (!inSpirits && !inCocktails && !inWines) return;

    const filter = btn.dataset.filter;
    const tab = inSpirits ? document.getElementById('spirits')
              : inWines   ? document.getElementById('wines')
              : document.getElementById('cocktails');
    const groupClass = inSpirits ? '.spirit-group'
                     : inWines   ? '.wine-group'
                     : '.cocktail-group';

    // Update active button only within this tab's filter bar
    tab.querySelectorAll('.cocktail-filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    if (filter === 'all') {
        tab.classList.remove('filter-active');
    } else {
        tab.classList.add('filter-active');
    }

    tab.querySelectorAll(groupClass).forEach(group => {
        if (filter === 'all' || group.dataset.group === filter) {
            group.classList.remove('hidden');
        } else {
            group.classList.add('hidden');
        }
    });
});


// COCKTAIL CARD — INFO DOTS
(function () {
    var cardSelector = '#cocktails .cocktails-grid > .borderline, #cocktails .cocktails-grid > .cocktail-card, #desserts .cocktails-grid > .dessert-card';

    function initInfoDots() {
        document.querySelectorAll(cardSelector).forEach(function (card) {
            var descEl = card.querySelector('.drink-description') || card.querySelector('.cocktail-description');
            if (!descEl) return;

            var text = descEl.textContent.trim();
            if (!text) return;

            // Build slide-up overlay
            var overlay = document.createElement('div');
            overlay.className = 'info-overlay';
            overlay.textContent = text;
            card.appendChild(overlay);

            // Build three-dot button
            var btn = document.createElement('button');
            btn.className = 'info-dots-btn';
            btn.setAttribute('aria-label', 'More info');
            btn.innerHTML = '<span></span><span></span><span></span>';
            card.appendChild(btn);

            btn.addEventListener('click', function (e) {
                e.stopPropagation();
                var isOpen = card.classList.contains('info-open');
                // Close any other open card
                document.querySelectorAll(cardSelector).forEach(function (c) {
                    c.classList.remove('info-open');
                    c.querySelector('.info-overlay') && (c.querySelector('.info-overlay').style.transform = '');
                });
                if (!isOpen) card.classList.add('info-open');
            });

            // Swipe down to dismiss
            var touchStartY = 0;
            var isDragging = false;

            overlay.addEventListener('touchstart', function (e) {
                touchStartY = e.touches[0].clientY;
                isDragging = true;
                overlay.style.transition = 'none';
            }, { passive: true });

            overlay.addEventListener('touchmove', function (e) {
                if (!isDragging) return;
                var delta = e.touches[0].clientY - touchStartY;
                if (delta > 0) {
                    overlay.style.transform = 'translateY(' + delta + 'px)';
                }
            }, { passive: true });

            overlay.addEventListener('touchend', function (e) {
                if (!isDragging) return;
                isDragging = false;
                overlay.style.transition = '';
                var delta = e.changedTouches[0].clientY - touchStartY;
                if (delta > 60) {
                    card.classList.remove('info-open');
                    overlay.style.transform = '';
                } else {
                    overlay.style.transform = '';
                }
            }, { passive: true });
        });

        // Tap outside closes
        document.addEventListener('click', function () {
            document.querySelectorAll(cardSelector).forEach(function (c) {
                c.classList.remove('info-open');
            });
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initInfoDots);
    } else {
        initInfoDots();
    }
})();


// Spirit group item counts
(function () {
    function initSpiritCounts() {
        let totalCocktails = 0;
        document.querySelectorAll('.spirit-group, .cocktail-group').forEach(group => {
            const title = group.querySelector('.spirit-title');
            if (!title) return;
            const count = group.querySelectorAll('.drink-container').length;
            
            if (group.closest('#cocktails')) {
                totalCocktails += count;
            }

            const el = document.createElement('p');
            el.className = 'spirit-item-count';
            el.textContent = count + ' selections';
            title.insertAdjacentElement('afterend', el);
        });

        const totalCocktailsEl = document.getElementById('total-cocktails-count');
        if (totalCocktailsEl) {
            totalCocktailsEl.textContent = totalCocktails + ' selections';
        }
    }
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSpiritCounts);
    } else {
        initSpiritCounts();
    }
})();

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



// ── DRINK DETAIL POPUP ──

const drinkData = {
	// SEASONAL
	'Cutie Gold Caipirinha': {
		category: 'Seasonal',
		tags: ['Citrus', 'Sweet', 'Refreshing', 'Bright'],
		profile: 'Mandarin-forward with golden cachaça warmth. Light-bodied, crisp, and tropical.'
	},
	'Ube Horchata': {
		category: 'Seasonal',
		tags: ['Creamy', 'Nutty', 'Earthy', 'Sweet'],
		profile: 'Velvety and rich with a purple-hued earthy sweetness and smooth rum backbone.'
	},
	'Cucumber Matcharita': {
		category: 'Seasonal',
		tags: ['Earthy', 'Botanical', 'Crisp', 'Citrus'],
		profile: 'Clean and energizing with an herbaceous matcha note and cool cucumber freshness.'
	},
	'Tiki 43': {
		category: 'Seasonal',
		tags: ['Tropical', 'Coffee', 'Citrus', 'Bold'],
		profile: 'A lively fusion of tropical rum, coffee-vanilla notes from Licor 43, and bright citrus.'
	},
	'Hibiscus Margarita': {
		category: 'Seasonal',
		tags: ['Floral', 'Tart', 'Spicy', 'Vibrant'],
		profile: 'Rose-forward florals balanced by tequila warmth and a gentle, lingering heat.'
	},
	"Dark 'N' Stormy": {
		category: 'Seasonal',
		tags: ['Bold', 'Spicy', 'Warm', 'Deep'],
		profile: 'Rich dark rum with fiery ginger and sharp lime — warming and invigorating.'
	},
	'Coquito': {
		category: 'Seasonal',
		tags: ['Creamy', 'Coconut', 'Spiced', 'Warm'],
		profile: 'Silky holiday richness with cinnamon spice and deep rum warmth throughout.'
	},
	'Cranberry Mojito': {
		category: 'Seasonal',
		tags: ['Tart', 'Minty', 'Citrus', 'Fresh'],
		profile: 'Bright and herbaceous with tart cranberry, fresh mint, and smooth rum.'
	},
	'Autumn Pineapple': {
		category: 'Seasonal',
		tags: ['Smoky', 'Sweet', 'Spiced', 'Tropical'],
		profile: 'Grilled pineapple with cinnamon and honey — rich, golden, and perfectly autumnal.'
	},
	// CLASSICS
	'Caipirinha (Cachaça Rum)': {
		category: 'Classics',
		tags: ['Citrus', 'Sweet', 'Tropical', 'Refreshing'],
		profile: "Brazil's soul in a glass. Bright lime or fruit with earthy cachaça depth."
	},
	'Caipiroska (Vodka)': {
		category: 'Classics',
		tags: ['Citrus', 'Sweet', 'Fruity', 'Light'],
		profile: 'Clean vodka-forward spin on the caipirinha — lighter and fruit-driven.'
	},
	'Old Fashioned': {
		category: 'Classics',
		tags: ['Whiskey', 'Bitters', 'Citrus', 'Classic'],
		profile: 'Bold and balanced — rich bourbon or rye softened by aromatic bitters and orange.'
	},
	'Moscow Mule': {
		category: 'Classics',
		tags: ['Spicy', 'Citrus', 'Crisp', 'Refreshing'],
		profile: 'Bright and fizzy with sharp ginger bite, clean vodka, and zesty lime.'
	},
	'Mint Julep': {
		category: 'Classics',
		tags: ['Herbal', 'Minty', 'Sweet', 'Citrus'],
		profile: 'Silky whiskey with cool crushed mint and lime brightness over pure crushed ice.'
	},
	'Bramble': {
		category: 'Classics',
		tags: ['Fruity', 'Citrus', 'Sweet', 'Botanical'],
		profile: 'Gin-forward with juicy blackberry depth and bright lemon — elegantly simple.'
	},
	'French 75': {
		category: 'Classics',
		tags: ['Bubbly', 'Citrus', 'Botanical', 'Elegant'],
		profile: 'Crisp gin with champagne effervescence and a clean lemon brightness.'
	},
	'Cuban Sazerac': {
		category: 'Classics',
		tags: ['Herbal', 'Rum', 'Bittersweet', 'Complex'],
		profile: "Absinthe-kissed añejo rum with tropical banana notes and Peychaud's intrigue."
	},
	'Aviation': {
		category: 'Classics',
		tags: ['Floral', 'Botanical', 'Citrus', 'Elegant'],
		profile: 'Violet-tinted with maraschino sweetness, gin botanicals, and tart lemon.'
	},
	'Last Word': {
		category: 'Classics',
		tags: ['Herbal', 'Botanical', 'Citrus', 'Balanced'],
		profile: 'A perfect equal-parts balance of gin, green chartreuse, maraschino, and lime.'
	},
	'Smoked Old Fashioned': {
		category: 'Classics',
		tags: ['Smoky', 'Whiskey', 'Bitters', 'Bold'],
		profile: 'Classic old fashioned elevated with artisan wood smoke — dramatic and deeply aromatic.'
	},
	'Vieux Carre': {
		category: 'Classics',
		tags: ['Complex', 'Herbal', 'Bittersweet', 'Rich'],
		profile: 'New Orleans classic — cognac and rye meet Bénédictine and dual bitters.'
	},
	'Negroni': {
		category: 'Classics',
		tags: ['Bitter', 'Herbal', 'Sweet', 'Complex'],
		profile: "Campari's bold bitterness balanced by gin botanicals and sweet vermouth."
	},
	'Bloody Mary': {
		category: 'Classics',
		tags: ['Savory', 'Spicy', 'Umami', 'Bold'],
		profile: "Bold tomato and house-spiced blend with a vodka kick — the ultimate brunch companion."
	},
	'Boulevardier': {
		category: 'Classics',
		tags: ['Bitter', 'Whiskey', 'Herbal', 'Complex'],
		profile: "A whiskey-forward cousin to the Negroni — rich, bittersweet, and deeply satisfying."
	},
	'Caipicoco': {
		category: 'Classics',
		tags: ['Tropical', 'Coconut', 'Citrus', 'Sweet'],
		profile: "A creamy, tropical escape blending Brazil's classic Caipirinha with rich coconut flavors."
	},
	'Premium Caipirinha': {
		category: 'Classics',
		tags: ['Citrus', 'Sweet', 'Tropical', 'Premium'],
		profile: "An elevated take on the Brazilian classic, featuring aged premium Cachaça and fresh hand-muddled lime."
	},
	'Cape Cod': {
		category: 'Classics',
		tags: ['Fruity', 'Tart', 'Crisp', 'Light'],
		profile: "Clean, simple, and refreshing with crisp vodka and bright cranberry juice over ice."
	},
	'Chocolate Martini': {
		category: 'Classics',
		tags: ['Chocolate', 'Rich', 'Creamy', 'Sweet'],
		profile: "Luxuriously smooth and decadent, combining silky vodka with rich dark chocolate."
	},
	'Cosmopolitan': {
		category: 'Classics',
		tags: ['Citrus', 'Fruity', 'Tart', 'Elegant'],
		profile: "Effortlessly elegant and blushing pink, with citrus vodka, cranberry, and fresh lime."
	},
	'Daiquiri': {
		category: 'Classics',
		tags: ['Citrus', 'Sweet', 'Crisp', 'Classic'],
		profile: "A timeless Caribbean classic of white rum, fresh lime, and cane sugar, perfectly shaken."
	},
	'Fitzgerald': {
		category: 'Classics',
		tags: ['Botanical', 'Citrus', 'Balanced', 'Crisp'],
		profile: "Quiet sophistication with London dry gin, fresh lemon, and a subtle touch of bitters."
	},
	'Fumblin\' Dublin': {
		category: 'Classics',
		tags: ['Warm', 'Spiced', 'Sweet', 'Balanced'],
		profile: "A cozy and warm sipper with Irish whiskey, honey, ginger, and fresh lemon."
	},
	'Gibson': {
		category: 'Classics',
		tags: ['Botanical', 'Dry', 'Savory', 'Elegant'],
		profile: "A distinguished, savory twist on the classic martini, crowned with a cocktail onion."
	},
	'Godfather': {
		category: 'Classics',
		tags: ['Rich', 'Whiskey', 'Nutty', 'Sweet'],
		profile: "Deep and satisfying with aged Scotch whisky rounded by smooth, sweet Amaretto."
	},
	'Godmother': {
		category: 'Classics',
		tags: ['Smooth', 'Nutty', 'Sweet', 'Refined'],
		profile: "Effortlessly refined, blending premium vodka with velvety, sweet Amaretto."
	},
	'Highland Pear': {
		category: 'Classics',
		tags: ['Fruity', 'Floral', 'Smooth', 'Complex'],
		profile: "Scotch whisky and elderflower paired with fresh pear and honey for a delicate, floral lift."
	},
	'Lemon Drop': {
		category: 'Classics',
		tags: ['Citrus', 'Tart', 'Sweet', 'Crisp'],
		profile: "A perfect sweet-tart balance of premium vodka and fresh lemon, served with a sugar rim."
	},
	'Long Island Iced Tea': {
		category: 'Classics',
		tags: ['Bold', 'Complex', 'Citrus', 'Classic'],
		profile: "A legendary, deceptively smooth mix of five spirits with sweet & sour and a splash of cola."
	},
	'Love in the Air': {
		category: 'Classics',
		tags: ['Floral', 'Fruity', 'Sweet', 'Delicate'],
		profile: "A dreamy, delicate blend of premium vodka, rose liqueur, lychee, and elderflower."
	},
	'Manhattan': {
		category: 'Classics',
		tags: ['Whiskey', 'Bittersweet', 'Rich', 'Classic'],
		profile: "Elegant perfection with rye or bourbon and sweet vermouth, garnished with a Luxardo cherry."
	},
	'Margarita': {
		category: 'Classics',
		tags: ['Citrus', 'Tart', 'Agave', 'Refreshing'],
		profile: "The iconic blend of premium tequila, fresh lime, and triple sec, perfect on the rocks."
	},
	'Mexican Martini': {
		category: 'Classics',
		tags: ['Savory', 'Citrus', 'Agave', 'Bold'],
		profile: "A Texas-born icon mixing the classic margarita with a savory splash of olive brine."
	},
	'Mimosa': {
		category: 'Classics',
		tags: ['Bubbly', 'Citrus', 'Light', 'Celebratory'],
		profile: "Light and bright with chilled fresh orange juice and sparkling champagne."
	},
	'NY Sour': {
		category: 'Classics',
		tags: ['Whiskey', 'Tart', 'Fruity', 'Complex'],
		profile: "Rye whiskey and fresh lemon crowned with a striking, dry red wine float."
	},
	'Piña Colada': {
		category: 'Classics',
		tags: ['Tropical', 'Coconut', 'Creamy', 'Sweet'],
		profile: "A pure Caribbean escape in a glass, blending rum, rich coconut cream, and pineapple."
	},
	'Pisco Sour': {
		category: 'Classics',
		tags: ['Citrus', 'Silky', 'Frothy', 'Complex'],
		profile: "Silky and frothy with Peruvian Pisco, fresh lime, and a beautiful egg white crown."
	},
	'Rusty Nail': {
		category: 'Classics',
		tags: ['Smoky', 'Herbal', 'Sweet', 'Warm'],
		profile: "Warm and smooth, pairing aged Scotch whisky with the honeyed, herbal notes of Drambuie."
	},
	'Salty Dog': {
		category: 'Classics',
		tags: ['Citrus', 'Tart', 'Crisp', 'Refreshing'],
		profile: "Bright and effortless with premium vodka and fresh grapefruit juice in a salt-rimmed glass."
	},
	'Sazerac': {
		category: 'Classics',
		tags: ['Whiskey', 'Herbal', 'Spiced', 'Ritual'],
		profile: "A true ritual of rye whiskey and Peychaud's bitters in an absinthe-rinsed glass."
	},
	'Tom Collins': {
		category: 'Classics',
		tags: ['Botanical', 'Citrus', 'Bubbly', 'Refreshing'],
		profile: "Tall, cool, and timelessly refreshing with London dry gin, lemon, and sparkling soda."
	},
	'Vesper': {
		category: 'Classics',
		tags: ['Botanical', 'Crisp', 'Complex', 'Dry'],
		profile: "James Bond's iconic creation — precise, uncompromising, and perfectly chilled."
	},
	'White Russian': {
		category: 'Classics',
		tags: ['Coffee', 'Creamy', 'Sweet', 'Rich'],
		profile: "Rich and indulgent, combining vodka and coffee liqueur stirred with fresh cream."
	},
	// SIGNATURE
	'Watermelon Breeze': {
		category: 'Signature',
		tags: ['Fruity', 'Tropical', 'Sweet', 'Refreshing'],
		profile: 'Juicy watermelon with Veev acai depth — vibrant and incredibly refreshing.'
	},
	'Passion Fruit Margarita': {
		category: 'Signature',
		tags: ['Tropical', 'Spicy', 'Bold', 'Citrus'],
		profile: 'Ghost tequila heat meets passionate fruit sweetness in a fiery tropical twist.'
	},
	'Bellini Sunrise': {
		category: 'Signature',
		tags: ['Bubbly', 'Fruity', 'Elegant', 'Sweet'],
		profile: 'Champagne effervescence with raspberry richness — refined and celebratory.'
	},
	'Peach 75': {
		category: 'Signature',
		tags: ['Fruity', 'Bubbly', 'Sweet', 'Citrus'],
		profile: 'Peachy vodka with lemon brightness lifted by prosecco bubbles.'
	},
	'Mojito': {
		category: 'Signature',
		tags: ['Minty', 'Citrus', 'Refreshing', 'Crisp'],
		profile: 'The quintessential refresher — bright mint, citrus, and rum in perfect harmony.'
	},
	'Grapefruit Martini': {
		category: 'Signature',
		tags: ['Citrus', 'Bittersweet', 'Crisp', 'Fruity'],
		profile: "Ruby red grapefruit with Aperol's bittersweet bite and vodka brightness."
	},
	'Cucumber Ivy': {
		category: 'Signature',
		tags: ['Botanical', 'Floral', 'Crisp', 'Herbal'],
		profile: "St. Germain floral elegance with cool cucumber and gin's botanical depth."
	},
	'Skinny Margarita': {
		category: 'Signature',
		tags: ['Citrus', 'Clean', 'Refreshing', 'Light'],
		profile: 'Pure tequila and citrus with agave sweetness — guilt-free and perfectly balanced.'
	},
	'Sangria': {
		category: 'Signature',
		tags: ['Fruity', 'Wine', 'Sweet', 'Refreshing'],
		profile: 'Wine-forward with tropical fruit, brandy warmth, and bright citrus finish.'
	},
	'Espresso Martini': {
		category: 'Signature',
		tags: ['Coffee', 'Sweet', 'Bold', 'Creamy'],
		profile: 'Rich espresso intensity with Licor 43 vanilla and Mr. Black coffee depth.'
	},
	'Oaxaca Spice': {
		category: 'Signature',
		tags: ['Spicy', 'Tequila', 'Citrus', 'Smoky'],
		profile: "Tequila's warmth meets cassis fruit and chili heat on a smoking crushed-ice finish."
	},
	'Pink Lady': {
		category: 'Signature',
		tags: ['Floral', 'Berry', 'Citrus', 'Elegant'],
		profile: 'Gin base with fresh berry muddling, champagne lift, and velvet falernum depth.'
	},
	'Basil Up': {
		category: 'Signature',
		tags: ['Herbal', 'Botanical', 'Floral', 'Crisp'],
		profile: 'Gin with St. Germain elegance, fresh basil, and cucumber on crushed ice.'
	},
	'Love in Summer': {
		category: 'Signature',
		tags: ['Tropical', 'Sweet', 'Nutty', 'Citrus'],
		profile: 'Rum sweetened by falernum and orgeat — nutty, tropical, and utterly summery.'
	},
	'Summer Mule': {
		category: 'Signature',
		tags: ['Crisp', 'Spicy', 'Herbal', 'Refreshing'],
		profile: 'Cool cucumber and mint in a vodka mule — lighter and more delicate than the classic.'
	},
	'Smoked Margarita': {
		category: 'Signature',
		tags: ['Smoky', 'Citrus', 'Agave', 'Complex'],
		profile: 'Mezcal smokiness blending with tequila brightness and agave sweetness.'
	},
	'Añejo Old Fashioned': {
		category: 'Signature',
		tags: ['Tequila', 'Bitters', 'Smooth', 'Elegant'],
		profile: "Añejo's aged richness — vanilla and oak — lifted by orange and aromatic bitters."
	},
	'Pineapple Basil': {
		category: 'Signature',
		tags: ['Tropical', 'Herbal', 'Sweet', 'Fruity'],
		profile: 'Pineapple brightness with herbaceous basil and falernum spice — lively and fresh.'
	},
	'Rum Punch': {
		category: 'Signature',
		tags: ['Tropical', 'Citrus', 'Fruity', 'Bold'],
		profile: 'Multi-citrus punch with rum and brandy — sunny, fruity, and endlessly drinkable.'
	},
	'Raspberry Mojito': {
		category: 'Signature',
		tags: ['Berry', 'Minty', 'Tart', 'Crisp'],
		profile: 'Raspberry vodka with muddled berries and mint — fruity, fresh, and vibrant.'
	},
	'Peartini': {
		category: 'Signature',
		tags: ['Fruity', 'Floral', 'Elegant', 'Sweet'],
		profile: 'Delicate pear with St. Germain florals and a clean citrus tartness.'
	},
	// INFUSIONS
	'Mexican Candy': {
		category: 'Infusions',
		tags: ['Spicy', 'Fruity', 'Sweet', 'Bold'],
		profile: 'Pineapple-serrano cachaça heat meets berry sweetness — a sweet-spicy fiesta.'
	},
	'Red & Wild': {
		category: 'Infusions',
		tags: ['Berry', 'Floral', 'Sweet', 'Citrus'],
		profile: 'Strawberry-infused cachaça with St. Germain elegance — bold and beautiful.'
	},
	'Magenta Blossom': {
		category: 'Infusions',
		tags: ['Berry', 'Floral', 'Tart', 'Citrus'],
		profile: 'Blueberry rum infusion lifted by St. Germain and bright lemon — vivid and floral.'
	},
	'Blue Rush': {
		category: 'Infusions',
		tags: ['Berry', 'Minty', 'Tropical', 'Fruity'],
		profile: 'Blueberry rum with orgeat sweetness and mint freshness on crushed ice.'
	},
	'Kiwi Crush': {
		category: 'Infusions',
		tags: ['Tropical', 'Tart', 'Sweet', 'Fruity'],
		profile: 'Kiwi-bright with berry contrast, falernum spice, and lime tartness.'
	},
	'Cucumber Martini': {
		category: 'Infusions',
		tags: ['Crisp', 'Cool', 'Spicy', 'Clean'],
		profile: 'Cucumber-infused vodka served straight up with a chili rim — refreshing with heat.'
	},
	'Raspberry Dreaming': {
		category: 'Infusions',
		tags: ['Berry', 'Silky', 'Floral', 'Citrus'],
		profile: 'Raspberry gin with egg white silk and Chambord richness — decadent and dreamy.'
	},
	'Mexican Brazilian': {
		category: 'Infusions',
		tags: ['Smoky', 'Spicy', 'Tropical', 'Bold'],
		profile: 'Mezcal smoke meets pineapple-serrano cachaça heat — an intense cross-border fusion.'
	},
	'Floating in Space': {
		category: 'Infusions',
		tags: ['Berry', 'Silky', 'Tart', 'Airy'],
		profile: 'Blueberry rum with cassis depth and egg white cloud — ethereal and delicious.'
	},
	'The Green Goblin': {
		category: 'Infusions',
		tags: ['Tropical', 'Herbal', 'Floral', 'Crisp'],
		profile: 'Kiwi vodka with St. Germain and fresh mint — bright, green, and enchanting.'
	},
	'Spicy Pisco': {
		category: 'Infusions',
		tags: ['Spicy', 'Citrus', 'Silky', 'Complex'],
		profile: 'Pisco sour elevated with pineapple-serrano heat and a velvety egg white crown.'
	},
	// DESSERT
	'Carajillo': {
		category: 'Dessert',
		tags: ['Coffee', 'Sweet', 'Warm', 'Bold'],
		profile: 'Espresso meets Spanish vanilla liqueur, set aflame — intense, sweet, and theatrical.'
	},
	'Life Changer': {
		category: 'Dessert',
		tags: ['Sweet', 'Creamy', 'Vanilla', 'Warm'],
		profile: 'Velvety white chocolate and Rumchata with Licor 43 — smooth, sweet, indulgent.'
	},
	'Dominicana': {
		category: 'Dessert',
		tags: ['Rich', 'Chocolate', 'Creamy', 'Rum'],
		profile: 'Dark chocolate and cream over premium Flor de Caña rum — pure liquid luxury.'
	},
	'Cocoa Cloud': {
		category: 'Dessert',
		tags: ['Nutty', 'Coffee', 'Creamy', 'Rich'],
		profile: 'Hazelnut Amarula and Kahlua in a tequila cream base — deeply indulgent and warm.'
	},
	"Espress Ya'self": {
		category: 'Dessert',
		tags: ['Coffee', 'Creamy', 'Bold', 'Sweet'],
		profile: 'Espresso intensity softened by tequila cream and Amarula — awaken your senses.'
	},
	'Key Lime Pie Martini': {
		category: 'Dessert',
		tags: ['Tart', 'Creamy', 'Sweet', 'Citrus'],
		profile: 'Zesty lime with Licor 43 cream — like a key lime pie in a chilled martini glass.'
	}
};

function openDrinkPopup(card) {
	const nameEl = card.querySelector('.cocktail-name');
	const descEl = card.querySelector('.drink-description, .cocktail-description');
	const priceEl = card.querySelector('.price p');
	const imgEl = card.querySelector('.cocktail-img');

	if (!nameEl || !imgEl) return;

	const rawName = nameEl.textContent.trim();
	const price = priceEl ? priceEl.textContent.trim() : '';
	const desc = descEl ? descEl.textContent.trim() : '';
	const imgSrc = imgEl.getAttribute('src');

	// Clean up rawName to match keys in drinkData despite exact HTML formatting
	let lookupName = rawName.replace(/[\n\r]+/g, ' ').replace(/\s{2,}/g, ' ').replace(/\u00A0/g, ' ').replace('’', "'").trim();
	if (lookupName.startsWith('Passion Fruit Margarita')) lookupName = 'Passion Fruit Margarita';

	const data = drinkData[lookupName] || drinkData[rawName] || {};

	document.getElementById('drink-popup-name').textContent = rawName;
	document.getElementById('drink-popup-price').textContent = price;
	document.getElementById('drink-popup-desc').textContent = desc;
	document.getElementById('drink-popup-img').setAttribute('src', imgSrc);
	document.getElementById('drink-popup-img').setAttribute('alt', rawName);
	document.getElementById('drink-category-badge').textContent = data.category || '';

	const tagsContainer = document.getElementById('drink-flavor-tags');
	tagsContainer.innerHTML = '';
	if (data.tags && data.tags.length) {
		data.tags.forEach(tag => {
			const span = document.createElement('span');
			span.className = 'drink-flavor-tag';
			span.textContent = tag;
			tagsContainer.appendChild(span);
		});
	}

	document.getElementById('drink-flavor-profile').textContent = data.profile || '';

	const popup = document.getElementById('drink-popup');
	const overlay = document.getElementById('drink-overlay');
	popup.style.display = 'flex';
	overlay.style.display = 'block';
	requestAnimationFrame(() => {
		popup.classList.add('drink-popup-visible');
		overlay.classList.add('drink-overlay-visible');
	});
}

function closeDrinkPopup() {
	const popup = document.getElementById('drink-popup');
	const overlay = document.getElementById('drink-overlay');
	popup.classList.remove('drink-popup-visible');
	overlay.classList.remove('drink-overlay-visible');
	setTimeout(() => {
		popup.style.display = 'none';
		overlay.style.display = 'none';
	}, 420);
}

document.getElementById('close-drink-popup').addEventListener('click', closeDrinkPopup);
document.getElementById('drink-overlay').addEventListener('click', closeDrinkPopup);

document.getElementById('cocktails').addEventListener('click', function (e) {
	const card = e.target.closest('.cocktails-grid .borderline, .cocktails-grid .cocktail-card');
	if (card) openDrinkPopup(card);
});

// ── DESSERT POPUP ──

const dessertData = {
	'Brazilian Flan': {
		tags: ['Caramel', 'Creamy', 'Silky', 'Classic'],
		profile: 'Silky egg custard with a deep amber caramel glaze — a true Brazilian tradition.'
	},
	'Creme Bruleé': {
		tags: ['Vanilla', 'Caramel', 'Crisp', 'Rich'],
		profile: 'Velvety custard beneath a glass-thin torched sugar crust. Elegant and timeless.'
	},
	'Tres Leches Cake': {
		tags: ['Milky', 'Soft', 'Sweet', 'Creamy'],
		profile: 'Ultra-moist sponge soaked in three milks with a cloud of fresh whipped cream.'
	},
	'Brasão Dessert Trio': {
		tags: ['Variety', 'Indulgent', 'Shareable', 'Sweet'],
		profile: 'Three of our most beloved desserts on one plate — perfect for the indecisive.'
	},
	'Papaya Cream': {
		tags: ['Tropical', 'Fruity', 'Creamy', 'Light'],
		profile: 'Fresh papaya blended with vanilla ice cream — bright, tropical, and refreshing.'
	},
	'Strawberry Cheesecake': {
		tags: ['Fruity', 'Creamy', 'Sweet', 'Rich'],
		profile: 'New York-style richness on a buttery graham crust with fresh strawberry topping.'
	},
	'Chocolate Molten Cake': {
		tags: ['Chocolate', 'Warm', 'Rich', 'Indulgent'],
		profile: 'Warm bittersweet chocolate cake with a flowing molten center. Pure decadence.'
	},
	'Tiramisu': {
		tags: ['Coffee', 'Creamy', 'Cocoa', 'Elegant'],
		profile: 'Espresso-drenched ladyfingers and mascarpone cream dusted with fine cocoa.'
	},
	'Chocolate Mousse Cake': {
		tags: ['Chocolate', 'Airy', 'Rich', 'Ganache'],
		profile: 'Moist chocolate layers with velvety mousse and a silky ganache finish.'
	},
	'Carrot Cake': {
		tags: ['Spiced', 'Creamy', 'Moist', 'Sweet'],
		profile: 'Warmly spiced carrot cake with smooth cream cheese icing and vanilla ice cream.'
	},
	'Key Lime Pie': {
		tags: ['Tart', 'Citrus', 'Creamy', 'Refreshing'],
		profile: 'Tangy lime filling in a golden crust — bright, smooth, and perfectly balanced.'
	},
	'Flaming Cheesecake': {
		tags: ['Flamb\u00e9ed', 'Caramel', 'Theatrical', 'Rich'],
		profile: 'Tableside flambé with Licor 43 and caramelized sugar — a true showstopper.'
	},
	'Fresh Fruit Bowl': {
		tags: ['Fresh', 'Light', 'Seasonal', 'Fruity'],
		profile: 'Seasonal fruits at peak ripeness with a cloud of fresh whipped cream.'
	},
	'Ice Cream': {
		tags: ['Vanilla', 'Classic', 'Creamy', 'Cold'],
		profile: 'Real Madagascar vanilla bean ice cream — pure, rich, and always satisfying.'
	}
};

function openDessertPopup(card) {
	const nameEl = card.querySelector('.cocktail-name');
	const descEl = card.querySelector('.drink-description');
	const priceEl = card.querySelector('.price p');
	const imgEl = card.querySelector('.cocktail-img');

	if (!nameEl || !imgEl) return;

	const rawName = nameEl.textContent.trim();
	const price = priceEl ? priceEl.textContent.trim() : '';
	const desc = descEl ? descEl.textContent.trim() : '';
	const imgSrc = imgEl.getAttribute('src');

	const data = dessertData[rawName] || {};

	document.getElementById('drink-popup-name').textContent = rawName;
	document.getElementById('drink-popup-price').textContent = price;
	document.getElementById('drink-popup-desc').textContent = desc;
	document.getElementById('drink-popup-img').setAttribute('src', imgSrc);
	document.getElementById('drink-popup-img').setAttribute('alt', rawName);
	document.getElementById('drink-category-badge').textContent = 'Desserts';

	const tagsContainer = document.getElementById('drink-flavor-tags');
	tagsContainer.innerHTML = '';
	if (data.tags && data.tags.length) {
		data.tags.forEach(tag => {
			const span = document.createElement('span');
			span.className = 'drink-flavor-tag';
			span.textContent = tag;
			tagsContainer.appendChild(span);
		});
	}

	document.getElementById('drink-flavor-profile').textContent = data.profile || '';

	const popup = document.getElementById('drink-popup');
	const overlay = document.getElementById('drink-overlay');
	popup.style.display = 'flex';
	overlay.style.display = 'block';
	requestAnimationFrame(() => {
		popup.classList.add('drink-popup-visible');
		overlay.classList.add('drink-overlay-visible');
	});
}

document.getElementById('desserts').addEventListener('click', function (e) {
	const card = e.target.closest('.dessert-card');
	if (card) openDessertPopup(card);
});
