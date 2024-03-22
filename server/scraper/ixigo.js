import puppeteer from "puppeteer-extra";

const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());
function constructUrl(from, to, date, adults, children, infants, travelClass) {
  const baseUrl = "https://www.ixigo.com/search/result/flight?";
  const params = [
    `from=${from}`,
    `to=${to}`,
    `date=${date}`,
    `adults=${adults}`,
    `children=${children}`,
    `infants=${infants}`,
    `class=${travelClass}`,
    `source=Search%20Form`,
  ];

  const completeUrl = `${baseUrl}${params.join("&")}`;

  return completeUrl;
}

// Example usage
const url = constructUrl("BOM", "DEL", "24032024", "1", "0", "0", "e");

const getHotelsdata = async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });
  const context = browser.defaultBrowserContext();
  await context.overridePermissions("https://www.ixigo.com/", [
    "geolocation",
    "notifications",
  ]);

  const page = await browser.newPage();

  await page.goto("https://ixigo.com/flights", {
    waitUntil: "domcontentloaded",
  });

  // const hotel_items = await page.$$("div.hotelTileDt");

  // for (const items of hotel_items) {
  //   // const something = await flight.evaluate(el => el.innerHTML)
  //   // console.log(something);
  //   const hotelz = await items.evaluate((el) => {
  //     const hotelName = el.querySelector(".latoBlack").innerText;
  //     const hotelPrice = el.querySelector(".priceText").innerText;
  //     const rating = el.querySelector(".ratingText").innerText;
  //     const location = el.querySelector(".latoRegular").innerText;
  //     const link = el.querySelector("a").getAttribute("href").slice(2);
  //     return { hotelName, hotelPrice, rating, link, location };
  //   });

  //   console.log(hotelz);
  // }
};

getHotelsdata();
