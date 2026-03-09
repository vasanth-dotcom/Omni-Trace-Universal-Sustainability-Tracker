const Factors = {
    transport: {
        petrol: { eff: 15, factor: 2.3 },
        diesel: { eff: 18, factor: 2.7 },
        ev: { eff: 1, factor: 0.05 },
        bus: { eff: 1, factor: 0.1 },
        metro: { eff: 1, factor: 0.03 },
        walking: { eff: 1, factor: 0 }
    },
    kitchen: {
        protein: { beef: 15, pork: 7.5, chicken: 2.5, eggs: 0.8, plant: 0.4 },
        cooking: { lpg: 1.2, png: 0.9, induction: 0.4 },
        delivery: { yes: 1.5, no: 0 },
        waste: { yes: 1.0, no: 0 }
    },
    energy: { 
        ac: 1.5, 
        geyser: { "0": 0, "10": 0.5, "20": 1.0, "30": 1.5 },
        highLoad: 0.8,
        digital: 0.3,
        light: { led: 0.1, inc: 0.6 }
    },
    waste: { bag: 1.5, plastic: 0.5 }
};

const Backgrounds = {
    1: "url('transport.png')",
    2: "url('https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=1920')",
    3: "url('https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=1920')",
    4: "url('wastage.png')"
};

const Formulas = {
    1: "<strong>Transport Formula:</strong><br><code>(Distance / Efficiency) × Fuel Factor / Occupancy</code>",
    2: "<strong>Kitchen Formula:</strong><br><code>(Protein Score × Sourcing) + Cooking Method + Delivery + Food Waste</code>",
    3: "<strong>Energy Formula:</strong><br><code>(AC Hours × 1.5) + Geyser Time + (Load × 0.8) + Digital Use + Lighting</code>",
    4: "<strong>Waste Formula:</strong><br><code>(Trash Bags × 1.5) + Laundry Dryer Use</code>"
};

let currentPhase = 1;
let totalImpact = { transport: 0, kitchen: 0, plug: 0, bin: 0 };
let charts = {}; 

function toggleHistory() {
    document.getElementById('history-sidebar').classList.toggle('hidden');
}

function toggleFormula() {
    document.getElementById('formula-sidebar').classList.toggle('hidden');
}

function navigateTo(viewId) {
    document.querySelectorAll('.view').forEach(v => v.classList.add('hidden'));
    document.getElementById(viewId).classList.remove('hidden');
    if(viewId === 'view-dashboard') loadHistory();
}

function saveToHistory(score) {
    let history = JSON.parse(localStorage.getItem('omniHistory')) || [];
    const entry = { date: new Date().toLocaleString(), val: score.toFixed(2) };
    history.unshift(entry);
    localStorage.setItem('omniHistory', JSON.stringify(history.slice(0, 10)));
}

function loadHistory() {
    const container = document.getElementById('history-content');
    let history = JSON.parse(localStorage.getItem('omniHistory')) || [];
    if(history.length === 0) {
        container.innerHTML = '<p class="empty-msg">No previous audits found.</p>';
        return;
    }
    container.innerHTML = history.map(item => `
        <div class="history-item">
            <span>${item.date}</span>
            <strong>${item.val} kg CO2e</strong>
        </div>
    `).join('');
}

function clearHistory() {
    localStorage.removeItem('omniHistory');
    loadHistory();
}

function startAudit() {
    currentPhase = 1;
    totalImpact = { transport: 0, kitchen: 0, plug: 0, bin: 0 };
    document.getElementById('formula-sidebar').classList.add('hidden');
    navigateTo('view-audit');
    renderPhase();
}

function goBack() {
    if (currentPhase > 1) {
        currentPhase--;
        renderPhase();
    }
}

