/* 
   DATA FOR PAIRING ENGINE 
   Includes all meats from brasaousa.com/menu and wines from the local menu.
*/

const meats = [
    // BEEF (9 Cuts)
    { id: 'picanha', name: 'Picanha', desc: 'Prime Top Sirloin Cap', tags: ['Fatty', 'Salty', 'Savory'], type: 'red_meat', weight: 9 },
    { id: 'spicy_picanha', name: 'Spicy Picanha', desc: 'Spicy Special Blend', tags: ['Spicy', 'Fatty', 'Savory'], type: 'red_meat', weight: 9 },
    { id: 'garlic_picanha', name: 'Garlic Picanha', desc: 'Picanha with Garlic', tags: ['Garlic', 'Fatty', 'Bold'], type: 'red_meat', weight: 9 },
    { id: 'fraldinha', name: 'Fraldinha', desc: 'Bottom Sirloin', tags: ['Textured', 'Robust', 'Juicy'], type: 'red_meat', weight: 8 },
    { id: 'ribeye', name: 'Ribeye', desc: 'Marbled Steak', tags: ['Fatty', 'Bold', 'Juicy'], type: 'red_meat', weight: 10 },
    { id: 'alcatra', name: 'Alcatra', desc: 'Top Sirloin', tags: ['Lean', 'Savory', 'Mild'], type: 'red_meat', weight: 7 },
    { id: 'filet', name: 'Filet Mignon', desc: 'Tenderloin', tags: ['Lean', 'Tender', 'Mild'], type: 'red_meat', weight: 6 },
    { id: 'filet_bacon', name: 'Filet w/ Bacon', desc: 'Wrapped in Bacon', tags: ['Fatty', 'Smoky', 'Salty'], type: 'red_meat', weight: 8 },
    { id: 'beef_ribs', name: 'Beef Ribs', desc: 'Slow Roasted Ribs', tags: ['Fatty', 'Rich', 'Smoky'], type: 'red_meat', weight: 10 },

    // LAMB (2 Cuts)
    { id: 'lamb_chops', name: 'Lamb Chops', desc: 'Marinated Chops', tags: ['Gamey', 'Herbal', 'Rich'], type: 'red_meat', weight: 8 },
    { id: 'leg_lamb', name: 'Leg of Lamb', desc: 'Sliced Leg', tags: ['Gamey', 'Lean', 'Roast'], type: 'red_meat', weight: 7 },

    // PORK & POULTRY (4 Cuts)
    { id: 'pork_ribs', name: 'Pork Ribs', desc: 'Marinated Pork', tags: ['Sweet', 'Savory', 'Tender'], type: 'white_meat', weight: 6 },
    { id: 'sausage', name: 'Sausage', desc: 'Brazilian Sausage', tags: ['Spicy', 'Salty', 'Oily'], type: 'white_meat', weight: 7 },
    { id: 'chicken_bacon', name: 'Chicken w/ Bacon', desc: 'Breast wrapped in Bacon', tags: ['Salty', 'Savory', 'Poultry'], type: 'white_meat', weight: 6 },
    { id: 'chicken_legs', name: 'Chicken Legs', desc: 'Marinated Drumsticks', tags: ['Herbal', 'Poultry', 'Mild'], type: 'white_meat', weight: 5 },

    // SEAFOOD & SPECIALTY (2 Items)
    { id: 'shrimp', name: 'Grilled Shrimp', desc: 'Seasoned Shrimp', tags: ['Light', 'Sea', 'Garlic'], type: 'seafood', weight: 3 },
    { id: 'pineapple', name: 'Grilled Pineapple', desc: 'Cinammon & Sugar', tags: ['Sweet', 'Acidic', 'Fruity'], type: 'fruit', weight: 1 }
];

