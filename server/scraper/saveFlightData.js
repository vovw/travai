import fs from 'fs';

export const saveFlightData = async (flightDatas) => {
    // Get the initial data from flights.json
    const data = fs.readFileSync('flights.json');
    const flights = JSON.parse(data);
    // Add the new data to the flights.json
    for (const flightData of flightDatas) {
        flights.push(flightData);
    }

    // Write the new data to the file
    fs.writeFileSync('flights.json', JSON.stringify(flights)); 
    console.log('Data saved');
}