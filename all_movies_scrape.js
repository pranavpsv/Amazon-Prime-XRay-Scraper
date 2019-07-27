const fs = require('fs');
const puppeteer = require('puppeteer');
const CREDS = require('./creds');

var hrefs = ''
function extractItems() {
  const extractedElements = document.querySelectorAll('.av-beard-title-link');
  const items = [];
  for (let element of extractedElements) {
      console.log(element.href);
    items.push(element.href);
  }
//   hrefs = await page.evaluate(() => {
//     const anchors = document.querySelectorAll('a');
//     return Array.from(anchors).map(a => a.href);
//   });
  return items;
}

async function scrapeInfiniteScrollItems(
  page,
  extractItems,
  itemTargetCount,
  scrollDelay = 1000,
) {
  let items = [];
  try {
    let previousHeight;
    while (items.length < itemTargetCount) {
      items = await page.evaluate(extractItems);
      previousHeight = await page.evaluate('document.body.scrollHeight');
      await page.evaluate('window.scrollTo(0, document.body.scrollHeight)');
      await page.waitForFunction(`document.body.scrollHeight > ${previousHeight}`);
      await page.waitFor(scrollDelay);
    }
  } catch(e) { }
  return items;
}

(async () => {
  // Set up browser and page.
  const browser = await puppeteer.launch({headless: false,
    executablePath: 'C:/Program Files (x86)/Google/Chrome/Application/chrome'
    });
  const page = await browser.newPage();

  // Navigate to the demo page.
  await page.goto('https://www.amazon.com/ap/signin?accountStatusPolicy=P1&clientContext=257-1043260-4641540&language=en_US&openid.assoc_handle=amzn_prime_video_desktop_us&openid.claimed_id=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.mode=checkid_setup&openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0&openid.ns.pape=http%3A%2F%2Fspecs.openid.net%2Fextensions%2Fpape%2F1.0&openid.pape.max_auth_age=0&openid.return_to=https%3A%2F%2Fwww.primevideo.com%2Fregion%2Fna%2Fauth%2Freturn%2Fref%3Dav_auth_ap%3F_encoding%3DUTF8%26location%3D%252Fregion%252Fna%252Fref%253Dav_nav_sign_in');
  const enterEmail = "#ap_email";
  const enterPassword = "#ap_password";
  const submit = "#signInSubmit";
  await page.waitForSelector(enterEmail);
  await page.click(enterEmail);
  await page.keyboard.type(CREDS.email);
  await page.click(enterPassword);
  await page.keyboard.type(CREDS.password);
  await page.click(submit);
  await page.goto('https://www.primevideo.com/region/na/search/ref=atv_nb_sr?phrase=malayalam&ie=UTF8');
  // Scroll and extract items from the page.
  const items = await scrapeInfiniteScrollItems(page, extractItems, 572);
  console.log(items);

  // Save extracted items to a file.
  fs.writeFileSync('./malayalamLinks.txt', JSON.stringify(items));

  // Close the browser.
  await browser.close();
})();
