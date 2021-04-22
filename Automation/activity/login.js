let challenges = require("./challenges.js");
let puppeteer = require("puppeteer");
let id ="nijer71652@whyflkj.com";
let pw = "12345678";


(async function () {
  let browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ["--start-maximized"],
  });
  let pages = await browser.pages();
  let tab = pages[0];
  await tab.goto("https://www.hackerrank.com/auth/login");
  await tab.type("#input-1",id);
  await tab.type("#input-2" ,pw);
  await tab.click('.ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled');
})();
