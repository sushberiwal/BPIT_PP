let challenges = require("./challenges.js");
let puppeteer = require("puppeteer");

let id = "nijer71652@whyflkj.com";
let pw = "12345678";

(async function () {
  let browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ["--start-maximized"],
  });
  let pages = await browser.pages();
  let tab = pages[0];
  await tab.goto("https://www.hackerrank.com/auth/login"); // wait for navigation
  await tab.type("#input-1", id);
  await tab.type("#input-2", pw);
  await Promise.all([
    tab.waitForNavigation({ waitUntil: "networkidle2" }),
    tab.click(".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled"),
  ]);
  await tab.click('div[data-analytics="NavBarProfileDropDown"]');
  await tab.waitForSelector(
    'a[data-analytics="NavBarProfileDropDownAdministration"]',
    { visible: true }
  );
  await Promise.all([
    tab.waitForNavigation({ waitUntil: "networkidle2" }),
    tab.click('a[data-analytics="NavBarProfileDropDownAdministration"]'),
  ]);
  // reached admin page !!!
  await tab.waitForSelector(".nav-tabs.nav.admin-tabbed-nav li");
  let bothLis = await tab.$$(".nav-tabs.nav.admin-tabbed-nav li"); // querySelectorAll
  //   console.log(bothLis.length);
  let manageChallengeLi = bothLis[1];
  await Promise.all([
    tab.waitForNavigation({ waitUntil: "networkidle2" }),
    manageChallengeLi.click(),
  ]);
  
  await tab.waitForSelector(".btn.btn-green.backbone.pull-right" , {visible:true});
  
  let createChallengeButton = await tab.$(".btn.btn-green.backbone.pull-right");
  let createChallengeLink = await tab.evaluate(function (elem) {
    return elem.getAttribute("href");
  }, createChallengeButton);
  console.log(createChallengeLink);
  createChallengeLink = `https://www.hackerrank.com${createChallengeLink}`;

  for(let i=0 ; i<challenges.length; i++){
      let newTab = await browser.newPage();
      await challengeAdd(newTab , challenges[i] , createChallengeLink);
    //   await tab.waitForTimeout(2000);
  }
})();

// add a single challenge
async function challengeAdd(newTab , challenge , createChallengeLink){
    let challengeName =  challenge["Challenge Name"];
    let description = challenge["Description"];
    let problemStatement = challenge["Problem Statement"];
    let inputFormat = challenge["Input Format"];
    let constrainsts = challenge["Constraints"];
    let outputFormat = challenge["Output Format"];
    let tags = challenge["Tags"];

    await newTab.goto(createChallengeLink);
    // await newTab.waitForTimeout(5000);
    // enter details of challenge in ui from challenge object
    await newTab.waitForSelector('#name' , {visible:true});
    await newTab.type("#name" , challengeName);
    await newTab.type('#preview' , description);
    await newTab.waitForSelector('#problem_statement-container .CodeMirror textarea' , {visible:true});
    await newTab.type('#problem_statement-container .CodeMirror textarea' , problemStatement);
    await newTab.type('#input_format-container .CodeMirror textarea' , inputFormat);
    await newTab.type('#constraints-container .CodeMirror textarea' , constrainsts);
    await newTab.type('#output_format-container .CodeMirror textarea' , outputFormat);
    await newTab.type('#tags_tag' , tags);
    await newTab.keyboard.press("Enter");
    await newTab.click('.save-challenge.btn.btn-green');
    // await newTab.waitForTimeout(20000);
    await newTab.close();
}