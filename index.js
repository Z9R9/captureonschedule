const fs = require("fs").promises;
const puppeteer = require("puppeteer");
const path = require("path");

async function captureImage(preferwidth, preferheight, preferpadding, element, url, name) {
    let browser = null;
    try {
        browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        await page.setViewport({ width: preferwidth || 415, height: preferheight || 750 });
        await page.goto(url, { waitUntil: "networkidle2" });
        async function screenshotDOMElement(selector, padding = 1) {
            const rect = await page.evaluate((selector) => {
                const element = document.querySelector(selector);
                const { x, y, width, height } = element.getBoundingClientRect();
                return {
                    left: x,
                    top: y,
                    width: width,
                    height: height,
                    id: element.id,
                };
            }, selector);
            return await page.screenshot({
                path: path.join(__dirname, `./images/${name}.png`),
                clip: {
                    x: rect.left - padding,
                    y: rect.top - padding,
                    width: rect.width + padding * 2,
                    height: rect.height + padding * 2,
                },
            });
        }
        await screenshotDOMElement(element, preferpadding);
    } catch (err) {
        console.log(`❌ Error: ${err.message}`);
    } finally {
        await browser.close();
        console.log(`\n🎉 Captured Mobile Graph: ${name} \n\n`);
    }
}

captureImage(1000, 630, 60, '#chart', 'https://coup.aappb.org/graph', 'preview');
captureImage(415, 750, 0, '#chart', 'https://coup.aappb.org/graph', 'mobilegraph_en');
captureImage(415, 750, 0, '#chart', 'https://coup.aappb.org/graph?language=my', 'mobilegraph_my');
captureImage(1000, 630, 120, '#captureKilled', 'https://coup.aappb.org/capturekilled', 'killed_en');
captureImage(1000, 630, 120, '#captureKilled', 'https://coup.aappb.org/capturekilled?language=my', 'killed_my');
captureImage(1000, 630, 120, '#captureArrested', 'https://coup.aappb.org/captureArrested', 'arrested_en');
captureImage(1000, 630, 120, '#captureArrested', 'https://coup.aappb.org/captureArrested?language=my', 'arrested_my');