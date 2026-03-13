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
            tempFactor = 0;
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
                VocArray: { min: 18, max: 60 },
                VmpArray: { min: 18, max: 36 },
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

        const ranges = suggestion30ARange[systemVoltage.toString()];
        const suggestion30A = (
            Ptotal >= ranges.Ptotal.min && Ptotal <= ranges.Ptotal.max &&
            VocArray >= ranges.VocArray.min && VocArray <= ranges.VocArray.max &&
            VmpArray >= ranges.VmpArray.min && VmpArray <= ranges.VmpArray.max &&
            ImpArray >= ranges.ImpArray.min && ImpArray <= ranges.ImpArray.max &&
            Icharge >= ranges.Icharge.min && Icharge <= ranges.Icharge.max
        );

        if (suggestion30A){
            const recommendedCharger = document.getElementById("recommended-charger");
            const url1 = document.createElement("a");
            url1.href = "https://xantrex.com/products/solar-panels/xantrex-mppt-charge-controller-30a/";
            url1.textContent = "Xantrex MPPT Charge Controller 30A";
            url1.target = "_blank";
            url1.style.textDecoration = "none";
<<<<<<< HEAD
            document.getElementById("recommended-charger").innerHTML = "<p>A suitable charger is available at Xantrex! Follow the url below or scan the QR Code:</p>";
            document.getElementById("recommended-charger").appendChild(url1);
=======
            recommendedCharger.innerHTML = "A suitable charger is available at Xantrex! Follow the url below:<br>";
            recommendedCharger.appendChild(url1);

            if (typeof qrCodeFeature !== "undefined") {
                try {
                    const qrImage = await qrCodeFeature.createQrImage(url1.href, {
                        size: 180,
                        alt: "QR code for Xantrex MPPT Charge Controller 30A",
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
>>>>>>> cc20bbb290e39a0e47ce78a789efa61e8dfdecb7
            return;
        }
        else{
            document.getElementById("recommended-charger").innerHTML = "<span style='color:red;'>&#x2757; No suitable charger is available yet</span>";
            return;
        }
    }
});
