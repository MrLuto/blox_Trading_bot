const puppeteer = require('puppeteer');
const delay = require('delay');

boughtPrice = {ETH: 100, BTC: 100, FTM: 30, MANA: 10}
souldPrice = {ETH: 200, BTC: 200, FTM: 33, MANA: 11}
ProfitMultiplier = 1.1;

var sell = async function sell(coin, page){
    coin = coin.toLowerCase();
    await page.goto('https://app.weareblox.com/portfolio/' + coin);
    await delay(500);
    await page.click('button.btn.css-1cdrf');
    await delay(500);
    await page.click('p.css-z8kym3');
    await delay(500);
    await page.click('button.btn.css-1cdrf');
    await delay(500);
    await page.goto('https://app.weareblox.com/portfolio');
    await delay(1000);
};

var run = async function run(){
    const browser = await puppeteer.launch({headless: true,ignoreHTTPSErrors: true,})
    let page = await browser.newPage();
    await page.goto('https://app.weareblox.com/portfolio');
    await delay(2000);
    await page.click('button#ccc-notify-accept');
    await delay(500);
    await page.click('button.btn.css-1kk59s6');
    await delay(500);
    login = await page.$('input#username');
    await login.type("usernameeee");
    login = await page.$('input#password');
    await login.type("passworddd");
    await page.click('input#kc-login');
    await delay(500);
    while(true){
        console.clear();
        let links = await page.$$('tr');
        for (const link of links){
            data = await link.evaluate( node => node.innerText);
            data = data.replaceAll('\n', ' ');
            data = data.replaceAll('\t', '');
            dataArray = data.split(' ');
            dataArray = dataArray.filter((str) => str !== '');
            if(dataArray[dataArray.length - 1] == '0' || dataArray[dataArray.length - 1] == 'Withdraw') continue;
            sellprice = boughtPrice[dataArray[1]] * ProfitMultiplier;
            currentprice = dataArray[3].replaceAll('€', '');
            currentprice = Number(currentprice);
            soldPrice = souldPrice[dataArray[1]];
            if (currentprice > soldPrice) sell(dataArray[1], page);
            console.log(data);
            console.log(sellprice);
            console.log(soldPrice);
            }
        for (let i = 0; i < 10; i++) {
            await delay(1000);
            console.log(10 - i);
        }
    }
};
run();