const wines = [
    // REDS
    { id: 'cab', name: 'Cabernet Sauvignon', desc: 'Bold & Tannic', tags: ['High Tannin', 'Bold', 'Oak'], category: 'red', body: 10 },
    { id: 'malbec', name: 'Malbec', desc: 'Plum & Spice', tags: ['Fruity', 'Spicy', 'Medium Tannin'], category: 'red', body: 9 },
    { id: 'merlot', name: 'Merlot', desc: 'Soft & Velvety', tags: ['Soft Tannin', 'Fruit Forward', 'Smooth'], category: 'red', body: 7 },
    { id: 'pinot_noir', name: 'Pinot Noir', desc: 'Light & Earthy', tags: ['High Acid', 'Light Body', 'Earthy'], category: 'red', body: 5 },
    { id: 'red_blend', name: 'Red Blend', desc: 'Complex & Balanced', tags: ['Balanced', 'Rich', 'Smooth'], category: 'red', body: 8 },
    { id: 'sangiovese', name: 'Sangiovese', desc: 'Tart Cherry & Herb', tags: ['High Acid', 'Herbal', 'Savory'], category: 'red', body: 6 },
    { id: 'toro', name: 'Tempranillo', desc: 'Full & Rustic', tags: ['Bold', 'Earthy', 'Leathery'], category: 'red', body: 9 },

    // WHITES & SPARKLING
    { id: 'chardonnay', name: 'Chardonnay', desc: 'Buttery & Oaky', tags: ['Full Body', 'Creamy', 'Oak'], category: 'white', body: 7 },
    { id: 'sauv_blanc', name: 'Sauvignon Blanc', desc: 'Crisp & Zesty', tags: ['High Acid', 'Citrus', 'Light'], category: 'white', body: 3 },
    { id: 'pinot_grigio', name: 'Pinot Grigio', desc: 'Light & Dry', tags: ['Light', 'Crisp', 'Neutral'], category: 'white', body: 2 },
    { id: 'riesling', name: 'Riesling', desc: 'Sweet & Aromatic', tags: ['Sweet', 'High Acid', 'Fruity'], category: 'white', body: 3 },
    { id: 'moscato', name: 'Moscato', desc: 'Sweet & Fizzy', tags: ['Very Sweet', 'Fruity', 'Light'], category: 'white', body: 2 },
    { id: 'rose', name: 'Rosé', desc: 'Fresh & Berry', tags: ['Acidic', 'Fruity', 'Dry'], category: 'rose', body: 4 },
    { id: 'sparkling', name: 'Champagne / Sparkling', desc: 'Bubbles & Toast', tags: ['Bubbles', 'High Acid', 'Cleansing'], category: 'sparkling', body: 3 }
];

let selectedMeat = null;
let selectedWine = null;

const descriptionPool = {
    perfect: [
        "A symphony of flavors. Truly exceptional.",
        "The harmony here is undeniable.",
        "A pairing worthy of a celebration.",
        "Matches weight, texture, and intensity flawlessly."
    ],
    excellent: [
        "A delightful balance of elements.",
        "Enhances the profile of the meat beautifully.",
        "A strong, confident pairing choice.",
        "Complex layers of flavor unfold with each bite."
    ],
    good: [
        "A solid, enjoyable dining companion.",
        "Works well, balancing the main notes.",
        "Pleasant, though perhaps safe.",
        "A reliable choice for this cut."
    ],
    clash: [
        "The flavors are fighting for dominance.",
        "The wine might overwhelm the delicate notes here.",
        "An unconventional mix, slightly unbalanced.",
        "Likely too disparate in intensity."
    ],
    bad: [
        "Not recommended; flavors may clash unpleasantly.",
        "The components work against each other here.",
        "Likely to leave a metallic or bitter finish.",
        "A mismatch in both weight and flavor profile."
    ]
};

function getRandomText(category) {
    const list = descriptionPool[category];
    return list[Math.floor(Math.random() * list.length)];
}

