// Pricing matrix per kilometer based on transit profile (GHS)
const pricingMatrix = {
    domestic: 20.00,      // Baseline domestic route rate
    crossBorder: 55.00,   // Clearing and cross-border toll integration rate
    heavyHaulage: 110.00  // Special vehicle escort and out-of-gauge payload rate
};

function calculateFreightCost(distance, weight, cargoType) {
    const baseRatePerKm = pricingMatrix[cargoType] || pricingMatrix.domestic;
    
    // Core structural calculation
    let baseTripCost = distance * baseRatePerKm;
    
    // Apply dynamic weight surcharge for loads exceeding 10 Tons
    let weightSurcharge = 0;
    if (weight > 10) {
        weightSurcharge = (weight - 10) * 15 * (distance / 100);
    }
    
    const finalTotal = baseTripCost + weightSurcharge;
    return finalTotal.toLocaleString('en-GH', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// Global DOM Event Binding
document.getElementById('calc-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Extract parameters safely
    const distance = parseFloat(document.getElementById('distance').value);
    const weight = parseFloat(document.getElementById('weight').value);
    const cargoType = document.getElementById('cargo-type').value;
    
    // Execute mathematical pricing engine
    const computedCost = calculateFreightCost(distance, weight, cargoType);
    
    // Unhide and manipulate UI element nodes
    const resultBox = document.getElementById('result-box');
    const costDisplay = document.getElementById('cost-display');
    
    costDisplay.innerText = `GHS ${computedCost}`;
    resultBox.classList.remove('hidden');
});
  
