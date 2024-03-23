import puppeteer from "puppeteer-extra";
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import { saveHotelData } from "./saveHotelData.js";
import { getCityCode } from "../llm/cityCode.js";
puppeteer.use(StealthPlugin());

function constructUrl(cityCode, checkinDate, checkoutDate) {
  const baseUrl =
    "https://www.makemytrip.com/hotels/hotel-listing/?_uCurrency=INR&checkin=";
  const middleUrl = "&checkout=";
  const endUrl = "&city=";
  const otherParams =
    `&country=IN&locusId=CT${cityCode}&locusType=city&reference=hotel&roomStayQualifier=2e0e&rsc=1e2e0e&searchText=`;
  // const sortUrl = "&sort=price-asc&type=city";
  const sortUrl = "";

  const completeUrl = `${baseUrl}${checkinDate}${middleUrl}${checkoutDate}${endUrl}${cityCode}${otherParams}${cityCode}${sortUrl}`;

  return completeUrl;
}

export const getHotelsdata = async (
  cityName,
  checkinDate,
  checkoutDate
) => {
  const cityCode = await getCityCode(cityName);
  const url = constructUrl(cityCode, checkinDate, checkoutDate);
  console.log(url);

  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: null,
  });

  const page = await browser.newPage();

  await page.goto(url, {
    waitUntil: "domcontentloaded",
  });

  const hotel_items = await page.$$("div.hotelTileDt");
  let gotHotels = 0;
  let totalData = []
  for (const items of hotel_items) {
    // const something = await flight.evaluate(el => el.innerHTML)
    // console.log(something);
    const hotelz = await items.evaluate((el) => {
      const hotelName = el.querySelector(".latoBlack").innerText;
      const hotelPrice = el.querySelector(".priceText").innerText;
      const rating = el.querySelector(".ratingText").innerText;
      const location = el.querySelector(".latoRegular").innerText;
      const link = el.querySelector("a").getAttribute("href").slice(2);
      return { hotelName, hotelPrice, rating, link, location };
    });
    totalData.push(hotelz)

    console.log(hotelz);
    gotHotels += 1
    if (gotHotels > 3) {
      break;
    }
  }
  console.log(`totalData: ${totalData}`);
  await saveHotelData(totalData);

  await browser.close();
};
