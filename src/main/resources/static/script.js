// Formulas
// Total Power (Ptotal) = Pmax * Ns * Np
// Open Circuit Voltage (VocArray) = Voc * Ns * 1.2 --> Assuming temperature correction factor of 1.2
// Max Charge Current (Icharge) = Ptotal / exactBatteryBankVoltage
document.addEventListener("DOMContentLoaded", () => {
    const inputs = document.querySelectorAll("input");
    const selected = document.querySelectorAll("select");

    inputs.forEach(input => {
        input.addEventListener("input", compute);
    });
    selected.forEach(select => {
        select.addEventListener("change", compute);
    });

    // Initial function call to compute output for default values
    compute();

    function compute() {
        // All input fields required to compute outputs
        let Pmax = parseFloat(document.getElementById("max-power").value);
        let Voc = parseFloat(document.getElementById("open-circuit-voltage").value);
        let Isc = parseFloat(document.getElementById("short-circuit-current").value);
        let Ns = parseInt(document.getElementById("series").value);
        let Np = parseInt(document.getElementById("parallel").value);
        let batteryBankVoltage = parseInt(document.getElementById("battery-bank-voltage").value);
        let exactBatteryBankVoltage = 0;

        // If input is empty then default to 0
        if (!Pmax){
            Pmax = 0;
        }
        if (!Voc){
            Voc = 0;
        }
        if (!Isc){
            Isc = 0;
        }
        if (!Ns){
            Ns = 0;
        }
        if (!Np){
            Np = 0;
        }

        if (batteryBankVoltage === 12){
            exactBatteryBankVoltage = 14.7;
        }
        else if (batteryBankVoltage === 24){
            exactBatteryBankVoltage = 29.4;
        }
        else{
            return;
        }

        const Ptotal = Pmax * Ns * Np;
        const VocArray = Voc * Ns * 1.2;
        const Icharge = Ptotal / exactBatteryBankVoltage;

        document.getElementById("total-power").innerHTML = `<p>${Ptotal.toFixed(2)} W</p>`;
        document.getElementById("final-open-circuit-voltage").innerHTML = `<p>${VocArray.toFixed(2)} V</p>`;
        document.getElementById("max-current-charge").innerHTML = `<p>${Icharge.toFixed(2)} A</p>`;
    }
});