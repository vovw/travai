import { saveFlightData } from "./saveFlightData.js";
import { waitForProccessing,USER_AGENT,PROCESSING_WAIT,getDateFormatted } from "./commons.js";
import puppeteer from "puppeteer-extra";
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

// const width = 960;
// const height = 960;

puppeteer.use(StealthPlugin());
export const getMMTFlightData = async (
    placeFrom,
    placeTo,
    dateDay,
    dateMonth,
    dateYear
) => {
    /** @type {import('puppeteer').Browser} */
    const browser = await puppeteer.launch({
        // headless: false,
        // defaultViewport: null,
        // // slowMo: 50,
        // args: [`--window-size=${width},${height}`]
    });

    try {
        const page = await browser.newPage();
        page.setUserAgent(USER_AGENT);
        await page.goto('https://www.makemytrip.com/flights/')

        // Wait for page to load
        await page.waitForSelector('label[for="fromCity"]')
        console.log('Page loaded');

        // Select the source city
        for (let i = 0; i < 3; i++) {
            const fromCity = await page.$('label[for="fromCity"]');
            await fromCity.click();
            await page.waitForSelector('input[placeholder="From"]');
            await page.type('input[placeholder="From"]', placeFrom);
            await waitForProccessing(PROCESSING_WAIT*(i+1))
            await page.waitForSelector('#react-autowhatever-1-section-0-item-0')
            await page.click('#react-autowhatever-1-section-0-item-0')
        // Test if the action is successful
            const fromCityText = await fromCity.evaluate(el => el.querySelector('#fromCity').getAttribute('value'));
            console.log(`From : ${fromCityText} , ${(fromCityText === placeFrom) ? 'Success' : 'Failed'}`);

            if(fromCityText === placeFrom){
                break
            }
        }

        for (let i = 0; i < 3; i++) {
            // Select the destination city
            const toCity = await page.$('label[for="toCity"]');
            await toCity.click();
            await page.waitForSelector('input[placeholder="To"]');
            await page.type('input[placeholder="To"]', placeTo);
            await waitForProccessing(PROCESSING_WAIT*(i+1))
            await page.waitForSelector('#react-autowhatever-1-section-0-item-0')
            await page.click('#react-autowhatever-1-section-0-item-0')

            // Test if the action is successful
            const toCityText = await toCity.evaluate(el => el.querySelector('#toCity').getAttribute('value'));
            console.log(`To : ${toCityText} , ${(toCityText === placeTo) ? 'Success' : 'Failed'}`);

            if(toCityText === placeTo){
                break
            } else{
                console.log('Trying again')
            }
        }

        // Select the date
        const dateInput = await page.$('label[for="departure"]');
        const dateData  = await dateInput.$$('p');
        await dateInput.evaluate(el => el.parentElement.click());
        await page.waitForSelector('div.DayPicker-Day--selected')
        // ...
        const months = await page.$$('div.DayPicker-Month');
        for (const month of months) {
            const monthYear = (await month.evaluate(el => el.querySelector('div.DayPicker-Caption').textContent.split(' ').join('')));
            if(monthYear === [dateMonth,dateYear].join('')){
                const days = await month.$$('div.DayPicker-Day');
                for (const day of days) {
                    const [dayText,cost] = await day.evaluate(el => el.textContent.split('₹'));
                    const isDisabled = await day.evaluate(el => el.classList.contains('DayPicker-Day--disabled'));
                    if(dayText === dateDay && !isDisabled){
                        await day.click();
                    }
                }
            }
        }
        // ...

        // check if the date is selected
        await waitForProccessing()
        const [cdateDay,cdateMonth,cdateYear] = await dateData[0].evaluate(el => {
            let result = []
            el.childNodes.forEach(node => {
                result.push(node.textContent.trim())
            })
            return result
        });
        console.log(`Date : ${cdateDay} ${cdateMonth} ${cdateYear} , ${(cdateDay === dateDay && dateMonth.includes(cdateMonth)  && dateYear.includes(cdateYear)) ? 'Success' : 'Failed'}`);

        // Click on search button
        await page.click('p[data-cy="submit"] a.widgetSearchBtn');
        // for (let i = 0; i < 200; i++) {
        //     await waitForProccessing()
        // }

        // remove the pop up if any
        try {
            console.log('Removing pop up');
            await page.waitForSelector('span.overlayCrossIcon', { timeout: 5000 })
            await page.click('span.overlayCrossIcon')
            console.log('Pop up removed');
        } catch(error){
            console.log('Pop up not found')
        }
        

        // Check if the flights are loaded
        await page.waitForSelector('div.clusterContent')

        const flightsDiv = await page.$('div.clusterContent div');
        const flights = await flightsDiv.$$('div > div.listingCard');
        console.log('Flights loaded');
        // Get the flight details
        let gotFlights = 0
        let totalData = []
        for (const flight of flights) {
            // const something = await flight.evaluate(el => el.innerHTML)
            // console.log(something);
            const flightDetails = await flight.evaluate(el => {
                const flightAirline = el.querySelector('.airlineName').textContent;
                const fliCode = el.querySelector('.fliCode').textContent;
                const flightName = `${flightAirline} ${fliCode}`;

                const flightTime = el.querySelector('.timeInfoRight .flightTimeInfo > span').textContent;
                const flightDuration = el.querySelector('.stop-info > p').textContent;
                const stopInfo = el.querySelector('p.flightsLayoverInfo').textContent;
                const flightPrice = el.querySelector('div.priceSection > div > div > div').textContent.split('p')[0].split(' ')[1];

                return {flightName, flightTime, flightDuration,stopInfo, flightPrice};
                // return {flightName, flightTime, flightPrice};
            });
            console.log(`Flight : ${flightDetails.flightName} , 
            Time : ${flightDetails.flightTime} ,
            duration : ${flightDetails.flightDuration},
            stopInfo : ${flightDetails.stopInfo},
            Price : ${flightDetails.flightPrice}`);

            // click the button to get the link
            // console.log('Clicking the button');
            // const viewbtn = await flight.$('button.ViewFareBtn > span');
            // await viewbtn.click();
            // await page.waitForSelector('.fareFamilyCardWrapper');
            // const bookBtn = await page.$('.buttonPrimary');
            // await bookBtn.click()
            // console.log(`Button clicked`);
            // await waitForProccessing()
            
            // // Go to another tab
            // const newTarget = await browser.waitForTarget(target => target.opener() === page.target());
            // const newPage = await newTarget.page();

            // const newTabUrl = newPage.url();
            // console.log('URL of the new tab:', newTabUrl);
            const pageUrl = page.url()
            console.log('URL of the tab:',pageUrl);

            // Close the new tab
            // await newPage.close();
            // console.log('New tab closed');

            // await page.waitForSelector('.fareFamilyCardWrapper')

            const flightData = {
                ...flightDetails,
                // flightLink : newTabUrl,
                flightLink : pageUrl ,
                site : 'makemytrip',
                flightDate : getDateFormatted(`${dateDay} ${dateMonth} ${dateYear}`)
            }
            totalData.push(flightData)

            gotFlights += 1
            if(gotFlights > 3){
                break
            }
        }
        await saveFlightData(totalData)

        // for(let i = 0; i < 50; i++){
        //     await waitForProccessing()
        // }

    } catch (error) {
        console.log(error);
    } finally {
        await browser.close();
    }
}