import fs from 'fs';
import { getHotelsdata } from "./hotels.js";
import { getMMTFlightData } from "./makeMyTripScrape.js";
import { getDateFormatted,convertDateFormat } from "./commons.js";
import { getYatraFlightData } from "./yatraScrape.js";
import { clearPastData } from "./clearPastData.js";

const outDate = "29 March 2024"
const date = '28 March 2024';
const [citycode, checkinDate, checkoutDate] = ["CTBOM",convertDateFormat(date),convertDateFormat(outDate)]
const placeFrom = 'Mumbai';
const placeTo = 'Pune';
const [ dateDay,dateMonth,dateYear ] = date.split(' ');
const [ outDateDay,outDateMonth,outDateYear ] = outDate.split(' ');

export const scrape = async () => {
    const result = {
        "source" : placeFrom,
        "destination" : placeTo,
        "DateStart" : getDateFormatted(date),
        "DateEnd" : convertDateFormat(outDate),
        "hotels" : [],
        "depFlights" : [],
        "retFlights" : []
    };
    await clearPastData()
    await getHotelsdata(citycode, checkinDate, checkoutDate)
    await getMMTFlightData(placeFrom, placeTo, dateDay, dateMonth, dateYear)
    // await getYatraFlightData(placeFrom, placeTo, getDateFormatted(date))

    const hotels = fs.readFileSync('hotels.json');
    const flights = fs.readFileSync('flights.json');
    result.hotels = await JSON.parse(hotels);
    result.depFlights = await JSON.parse(flights);
    await clearPastData()

    await getMMTFlightData(placeTo,placeFrom, outDateDay, outDateMonth, outDateYear)
    const flights2 = fs.readFileSync('flights.json');
    result.retFlights = await JSON.parse(flights2);

    console.log(result);
    fs.writeFileSync('result.json', JSON.stringify(result));
    return result;
}

scrape()

