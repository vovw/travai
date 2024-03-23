import fs from 'fs';
import { getHotelsdata } from "./hotels.js";
import { getMMTFlightData } from "./makeMyTripScrape.js";
import { getDateFormatted,convertDateFormat } from "./commons.js";
import { getYatraFlightData } from "./yatraScrape.js";
import { clearPastData } from "./clearPastData.js";

export const scrape = async (outDate='29 March 2024',date='28 March 2024',placeFrom='Mumbai',placeTo='Pune') => {
    const [citycode, checkinDate, checkoutDate] = ["CTBOM",convertDateFormat(date),convertDateFormat(outDate)]
    const [ dateDay,dateMonth,dateYear ] = date.split(' ');
    const [ outDateDay,outDateMonth,outDateYear ] = outDate.split(' ');
    const result = {
        "source" : placeFrom,
        "destination" : placeTo,
        "DateStart" : getDateFormatted(date),
        "DateEnd" : getDateFormatted(outDate),
        "hotels" : [],
        "depFlights" : [],
        "retFlights" : []
    };
    await clearPastData()
    await getHotelsdata(placeTo, checkinDate, checkoutDate)
    await getMMTFlightData(placeFrom, placeTo, dateDay, dateMonth, dateYear)
    // await getYatraFlightData(placeFrom, placeTo, getDateFormatted(date))

    const hotels = fs.readFileSync('hotels.json');
    const flights = fs.readFileSync('flights.json');
    result.hotels = await JSON.parse(hotels);
    result.depFlights = await JSON.parse(flights);
    await clearPastData()

    await getMMTFlightData(placeTo,placeFrom, outDateDay, outDateMonth, outDateYear)
    // await getYatraFlightData(placeTo, placeFrom, getDateFormatted(outDate))
    const flights2 = fs.readFileSync('flights.json');
    result.retFlights = await JSON.parse(flights2);

    console.log(result);
    fs.writeFileSync('result.json', JSON.stringify(result));

    result.hotels = result.hotels.slice(0, 3);
    result.depFlights = result.depFlights.slice(0, 3);
    result.retFlights = result.retFlights.slice(0, 3);
    return result;
}

// scrape()