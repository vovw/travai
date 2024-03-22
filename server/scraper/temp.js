import fs from 'fs';
import { getHotelsdata } from "./hotels.js";
import { getMMTFlightData } from "./makeMyTripScrape.js";
import { getDateFormatted } from "./commons.js";
import { getYatraFlightData } from "./yatraScrape.js";
import { clearPastData } from "./clearPastData.js";

const [citycode, checkinDate, checkoutDate] = ["CTBOM", "03272024", "03282024"]
const placeFrom = 'New Delhi';
const placeTo = 'Pune';
const date = '28 March 2024';
const [ dateDay,dateMonth,dateYear ] = date.split(' ');

getHotelsdata('BOM', checkinDate, checkoutDate)

// export const scrape = async () => {
//     const result = {
//         "source" : placeFrom,
//         "destination" : placeTo,
//         "DateStart" : getDateFormatted(date),
//         "DateEnd" : "10/04/2024",
//         "hotels" : [],
//         "depFlights" : [],
//         "retFlights" : []
//     };
//     await clearPastData()
//     await getHotelsdata(citycode, checkinDate, checkoutDate)
//     await getMMTFlightData(placeFrom, placeTo, dateDay, dateMonth, dateYear)
//     await getYatraFlightData(placeFrom, placeTo, getDateFormatted(date))

// }

