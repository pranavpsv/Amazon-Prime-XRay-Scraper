const puppeteer = require('puppeteer');
const CREDS = require('./creds');
const teluguMovies = require("./teluguLinks");
const tamilMovies = require("./tamilLinks");
const malayalamMovies = require("./malayalamLinks");
const links = require(__dirname + "/links");
const movieLinksArray = malayalamMovies.movieLinks;
const lengthmovieArray = movieLinksArray.length;
console.log(lengthmovieArray);
(async () => {
    try {
    var browser = await puppeteer.launch({headless: false,
        executablePath: 'C:/Program Files (x86)/Google/Chrome/Application/chrome'
        });
    var page = await browser.newPage();
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
    // const search = "#pv-search-nav";
    // await page.waitForSelector(search);
    // await page.click(search);
    // await page.keyboard.type(movieName);
    // await page.keyboard.press('Enter');
    // const result = "#av-search > div.av-grid-wrapper > div > div:nth-child(1) > div.pbuZvs.mustache._1lBA3s > div._3nBfep > div._2sEwJA > span > a";
    // await page.waitForSelector(result);
    // await page.click(result);
    // await page.goto(movieLinksArray[0]);
    // const watch = "#dv-action-box > div > div > div > div._1y_Ulh.Ri9l84._2WW1HP > span > div > a > span.zx3N80 > span:nth-child(1)";
    // await page.waitForSelector(watch);
    // let movieTitle = await page.evaluate(() => document.querySelector('.dv-node-dp-title').innerText);
    // movieTitle = movieTitle.match(/[a-zA-Z]+/g).join("_");
    // await page.click(watch);
    // var x = 1;
    // page.on('response', async response => {
    //     if ((response.url().includes("xray?")) && (x == 1)) {
    //         x = 0;
    //         console.log("Success!!!");
    //         console.log("url: " + response.url());
    //         await page.goto(response.url());
    //         await page.content();
    //         innerText = await page.evaluate(() =>  {
    //             return (document.querySelector("body").innerText); 
    //         });
    //         console.log("innertext success");
    //         console.log(movieTitle);
    //         var fs = require('fs');
    //         fs.writeFile(movieTitle + '_xray.json', innerText, 'utf8', function(err) {
    //             if (err) throw err;
    //             console.log('complete');
    //             });
    //     } 
    //   });
    await recurseThroughLinks(0, page);

} catch (e) {
    console.log('our error', e);
}
  })();


  async function recurseThroughLinks(link_number, page) {
      if (link_number == (lengthmovieArray)) {
          return;
      }
    await page.goto(movieLinksArray[link_number]);
    const watch = "#dv-action-box > div > div > div > div._1y_Ulh.Ri9l84._2WW1HP > span > div > a > span.zx3N80 > span:nth-child(1)";
    await page.waitForSelector(watch);
    const movieDetails = await page.evaluate(() => document.querySelector(".dv-node-dp-badges").innerText);
    if (movieDetails.includes("X-Ray")) {
    let movieTitle = await page.evaluate(() => document.querySelector('.dv-node-dp-title').innerText);
    let movieMetadata = await page.evaluate(() => document.querySelector(".dv-dp-node-meta-info").innerText);
    let MovieAudioLanguages = movieMetadata.split("Audio Languages")[1];
    let movieLanguage = "(Other) ";
    if (MovieAudioLanguages.includes("English")) {
        movieLanguage = "(English) ";
    }
    else if (MovieAudioLanguages.includes("తెలుగు")) {
        movieLanguage = "(Telugu) ";
    }  else if (MovieAudioLanguages.includes("हिन्दी")) {
        movieLanguage = "(Hindi) ";
    } else if (MovieAudioLanguages.includes("தமிழ்")) {
        movieLanguage = "(Tamil) ";
    } else if (MovieAudioLanguages.includes("മലയാളം")) {
        movieLanguage = "(Malayalam) ";
    } else if (MovieAudioLanguages.includes("ಕನ್ನಡ")) {
        movieLanguage = "(Kannada) ";
    }
    movieTitle = movieTitle.match(/[a-zA-Z0-9]+/g).join("_");
    await page.click(watch);
    var x = 1;
    page.on('response', async response => {
        if ((response.url().includes("xray?")) && (x == 1)) {
            x = 0;
            console.log("Success!!!");
            console.log("url: " + response.url());
            await page.goto(response.url());
            await page.content();
            innerText = await page.evaluate(() =>  {
                return (document.querySelector("body").innerText); 
            });
            console.log("innertext success");
            console.log(movieTitle);
            var fs = require('fs');
            fs.writeFile(__dirname + "/xray_jsonfiles/" + movieLanguage + movieTitle + '_xray.json', innerText, 'utf8', function(err) {
                if (err) throw err;
                console.log(String(link_number) + 'complete');
                recurseThroughLinks(link_number + 1, page);
                });
        } 
      });
  } else {
        let movieTitle = await page.evaluate(() => document.querySelector('.dv-node-dp-title').innerText);
        console.log(movieTitle);
        console.log(link_number + " Not Complete");
        recurseThroughLinks(link_number + 1, page);
  }
}