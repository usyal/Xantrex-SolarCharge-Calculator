// Formulas
// Total Power (Ptotal) = Pmax * Ns * Np
// Open Circuit Voltage (VocArray) = Voc * Ns * 1.2 --> Assuming temperature correction factor of 1.2
// Max Charge Current (Icharge) = Ptotal / exactSystemVoltage
// Max Power Voltage (VmpArray) = Vmp * Ns
// Max Power Current (ImpArray) = Imp * Np 
document.addEventListener("DOMContentLoaded", () => {
    const modal = new bootstrap.Modal(document.getElementById("modal"));
    modal.show();

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

    const panelSpecs = {
        "115W": { Pmax: 115, Voc: 27.4, Vmp: 22.1, Isc: 5.6, Imp: 5.2},
        "115Wslim": { Pmax: 115, Voc: 27.4, Vmp: 22.1, Isc: 5.6, Imp: 5.2},
        "220W": { Pmax: 220, Voc: 25.8, Vmp: 20.9, Isc: 11.2, Imp: 10.4},
        "330W": { Pmax: 330, Voc: 43.8, Vmp: 36.9, Isc: 9.7, Imp: 9.0},
        "110W": { Pmax: 110, Voc: 23.3, Vmp: 18.9, Isc: 5.95, Imp: 5.83}
    };

    const panelSelect = document.getElementById("solar-panel-type");

    panelSelect.addEventListener("change", () => {
        const selectedValue = panelSelect.value;

        if (panelSpecs[selectedValue]) {
            document.getElementById("max-power").value = panelSpecs[selectedValue].Pmax;
            document.getElementById("open-circuit-voltage").value = panelSpecs[selectedValue].Voc;
            document.getElementById("max-power-voltage").value = panelSpecs[selectedValue].Vmp;
            document.getElementById("short-circuit-current").value = panelSpecs[selectedValue].Isc;
            document.getElementById("max-power-current").value = panelSpecs[selectedValue].Imp;
        } 
        compute();
    });

    async function compute() {
        // All input fields required to compute outputs
        let Pmax = parseFloat(document.getElementById("max-power").value);
        let Voc = parseFloat(document.getElementById("open-circuit-voltage").value);
        let Vmp = parseFloat(document.getElementById("max-power-voltage").value);
        let Isc = parseFloat(document.getElementById("short-circuit-current").value);
        let Imp = parseFloat(document.getElementById("max-power-current").value);
        let Ns = parseInt(document.getElementById("series").value);
        let Np = parseInt(document.getElementById("parallel").value);
        let tempFactor = parseFloat(document.getElementById("temp-factor").value);
        let systemVoltage = parseInt(document.getElementById("system-voltage").value);
        let batteryType = document.getElementById("battery-type").value;
        let exactSystemVoltage = 0;

        // If input is empty then default to 0
        if (!Pmax){
            Pmax = 0;
        }
        if (!Voc){
            Voc = 0;
        }
        if (!Vmp){
            Vmp = 0;
        }
        if (!Isc){
            Isc = 0;
        }
        if (!Imp){
            Imp = 0;
        }
        if (!Ns){
            Ns = 0;
        }
        if (!Np){
            Np = 0;
        }
        if (!tempFactor){
            tempFactor = 1;
        }

        if (systemVoltage === 12){
            if (batteryType === "LiFePO4"){
                exactSystemVoltage = 14.4;
            }
            if (batteryType === "AGM"){
                exactSystemVoltage = 14.4;
            }
            if (batteryType === "FLA"){
                exactSystemVoltage = 14.6;
            }
            if (batteryType === "Gel"){
                exactSystemVoltage = 14.1;
            }
        }
        else if (systemVoltage === 24){
            if (batteryType === "LiFePO4"){
                exactSystemVoltage = 28.8;
            }
            if (batteryType === "AGM"){
                exactSystemVoltage = 28.8;
            }
            if (batteryType === "FLA"){
                exactSystemVoltage = 29.2;
            }
            if (batteryType === "Gel"){
                exactSystemVoltage = 28.2;
            }
        }
        else{
            return;
        }

        const Ptotal = Pmax * Ns * Np;
        const VocArray = Voc * Ns * tempFactor;
        const Icharge = Ptotal / exactSystemVoltage;
        const VmpArray = Vmp * Ns;
        const ImpArray = Imp * Np;

        document.getElementById("total-power").innerHTML = `<p>${Ptotal.toFixed(2)} W</p>`;
        document.getElementById("final-open-circuit-voltage").innerHTML = `<p>${VocArray.toFixed(2)} V</p>`;
        document.getElementById("max-current-charge").innerHTML = `<p>${Icharge.toFixed(2)} A</p>`;
        document.getElementById("final-max-power-voltage").innerHTML = `<p>${VmpArray.toFixed(2)} V</p>`;
        document.getElementById("final-max-power-current").innerHTML = `<p>${ImpArray.toFixed(2)} A</p>`;

        // Ranges for if a Charger can be suggested from Xantrex
        const suggestion30ARange = {
            "12": {
                Ptotal: { min: 50, max: 580 },
                VocArray: { min: 18, max: 100 },
                VmpArray: { min: 18, max: 72 },
                ImpArray: { min: 1, max: 30 },
                Icharge: { min: 1, max: 30 }
            },
            "24": {
                Ptotal: { min: 100, max: 1170 },
                VocArray: { min: 36, max: 100 }, 
                VmpArray: { min: 36, max: 72 },
                ImpArray: { min: 1, max: 30 },
                Icharge: { min: 1, max: 30 }
            }
        };
        
        const suggestion60ARange = {
            "12": {
                Ptotal: { min: 100, max: 800 },
                VocArray: { min: 18, max: 150 },
                VmpArray: { min: 18, max: 120 },
                ImpArray: { min: 1, max: 60 },
                Icharge: { min: 1, max: 60 }
            },
            "24": {
                Ptotal: { min: 200, max: 1600 },
                VocArray: { min: 36, max: 150 },
                VmpArray: { min: 36, max: 120 },
                ImpArray: { min: 1, max: 60 },
                Icharge: { min: 1, max: 60 }
            }
        };

        const suggestionPWM30ARange = {
            "12": {
                Ptotal: { min: 50, max: 400 },
                VocArray: { min: 18, max: 50 },
                VmpArray: { min: 17, max: 36 },
                ImpArray: { min: 1, max: 30 },
                Icharge: { min: 1, max: 30 }
            },
            "24": {
                Ptotal: { min: 100, max: 800 },
                VocArray: { min: 36, max: 50 },
                VmpArray: { min: 30, max: 72 },
                ImpArray: { min: 1, max: 30 },
                Icharge: { min: 1, max: 30 }
            }
        };

        // Checking what possible charge controllers can be suggested
        const ranges30 = suggestion30ARange[systemVoltage.toString()];
        const suggestion30A = ranges30 && (
            Ptotal >= ranges30.Ptotal.min && Ptotal <= ranges30.Ptotal.max &&
            VocArray >= ranges30.VocArray.min && VocArray <= ranges30.VocArray.max &&
            VmpArray >= ranges30.VmpArray.min && VmpArray <= ranges30.VmpArray.max &&
            ImpArray >= ranges30.ImpArray.min && ImpArray <= ranges30.ImpArray.max &&
            Icharge >= ranges30.Icharge.min && Icharge <= ranges30.Icharge.max
        );
        const ranges60 = suggestion60ARange[systemVoltage.toString()];
        const suggestion60A = ranges60 && (
            Ptotal >= ranges60.Ptotal.min && Ptotal <= ranges60.Ptotal.max &&
            VocArray >= ranges60.VocArray.min && VocArray <= ranges60.VocArray.max &&
            VmpArray >= ranges60.VmpArray.min && VmpArray <= ranges60.VmpArray.max &&
            ImpArray >= ranges60.ImpArray.min && ImpArray <= ranges60.ImpArray.max &&
            Icharge >= ranges60.Icharge.min && Icharge <= ranges60.Icharge.max
        );
        const rangesPWM30 = suggestionPWM30ARange[systemVoltage.toString()];
        const suggestionPWM30A = rangesPWM30 && (
            Ptotal >= rangesPWM30.Ptotal.min && Ptotal <= rangesPWM30.Ptotal.max &&
            VocArray >= rangesPWM30.VocArray.min && VocArray <= rangesPWM30.VocArray.max &&
            VmpArray >= rangesPWM30.VmpArray.min && VmpArray <= rangesPWM30.VmpArray.max &&
            ImpArray >= rangesPWM30.ImpArray.min && ImpArray <= rangesPWM30.ImpArray.max &&
            Icharge >= rangesPWM30.Icharge.min && Icharge <= rangesPWM30.Icharge.max
        );
        const isPWMCompatible = VmpArray <= systemVoltage * 1.5;
        const suggestionC12 = isPWMCompatible && VocArray <= 25 && ImpArray <= 12 && Icharge <= 12;
        const suggestionC35 = isPWMCompatible && VocArray <= 55 && ImpArray <= 35 && Icharge <= 35;
        const suggestionC40 = isPWMCompatible && VocArray <= 125 && ImpArray <= 40 && Icharge <= 40;
        const suggestionC60 = isPWMCompatible && VocArray <= 55 && ImpArray <= 60 && Icharge <= 60;

        // Suggesting best fit first
        if (suggestionC12){
            const url = "https://xantrex.com/products/solar-panels/c12-pwm-solar-charge-controller/";
            const text = "C12 PWM Charge Controller";
            displayChargeController(url, text);
            return;
        }
        else if (suggestionC35){
            const url = "https://xantrex.com/products/solar-panels/c-series-pwm-charge-controller/";
            const text = "Xantrex C35 Charge Controller";
            displayChargeController(url, text);
            return;
        }
        else if (suggestionC40){
            const url = "https://xantrex.com/products/solar-panels/c-series-pwm-charge-controller/";
            const text = "Xantrex C40 Charge Controller";
            displayChargeController(url, text);
            return;
        }
        else if (suggestionC60){
            const url = "https://xantrex.com/products/solar-panels/c-series-pwm-charge-controller/";
            const text = "Xantrex C60 Charge Controller";
            displayChargeController(url, text);
            return;
        }
         else if (suggestionPWM30A){
            const url = "https://xantrex.com/products/solar-panels/xantrex-pwm-charge-controller/";
            const text = "Xantrex PWM Charge Controller";
            displayChargeController(url, text);
            return;
        }
        else if (suggestion30A){
            const url = "https://xantrex.com/products/solar-panels/xantrex-mppt-charge-controller-30a/";
            const text = "Xantrex MPPT Charge Controller 30A";
            displayChargeController(url, text);
            return;
        }
        else if (suggestion60A){
            const url = "https://xantrex.com/products/solar-panels/xantrex-mppt-charge-controller-60a/";
            const text = "Xantrex MPPT Charge Controller 60A";
            displayChargeController(url, text);
            return;
        }
        else{
            document.getElementById("recommended-charger").innerHTML = "<span style='color:red;'>&#x2757; No suitable charge controller is available yet</span>";
            return;
        }
    }

    async function displayChargeController(url, text){
        const recommendedCharger = document.getElementById("recommended-charger");
        const url1 = document.createElement("a");
        url1.href = url;
        url1.textContent = text;
        url1.target = "_blank";
        url1.style.textDecoration = "none";
        recommendedCharger.innerHTML = "A suitable charge controller is available at Xantrex! Follow the url or scan the QR code below:<br>";
        recommendedCharger.appendChild(url1);

        if (typeof qrCodeFeature !== "undefined") {
            try {
                const qrImage = await qrCodeFeature.createQrImage(url1.href, {
                    size: 180,
                    alt: `QR code for ${text}`,
                    title: "Scan to open the product page"
                });
                qrImage.style.margin = "16px auto 0";
                recommendedCharger.appendChild(document.createElement("br"));
                recommendedCharger.appendChild(qrImage);
            }
            catch (error) {
                console.error("Unable to load QR code.", error);
            }
        }
    }
});