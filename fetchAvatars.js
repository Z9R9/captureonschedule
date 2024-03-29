const fs = require("fs").promises;
const puppeteer = require("puppeteer");
const path = require("path");

const fetchImg = async (url, language) => {
  try {
    browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.setViewport({ width: 1000, height: 630 });
    await page.goto(`http://localhost:3000/${language === 'mm' ? 'mm/' : ''}capture/${url}`, {
      waitUntil: "networkidle2",
    });

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
        path: path.join(__dirname, `./avatars/${url}${language === 'mm' ? '_mm' : ''}.png`),
        clip: {
          x: rect.left - padding,
          y: rect.top - padding,
          width: rect.width + padding * 2,
          height: rect.height + padding * 2,
        },
      });
    }
    await screenshotDOMElement("#personInfo", 30);
  } catch (err) {
    console.log(`❌ Error: ${err.message}`);
  } finally {
    await browser.close();
    console.log(`\n🎉 Captured Avatar for ${url}${language === 'mm' ? '_mm' : ''}.png `);
  }
};

const fetchAllAvatars = async (_) => {
  const resp = await fs.readFile(
    path.join(__dirname, "./data/deceasedIdList.json")
  );
  const idList = JSON.parse(resp);

  console.log(`\n🎉 started fetching avatars ... `);
  for (const id of idList) {
    console.log("✍️ working on ID:  ", id);
    await fetchImg(id, "en");
    await fetchImg(id, "mm");
  }
  console.log(`\n🎉 finished fetching avatars `);

  // await fetchImg('NAY-20220601-00003')
};

fetchAllAvatars();