// ADVANCED SCORING ENGINE
function calculatePairing(meatId, wineId) {
    const meat = meats.find(m => m.id === meatId);
    const wine = wines.find(w => w.id === wineId);

    // 1. Weight Matching (Body vs. Fat/Richness)
    // Diff of 0 = perfect match (100 base)
    // Diff of 5+ = bad match
    let weightDiff = Math.abs(meat.weight - wine.body);
    let score = 95 - (weightDiff * 6);

    let primaryFactor = "";

    // 2. Tag Interactions (Bonus/Penalty)

    // Fat + Tannin/Acid/Bubbles (Cleansing)
    if (meat.tags.includes('Fatty')) {
        if (wine.tags.includes('High Tannin')) { score += 8; primaryFactor = "Tannins cleanse the palate."; }
        else if (wine.tags.includes('High Acid')) { score += 6; primaryFactor = "Acidity cuts through the fat."; }
        else if (wine.tags.includes('Bubbles')) { score += 7; primaryFactor = "Bubbles scrub the richness away."; }
    }

    // Spice + Sweet (Cooling) vs Spice + Tannin (Burning)
    if (meat.tags.includes('Spicy')) {
        if (wine.tags.includes('Sweet')) { score += 12; primaryFactor = "Sweetness tames the heat beautifully."; }
        else if (wine.tags.includes('High Tannin')) { score -= 15; primaryFactor = "High tannins amplify the spice heat."; }
    }

    // Salt + Acid (Highlighting)
    if (meat.tags.includes('Salty') && (wine.tags.includes('High Acid') || wine.tags.includes('Bubbles'))) {
        score += 5;
    }

    // Seafood + Red (Metallic risk)
    if (meat.type === 'seafood' && wine.category === 'red') {
        score -= 30;
        primaryFactor = "Red tannins can clash metallically with seafood.";
    }

    // 3. Specific Override Adjustments (The "Chef's Kiss" or "Hard No")

    // GOD TIER - 100% MATCHES
    if (meat.id === 'ribeye' && wine.id === 'cab') {
        score = 100;
        primaryFactor = "The King of Steaks meets the King of Wines. Unbeatable.";
    }
    if ((meat.id === 'picanha' || meat.id === 'garlic_picanha') && wine.id === 'malbec') {
        score = 100;
        primaryFactor = "The signature Brazilian cut deserves this perfect South American partner.";
    }
    if (meat.id.includes('lamb') && wine.id === 'red_blend') {
        score = 100;
        primaryFactor = "Complex blends mirror the complex, herbal flavors of the lamb perfectly.";
    }
    if (meat.id === 'pineapple' && wine.id === 'moscato') {
        score = 100;
        primaryFactor = "A dessert dream. The cinnamon and sugar sing with the sweet sparkle.";
    }

    // Other adjustments
    if (meat.id.includes('lamb') && ['pinot_noir', 'toro'].includes(wine.id)) {
        score += 5;
    }

    if (meat.id === 'shrimp' && wine.tags.includes('Oak')) {
        score -= 10; // Oaky chard can overpower lighter shrimp
        primaryFactor = "Heavy oak might bury the shrimp's flavor.";
    }

    // 4. Random Micro-Variance (REMOVED for consistency)
    // if (score < 100) {
    //     score += Math.floor(Math.random() * 3);
    // }

    // Hard Caps
    if (score > 100) score = 100;
    if (score < 30) score = 30;


    // 5. Generate Description
    let textDesc = "";

    // Helper for deterministic text selection based on IDs
    function getDeterministicText(category, seedStr) {
        const list = descriptionPool[category];
        // Simple hash of the seed string to get an index
        let hash = 0;
        for (let i = 0; i < seedStr.length; i++) {
            hash = seedStr.charCodeAt(i) + ((hash << 5) - hash);
        }
        const index = Math.abs(hash) % list.length;
        return list[index];
    }

    if (score === 100) {
        textDesc = "✨ PERFECT MATCH! ✨ " + (primaryFactor || "Flawless harmony.");
    } else if (primaryFactor) {
        textDesc = primaryFactor + " " + (score > 80 ? "Harmonious balance." : "");
    } else {
        // Fallback to generic categories using deterministic selection
        const seed = meatId + wineId;
        if (score >= 93) textDesc = getDeterministicText('perfect', seed);
        else if (score >= 85) textDesc = getDeterministicText('excellent', seed);
        else if (score >= 70) textDesc = getDeterministicText('good', seed);
        else if (score >= 50) textDesc = getDeterministicText('clash', seed);
        else textDesc = getDeterministicText('bad', seed);
    }

    // Unique Flavor Tag Combinations
    const combinedTags = [...new Set([...meat.tags, ...wine.tags])].slice(0, 6);

    return { score, text: textDesc, tags: combinedTags };
}

function initPairing() {
    const meatCol = document.getElementById('meat-list');
    const wineCol = document.getElementById('wine-list');

    // Clear existing content (targets only the scroll container now)
    meatCol.innerHTML = '';
    wineCol.innerHTML = '';

    // Render Meats
    meats.forEach(meat => {
        const btn = document.createElement('div');
        btn.className = 'pairing-btn';
        // Add an icon for visual flair if desired, or keep text
        btn.innerHTML = `<div><div class="item-name">${meat.name}</div><div class="item-desc">${meat.desc}</div></div>`;
        btn.onclick = () => selectMeat(meat.id, btn);
        meatCol.appendChild(btn);
    });

    // Render Wines
    wines.forEach(wine => {
        const btn = document.createElement('div');
        btn.className = 'pairing-btn';
        btn.innerHTML = `<div><div class="item-name">${wine.name}</div><div class="item-desc">${wine.desc}</div></div>`;
        btn.onclick = () => selectWine(wine.id, btn);
        wineCol.appendChild(btn);
    });
}

function selectMeat(id, element) {
    selectedMeat = id;
    document.querySelectorAll('#meat-list .pairing-btn').forEach(b => b.classList.remove('active'));
    element.classList.add('active');
    updateResult();
}

function selectWine(id, element) {
    selectedWine = id;
    document.querySelectorAll('#wine-list .pairing-btn').forEach(b => b.classList.remove('active'));
    element.classList.add('active');
    updateResult();
}

function updateResult() {
    const placeholder = document.getElementById('result-placeholder');
    const content = document.getElementById('result-content');

    if (selectedMeat && selectedWine) {
        placeholder.style.display = 'none';
        content.style.display = 'block';

        const result = calculatePairing(selectedMeat, selectedWine);

        const scoreEl = document.getElementById('match-score');
        scoreEl.innerText = `${result.score}%`;

        // Dynamic Color Logic
        if (result.score >= 90) scoreEl.style.color = "#C5A059";
        else if (result.score >= 75) scoreEl.style.color = "#FFFCF1";
        else if (result.score >= 50) scoreEl.style.color = "#E0A899";
        else scoreEl.style.color = "#d9534f";

        document.getElementById('match-text').innerText = result.text;

        const tagsHTML = result.tags.map(t => `<span class="flavor-tag">${t}</span>`).join('');
        document.getElementById('flavor-tags').innerHTML = tagsHTML;

    } else {
        placeholder.style.display = 'block';
        content.style.display = 'none';
    }
}

// Auto init
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPairing);
} else {
    initPairing();
}
