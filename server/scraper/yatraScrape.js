import puppeteer from "puppeteer-extra";
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import { saveFlightData } from "./saveFlightData.js";
import { waitForProccessing,USER_AGENT,PROCESSING_WAIT,getDateFormatted } from "./commons.js";
import { getCityCode } from "../llm/cityCode.js";
// import { JSDOM } from 'jsdom';

// function extractFlightDetails(htmlString) {
//     // Initialize a new DOMParser instance
//     const dom = new JSDOM(htmlString);

//     // Use the DOM as you would in a browser
//     const doc = dom.window.document;


//     // Extract flight details
//     const flightAirline = doc.querySelector('.airline-name span').textContent;
//     const flightName = doc.querySelector('.fl-no span').textContent;
//     const flightStartTime = doc.querySelector('.dtime .time').textContent.trim();
//     const flightDuration = doc.querySelector('.duration-stop .du').textContent.trim();
//     const flightStopData = doc.querySelector('.duration-stop .stop-circle') ? doc.querySelectorAll('.duration-stop .tipsy-content').length + ' Stop(s)' : 'Non-stop';
//     const flightPrice = doc.querySelector('.fare-summary-tooltip').textContent.trim();

//     // Construct the result object
//     const result = {
//         flightAirline,
//         flightName,
//         flightStartTime,
//         flightDuration,
//         flightStopData,
//         flightPrice,
//     };

//     return result;
// }


puppeteer.use(StealthPlugin());
export const getYatraFlightData = async (
    sourceCityCode,
    destCityCode,
    dateFormatted
) => {
    /** @type {import('puppeteer').Browser} */
    const browser = await puppeteer.launch({
        headless: true,
        // defaultViewport: null,
        // slowMo: 50,
        // args: [`--window-size=${width},${height}`]
    });
    const context = browser.defaultBrowserContext();
    // You'll need to replace 'https://example.com' with the actual origin you're automating
    await context.overridePermissions('https://www.yatra.com/flights', ['geolocation', 'notifications']);
    await context.overridePermissions('https://flight.yatra.com/air-search-ui/dom2/', ['geolocation', 'notifications']);


    try {
        const page = await browser.newPage();
        page.setUserAgent(USER_AGENT);
        // await page.goto('https://www.yatra.com/flights')
          

        // // Wait for page to load
        // await page.waitForSelector('label[for="BE_flight_origin_city"]')
        // console.log('Page loaded');

        // // Select the source city
        // const fromCity = await page.$('label[for="BE_flight_origin_city"]');
        // await fromCity.click();
        // await page.waitForSelector('#BE_flight_origin_city',{ visible: true });
        // await waitForProccessing()
        // await page.type('#BE_flight_origin_city', placeFrom,{delay: 300});
        // await waitForProccessing()
        // await page.keyboard.press('Enter')

        // const toCity = await page.$('label[for="BE_flight_arrival_city"]');
        // await toCity.click();
        // await page.waitForSelector('input[id="BE_flight_arrival_city"]');
        // await page.click('input[id="BE_flight_arrival_city"]')
        // await waitForProccessing()
        // await page.type('input[id="BE_flight_arrival_city"]', placeTo,{delay: 300});
        // await waitForProccessing()
        // await page.keyboard.press('Enter')

        // // // Select the date
        // const dateInput = await page.$('.datepicker');
        // await dateInput.click()
        // console.log(`Date formatted : ${dateFormatted}`);
        // await page.waitForSelector(`td[data-date="${dateFormatted}"]`)
        // await page.click(`td[data-date="${dateFormatted}"]`)
        // console.log('Date selected');
    
        // // // Click on search button
        // await waitForProccessing()
        // await page.click('input[id="BE_flight_flsearch_btn"]');
        // console.log('Search button clicked');
        // const sourceCityCode = await getCityCode(placeFrom)
        // const destCityCode = await getCityCode(placeTo)
        const [ dateDay,dateMonth,dateYear ] = dateFormatted.split('/');
        const url = `https://flight.yatra.com/air-search-ui/dom2/trigger?type=O&viewName=normal&flexi=0&noOfSegments=1&origin=${sourceCityCode}&originCountry=IN&destination=${destCityCode}&destinationCountry=IN&flight_depart_date=${dateDay}%2F${dateMonth}%2F${dateYear}&ADT=4&CHD=0&INF=0&class=Economy&source=fresco-home&unqvaldesktop=1537365164692`
        console.log(url)
        // const url = 'https://flight.yatra.com/air-search-ui/dom2/trigger?type=O&viewName=normal&flexi=0&noOfSegments=1&origin=BOM&originCountry=IN&destination=PNQ&destinationCountry=IN&flight_depart_date=28%2F03%2F2024&ADT=4&CHD=0&INF=0&class=Economy&source=fresco-home&unqvaldesktop=1537365164692'
        await page.goto(url)
        console.log('Page loaded yatra');


        // // Check if the flights are loaded
        await page.waitForSelector('div.result-set')

        // const flightsDiv = await page.$('div.clusterContent div');
        const flights = await page.$$('div.flightItem');
        console.log('Flights loaded');
        // waitForProccessing()  5 times
        for(let i = 0; i < 5; i++){
            await waitForProccessing()
        }
        // Get the flight details
        let gotFlights = 0
        let totalData = []
        for (const flight of flights) {
            // const flightText = await flight.evaluate(el => el.innerHTML);
            // const flightDetails = extractFlightDetails(flightText);
            // console.log(flightDetails);
            try {
                // airline and name
                const flightAirlineEl = await flight.$('.airline-name > span');
                const flightAirline = await flightAirlineEl.evaluate(el => el.textContent);
                
                const flightNameEl = await flight.$('.airline-name > p');
                const flightName = await flightNameEl.evaluate(el => el.textContent);
                console.log('Flight : ',flightAirline,flightName)

                const flightTimeEl = await flight.$('.timing-det > div > div > div')
                const flightTime = await flightTimeEl.evaluate(el => el.textContent.substring(0,5));

                const flightDurationEl = await flight.$('p[autom="durationLabel"]')
                const flightDuration = await flightDurationEl.evaluate(el => el.textContent);

                const flightPriceEl = await flight.$('.fare-summary-tooltip')
                console.log('Price : ',flightPriceEl)
                const flightPrice = await flightPriceEl.evaluate(el => el.textContent);
                console.log('Price : ',flightPrice)

                const isStopEl = await flight.$('.cursor-default')
                const stopData = await isStopEl.evaluate(el => el.textContent);

                console.log(`Flight : ${flightAirline} ${flightName} , 
                Time : ${flightTime} , 
                duration : ${flightDuration} , 
                price : ${flightPrice} , 
                stops : ${stopData}`);

                const flightDetails = {
                    flightName: `${flightAirline} ${flightName}`,
                    flightTime: flightTime,
                    flightDuration: flightDuration,
                    stopInfo: stopData,
                    flightPrice: flightPrice,
                    flightLink: page.url(),
                    site: "yatra",
                    flightDate: dateFormatted
                };
                totalData.push(flightDetails)

                gotFlights +=1
                console.log("Got flights : ",gotFlights)
                if(gotFlights > 3){
                    break
                }
                
            } catch(error) {
                console.log(error);
            }
        }
        await saveFlightData(totalData)

    } catch (error) {
        console.log(error);
    } finally {
        await browser.close();
    }
}