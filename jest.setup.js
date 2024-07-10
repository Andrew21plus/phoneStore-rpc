const { chromium } = require('playwright');

let browser;
let page;

beforeAll(async () => {
  browser = await chromium.launch({ headless: false });
  page = await browser.newPage();
  global.page = page;
});

afterAll(async () => {
  await browser.close();
});