function renderPhase() {
    const container = document.getElementById('audit-questions');
    const progress = document.getElementById('audit-progress');
    const btnNext = document.getElementById('btn-next');
    const btnBack = document.getElementById('btn-back');
    const auditView = document.getElementById('view-audit');
    const formulaContainer = document.getElementById('formula-content');
    
    if (currentPhase === 1) {
        btnBack.classList.add('hidden');
    } else {
        btnBack.classList.remove('hidden');
    }

    auditView.style.backgroundImage = Backgrounds[currentPhase];
    formulaContainer.innerHTML = Formulas[currentPhase];
    progress.style.width = (currentPhase * 25) + "%";
    btnNext.innerText = (currentPhase === 4) ? "Calculate Your Final Footprint" : "Next Phase";

    let content = "";
    switch(currentPhase) {
        case 1:
            content = `<h2>Phase 1: The Commute</h2>
                <div class="q-row"><label>Primary Mode</label><select id="mode"><option value="petrol">Petrol Car</option><option value="diesel">Diesel Car</option><option value="ev">Electric Vehicle</option><option value="bus">Public Transport (Bus)</option><option value="metro">Metro Train</option><option value="walking">Walking/Cycling</option></select></div>
                <div class="q-row"><label>Total Distance today (km)</label><input type="number" id="dist" placeholder="0"></div>
                <div class="q-row"><label>Occupancy (People)</label><input type="number" id="occ" value="1" min="1"></div>`;
            break;
        case 2:
            content = `<h2>Phase 2: The Kitchen</h2>
                <div class="q-row"><label>Main Protein Today</label><select id="prot"><option value="beef">Beef/Lamb</option><option value="pork">Pork</option><option value="chicken">Chicken/Fish</option><option value="eggs">Eggs/Dairy</option><option value="plant">Plant-based</option></select></div>
                <div class="q-row"><label>Sourcing</label><select id="local"><option value="1">Local/Seasonal</option><option value="1.5">Imported</option></select></div>
                <div class="q-row"><label>Cooking Method</label><select id="cook"><option value="lpg">LPG</option><option value="png">PNG</option><option value="induction">Induction</option></select></div>
                <div class="q-row"><label>Online Delivery(Did you order food online today?)</label><select id="delivery"><option value="no">No</option><option value="yes">Yes</option></select></div>
                <div class="q-row"><label>Food Waste (Did you leave >10% uneaten?)</label><select id="waste_food"><option value="no">No</option><option value="yes">Yes</option></select></div>`;
            break;
        case 3:
            content = `<h2>Phase 3: The Plug (Home Energy)</h2>
                <div class="q-row"><label>AC / Heater (Hours)</label><input type="number" id="ac" placeholder="0"></div>
                <div class="q-row"><label>Electric Geyser</label><select id="geyser"><option value="0">None</option><option value="10">10m</option><option value="20">20m</option><option value="30">30m</option></select></div>
                <div class="q-row"><label>High-Load Appliances: Run Washing Machine/Dishwasher/Vacuum</label><select id="highload"><option value="0">None</option><option value="1">1  Appliance</option><option value="2">2 Appliances</option><option value="3">3+ Appliances</option></select></div>
                <div class="q-row"><label>Digital Use (Gaming/4K TV Hours)</label><input type="number" id="digital" placeholder="0"></div>
                <div class="q-row"><label>Lighting</label><select id="lighting"><option value="led">LED(Low Energy)</option><option value="inc">Incandescent/CFL(High Energy)</option></select></div>`;
            break;
        case 4:
            content = `<h2>Phase 4: The Bin</h2>
                <div class="q-row"><label>Trash Volume (Bags)</label><input type="number" id="trash" placeholder="0"></div>
                <div class="q-row"><label>Laundry Dry</label><select id="laundry"><option value="0">Air Dry(Zero impact)</option><option value="1.2">Electric Dryer</option></select></div>`;
            break;
    }
    container.innerHTML = content;
}

document.getElementById('btn-next').addEventListener('click', () => {
    saveCurrentPhaseData();
    if (currentPhase < 4) {
        currentPhase++;
        renderPhase();
    } else {
        showResults();
    }
});

