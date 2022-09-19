const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer");

const baseURL = "https://coup.aappb.org";

async function captureImage(
  preferwidth,
  preferheight,
  preferpadding,
  element,
  url,
  name
) {
  let browser = null;
  try {
    browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.setViewport({
      width: preferwidth || 415,
      height: preferheight || 750,
    });
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
        path: path.join(__dirname, `./raw/${name}.png`),
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

captureImage(1000, 630, 60, "#chart", `${baseURL}/graph`, "preview_en");
captureImage(1000, 630, 60, "#chart", `${baseURL}/mm/graph`, "preview_mm");
captureImage(415, 750, 0, "#chart", `${baseURL}/graph`, "mobilegraph_en");
captureImage(415, 750, 0, "#chart", `${baseURL}/mm/graph`, "mobilegraph_mm");
captureImage(
  1000,
  630,
  120,
  "#captureKilled",
  `${baseURL}/capturekilled`,
  "killed_en"
);
captureImage(
  1000,
  630,
  120,
  "#captureKilled",
  `${baseURL}/mm/capturekilled`,
  "killed_mm"
);
captureImage(
  1000,
  630,
  120,
  "#captureArrested",
  `${baseURL}/capturearrested`,
  "arrested_en"
);
captureImage(
  1000,
  630,
  120,
  "#captureArrested",
  `${baseURL}/mm/capturearrested`,
  "arrested_mm"
);

let updatedDate = `Updated on ${new Date().toISOString()}`;
try {
  fs.writeFileSync("log.txt", updatedDate);
  // file written successfully
} catch (err) {
  console.error(err);
}
