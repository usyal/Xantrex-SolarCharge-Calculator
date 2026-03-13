const qrCodeFeature = (() => {
    const apiBaseUrl = "https://api.qrserver.com/v1/create-qr-code/";

    const defaultQrOptions = {
        size: 200,
        charsetSource: "UTF-8",
        charsetTarget: "UTF-8",
        ecc: "L",
        color: "0-0-0",
        backgroundColor: "255-255-255",
        margin: 1,
        qzone: 4,
        format: "png"
    };

    function getQrOptions(options = {}) {
        const finalOptions = {
            size: options.size || defaultQrOptions.size,
            charsetSource: options.charsetSource || defaultQrOptions.charsetSource,
            charsetTarget: options.charsetTarget || defaultQrOptions.charsetTarget,
            ecc: options.ecc || defaultQrOptions.ecc,
            color: options.color || defaultQrOptions.color,
            backgroundColor: options.backgroundColor || defaultQrOptions.backgroundColor,
            margin: options.margin ?? defaultQrOptions.margin,
            qzone: options.qzone ?? defaultQrOptions.qzone,
            format: options.format || defaultQrOptions.format
        };

        if (finalOptions.size < 10 || finalOptions.size > 1000) {
            finalOptions.size = defaultQrOptions.size;
        }

        if (!["L", "M", "Q", "H"].includes(finalOptions.ecc)) {
            finalOptions.ecc = defaultQrOptions.ecc;
        }

        if (!["UTF-8", "ISO-8859-1"].includes(finalOptions.charsetSource)) {
            finalOptions.charsetSource = defaultQrOptions.charsetSource;
        }

        if (!["UTF-8", "ISO-8859-1"].includes(finalOptions.charsetTarget)) {
            finalOptions.charsetTarget = defaultQrOptions.charsetTarget;
        }

        if (!["png", "gif", "jpeg", "jpg", "svg", "eps"].includes(finalOptions.format)) {
            finalOptions.format = defaultQrOptions.format;
        }

        if (finalOptions.margin < 0 || finalOptions.margin > 50) {
            finalOptions.margin = defaultQrOptions.margin;
        }

        if (finalOptions.qzone < 0 || finalOptions.qzone > 100) {
            finalOptions.qzone = defaultQrOptions.qzone;
        }

        return finalOptions;
    }

    function buildQrCodeUrl(data, options = {}) {
        if (!data || typeof data !== "string") {
            throw new Error("QR code data must be a non-empty string.");
        }

        const qrOptions = getQrOptions(options);
        return `${apiBaseUrl}?data=${encodeURIComponent(data)}&size=${qrOptions.size}x${qrOptions.size}`;
    }

    function createQrImage(data, options = {}) {
        const qrOptions = getQrOptions(options);
        const image = document.createElement("img");

        image.src = buildQrCodeUrl(data, qrOptions);
        image.alt = options.alt || "QR code";
        image.title = options.title || "";
        image.width = qrOptions.size;
        image.height = qrOptions.size;
        image.loading = "lazy";

        image.style.width = `${qrOptions.size}px`;
        image.style.maxWidth = "100%";
        image.style.height = "auto";
        image.style.display = "block";
        image.style.padding = "12px";
        image.style.backgroundColor = "#ffffff";
        image.style.border = "1px solid #d6dbe3";
        image.style.borderRadius = "12px";
        image.style.boxShadow = "0 8px 18px rgba(37, 37, 125, 0.08)";

        return image;
    }

    function createRecommendedChargerCard(productName, productUrl, options = {}) {
        if (!productName || !productUrl) {
            throw new Error("Both product name and product URL are required.");
        }

        const container = document.createElement("div");
        container.style.display = "flex";
        container.style.flexDirection = "column";
        container.style.alignItems = "center";
        container.style.justifyContent = "center";
        container.style.gap = "24px";
        container.style.padding = "16px";

        const textBox = document.createElement("div");
        textBox.style.textAlign = "center";

        const message = document.createElement("p");
        message.textContent = "A suitable charger is available at Xantrex. Open the product page below or scan the QR code:";
        message.style.marginBottom = "12px";
        message.style.fontSize = "1rem";

        const link = document.createElement("a");
        link.href = productUrl;
        link.textContent = productName;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.style.color = "#25257d";
        link.style.fontWeight = "600";
        link.style.textDecoration = "none";
        link.style.wordBreak = "break-word";

        const qrImage = createQrImage(productUrl, {
            ...options,
            alt: `QR code for ${productName}`,
            title: `Scan to open ${productName}`
        });

        textBox.appendChild(message);
        textBox.appendChild(link);

        container.appendChild(textBox);
        container.appendChild(qrImage);

        if (window.matchMedia("(min-width: 768px)").matches) {
            container.style.flexDirection = "row";
            textBox.style.textAlign = "left";
            textBox.style.maxWidth = "420px";
        }

        return container;
    }

    return {
        defaultQrOptions,
        getQrOptions,
        buildQrCodeUrl,
        createQrImage,
        createRecommendedChargerCard
    };
})();
