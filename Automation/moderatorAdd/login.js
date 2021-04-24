let puppeteer = require("puppeteer");
let id = "pamico3332@nic58.com";
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
    
    await addModerators(tab , browser);
})();


async function addModerators(tab , browser){
    await tab.waitForSelector('.backbone.block-center' , {visible:true});
    let allQuesATags = await tab.$$('.backbone.block-center');
    // console.log(allQuesATags.length);
    // [<a href=""></a> , <a href=""></a> , <a href=""></a> , <a href=""></a> , <a href=""></a> ,<a href=""></a>]
    let allQuesLinks = [];
    for(let i=0 ; i<allQuesATags.length ; i++){
        let quesLink = await tab.evaluate( function(elem){ return elem.getAttribute("href"); }   , allQuesATags[i])
        quesLink = "https://www.hackerrank.com"+quesLink;
        allQuesLinks.push(quesLink);
    }
    // console.log(allQuesLinks);
    let allQuesModAddPromise = [];
    for(let i=0 ; i<allQuesLinks.length ; i++){
        let newTab = await browser.newPage();
        // pending promise
        let oneQuesModAddPromise = addModeratorToASingleQues(newTab , allQuesLinks[i] );
        allQuesModAddPromise.push(oneQuesModAddPromise);
    }

    // next page 
    await Promise.all(allQuesModAddPromise);

    let allLis = await tab.$$('.pagination li');
    let nextBtn = allLis[allLis.length-2];

    let isDisabled = await tab.evaluate(function(elem){
        return elem.classList.contains('disabled');
    } , nextBtn);

    if(isDisabled){
        // if next btn is disabled !!!
        return;
    }
    // when next btn was not disabled !!!
    await Promise.all( [ tab.waitForNavigation({waitUntil:"networkidle2"})  , nextBtn.click() ] );
    await addModerators(tab , browser);
}

async function addModeratorToASingleQues(newTab , quesLink){
    await newTab.goto(quesLink);
    await newTab.waitForTimeout(5000);
    await newTab.waitForSelector('li[data-tab="moderators"]' , {visible:true});
    await Promise.all([newTab.waitForNavigation({waitUntil:"networkidle2"}) , newTab.click('li[data-tab="moderators"]') ]);
    await newTab.waitForSelector('#moderator' , {visible:true});
    await newTab.type( "#moderator" , "nijer71652");
    await newTab.waitForTimeout(100);
    await newTab.keyboard.press('Enter');
    await newTab.click('.save-challenge.btn.btn-green');
    await newTab.waitForTimeout(2000);
    await newTab.close();
}