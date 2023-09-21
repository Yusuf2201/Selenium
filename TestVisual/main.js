const { existsSync, writeFileSync, readFileSync, mkdirSync } = require('fs');
const setupDriver = require('../utils/SetupDriver');
const chai = require('chai');
const { chaiImage } = require('chai-image');

chai.use(chaiImage);
const { expect } = chai;

async function visualTesting(PAGE_NAME) {
  const PAGE_URLS = {
    SignUpShopee: 'https://shopee.co.id/seller/signup',
    MieIndofood: 'https://www.indofood.com/product/noodles',
    pama: 'https://recruitment.pamapersada.com/',
    bakpia: 'https://bakpiaku.com/?gclid=CjwKCAjw38SoBhB6EiwA8EQVLjd_EzogtBNOuu9J9xAC1P1fsAflaSR4A3A2199NNDl2X4Cu5UEVSRoCoaYQAvD_BwE',
    kai: 'https://www.kai.id/corporate/freight_services/1',
  };

  const driver = await setupDriver();

  const PAGE_URL = PAGE_URLS[PAGE_NAME];

  await driver.get(PAGE_URL);

  const baseScreenshotPath = `screenshots/base/${PAGE_NAME}.jpg`;
  const actualScreenshotPath = `screenshots/actual/${PAGE_NAME}.jpg`;

//   // Ensure directories exist
//   if (!existsSync('screenshots/base')) {
//     mkdirSync('screenshots/base', { recursive: true });
//   }
//   if (!existsSync('screenshots/actual')) {
//     mkdirSync('screenshots/actual', { recursive: true });
//   }

  const isBaseScreenshotExist = existsSync(baseScreenshotPath);

  const pageScreenshot = await driver.takeScreenshot();
  const pageScreenshotBuffer = Buffer.from(pageScreenshot, 'base64');

  if (isBaseScreenshotExist) {
    const baseScreenshotBuffer = readFileSync(baseScreenshotPath);
    writeFileSync(actualScreenshotPath, pageScreenshotBuffer);
    expect(pageScreenshotBuffer).to.matchImage(baseScreenshotBuffer, { tolerance: 100 });
  } else {
    writeFileSync(baseScreenshotPath, pageScreenshotBuffer);
    console.log(`Base screenshot saved for ${PAGE_NAME}`);
  }

  await driver.quit();
}

module.exports = visualTesting; // Export the function