function saveCurrentPhaseData() {
    if(currentPhase === 1) {
        let d = parseFloat(document.getElementById('dist').value) || 0;
        let o = parseInt(document.getElementById('occ').value) || 1;
        let m = document.getElementById('mode').value;
        const config = Factors.transport[m];
        let res = (m === 'ev' || m === 'bus' || m === 'metro') ? (d * config.factor) : (d / config.eff) * config.factor;
        totalImpact.transport = res / o;
    } else if(currentPhase === 2) {
        let prot = Factors.kitchen.protein[document.getElementById('prot').value];
        let loc = parseFloat(document.getElementById('local').value);
        let cook = Factors.kitchen.cooking[document.getElementById('cook').value];
        totalImpact.kitchen = (prot * loc) + cook + Factors.kitchen.delivery[document.getElementById('delivery').value] + Factors.kitchen.waste[document.getElementById('waste_food').value];
    } else if(currentPhase === 3) {
        let ac = (parseFloat(document.getElementById('ac').value) || 0) * Factors.energy.ac;
        let gey = Factors.energy.geyser[document.getElementById('geyser').value];
        let load = parseInt(document.getElementById('highload').value) * Factors.energy.highLoad;
        let dig = (parseFloat(document.getElementById('digital').value) || 0) * Factors.energy.digital;
        totalImpact.plug = ac + gey + load + dig + Factors.energy.light[document.getElementById('lighting').value];
    } else if(currentPhase === 4) {
        totalImpact.bin = (parseFloat(document.getElementById('trash').value) || 0) * Factors.waste.bag + parseFloat(document.getElementById('laundry').value);
    }
}

function showResults() {
    const finalDaily = totalImpact.transport + totalImpact.kitchen + totalImpact.plug + totalImpact.bin;
    const finalAnnual = (finalDaily * 365) / 1000; 

    document.getElementById('final-debit').innerText = finalDaily.toFixed(2);
    document.getElementById('annual-debit').innerText = finalAnnual.toFixed(2);
    
    // NEW DYNAMIC TEXT LOGIC
    const projectionElement = document.getElementById('projection-message');
    projectionElement.innerHTML = `Today’s choices added <strong>${finalDaily.toFixed(2)} kg</strong> to your footprint. If today was your 'everyday,' your annual echo would reach <strong>${finalAnnual.toFixed(2)} Tonnes</strong>.`;

    saveToHistory(finalDaily);
    navigateTo('view-results');
    renderResultCharts();
}

function renderResultCharts() {
    if(charts.pie) charts.pie.destroy();
    if(charts.bar) charts.bar.destroy();

    const finalDaily = totalImpact.transport + totalImpact.kitchen + totalImpact.plug + totalImpact.bin;

    const ctxPie = document.getElementById('pieChart').getContext('2d');
    charts.pie = new Chart(ctxPie, {
        type: 'doughnut',
        data: {
            labels: ['Transport', 'Kitchen', 'Energy', 'Waste'],
            datasets: [{
                data: [totalImpact.transport, totalImpact.kitchen, totalImpact.plug, totalImpact.bin],
                backgroundColor: ['#6366F1', '#10B981', '#F59E0B', '#94A3B8'],
                borderWidth: 0
            }]
        },
        options: { 
            responsive: true, 
            maintainAspectRatio: false, 
            plugins: { 
                legend: { position: 'bottom' },
                title: { display: true, text: 'Daily Footprint Distribution (kg)' }
            } 
        }
    });

    const ctxBar = document.getElementById('barChart').getContext('2d');
    charts.bar = new Chart(ctxBar, {
        type: 'bar',
        data: {
            labels: ['You (Daily)', 'India Avg (Daily)', 'World Avg (Daily)'],
            datasets: [{
                label: 'kg CO2e',
                data: [finalDaily, 5.75, 13.42], 
                backgroundColor: ['#6366F1', '#10B981', '#F59E0B'],
                borderRadius: 8
            }]
        },
        options: { 
            responsive: true, 
            maintainAspectRatio: false,
            plugins: {
                title: { display: true, text: 'Comparison vs Benchmarks' }
            }
        }
    });
}

window.onload = loadHistory;