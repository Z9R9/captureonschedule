const fs = require("fs").promises;
const puppeteer = require("puppeteer");
const path = require("path");

async function captureScreenshot() {
    let browser = null;
    try {
        browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        await page.setViewport({ width: 1000, height: 630 });
        await page.goto("https://coup.aappb.org/chart", { waitUntil: "networkidle2" });

        async function screenshotDOMElement(selector, padding = 1) {
            const rect = await page.evaluate((selector) => {
                const element = document.querySelector(selector);
                const { x, y, width, height } = element.getBoundingClientRect();
                console.log("width", width);
                console.log("height", height);
                return {
                    left: x,
                    top: y,
                    width: width,
                    height: height,
                    id: element.id,
                };
            }, selector);

            return await page.screenshot({
                path: path.join(__dirname, "./images/preview.png"),
                clip: {
                    x: rect.left - padding,
                    y: rect.top - padding,
                    width: rect.width + padding * 2,
                    height: rect.height + padding * 2,
                },
            });
        }

        await screenshotDOMElement("#chart", 60);
        const currentDate = new Date();
        await fs.writeFile(
            path.join(__dirname, "log.txt"),
            `\n Updated graph preview on : ${currentDate.toString()}`,
            "utf-8"
        );
        console.log("\n 🕟 Updated log file");
    } catch (err) {
        console.log(`❌ Error: ${err.message}`);
    } finally {
        await browser.close();
        console.log(`\n🎉 Captured Graph \n\n`);
    }
}

async function captureMobileScreenshot() {
    let browser = null;
    try {
        browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        await page.setViewport({ width: 415, height: 750 });
        await page.goto("https://coup.aappb.org/chart", { waitUntil: "networkidle2" });

        async function screenshotDOMElement(selector, padding = 1) {
            const rect = await page.evaluate((selector) => {
                const element = document.querySelector(selector);
                const { x, y, width, height } = element.getBoundingClientRect();
                console.log("width", width);
                console.log("height", height);
                return {
                    left: x,
                    top: y,
                    width: width,
                    height: height,
                    id: element.id,
                };
            }, selector);

            return await page.screenshot({
                path: path.join(__dirname, "./images/mobile-preview.png"),
                clip: {
                    x: rect.left - padding,
                    y: rect.top - padding,
                    width: rect.width + padding * 2,
                    height: rect.height + padding * 2,
                },
            });
        }

        await screenshotDOMElement("#chart", 0);
    } catch (err) {
        console.log(`❌ Error: ${err.message}`);
    } finally {
        await browser.close();
        console.log(`\n🎉 Captured Mobile Graph \n\n`);
    }
}

async function captureKilled() {
    let browser = null;
    try {
        browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        await page.setViewport({ width: 1000, height: 630 });
        await page.goto("https://coup.aappb.org/capturekilled", { waitUntil: "networkidle2" });

        async function screenshotDOMElement(selector, padding = 1) {
            const rect = await page.evaluate((selector) => {
                const element = document.querySelector(selector);
                const { x, y, width, height } = element.getBoundingClientRect();
                console.log("width", width);
                console.log("height", height);
                return {
                    left: x,
                    top: y,
                    width: width,
                    height: height,
                    id: element.id,
                };
            }, selector);

            return await page.screenshot({
                path: path.join(__dirname, "./images/killed.png"),
                clip: {
                    x: rect.left - padding,
                    y: rect.top - padding,
                    width: rect.width + padding * 2,
                    height: rect.height + padding * 2,
                },
            });
        }

        await screenshotDOMElement("#captureKilled", 120);
    } catch (err) {
        console.log(`❌ Error: ${err.message}`);
    } finally {
        await browser.close();
        console.log(`\n🎉 Captured Killed Component \n\n`);
    }
}


async function captureArrested() {
    let browser = null;
    try {
        browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        await page.setViewport({ width: 1000, height: 630 });
        await page.goto("https://coup.aappb.org/capturearrested", { waitUntil: "networkidle2" });

        async function screenshotDOMElement(selector, padding = 1) {
            const rect = await page.evaluate((selector) => {
                const element = document.querySelector(selector);
                const { x, y, width, height } = element.getBoundingClientRect();
                console.log("width", width);
                console.log("height", height);
                return {
                    left: x,
                    top: y,
                    width: width,
                    height: height,
                    id: element.id,
                };
            }, selector);

            return await page.screenshot({
                path: path.join(__dirname, "./images/arrested.png"),
                clip: {
                    x: rect.left - padding,
                    y: rect.top - padding,
                    width: rect.width + padding * 2,
                    height: rect.height + padding * 2,
                },
            });
        }

        await screenshotDOMElement("#captureArrested", 120);
    } catch (err) {
        console.log(`❌ Error: ${err.message}`);
    } finally {
        await browser.close();
        console.log(`\n🎉 Captured Arrested Component \n\n`);
    }
}

captureScreenshot();
captureMobileScreenshot();
captureKilled();
captureArrested();
