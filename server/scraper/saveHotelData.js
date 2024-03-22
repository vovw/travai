import fs from 'fs';

export const saveHotelData = async (hotels_data) => {
    // Get the initial data from flights.json
    const data = fs.readFileSync('hotels.json');
    const hotels = JSON.parse(data);
    // Add the new data to the flights.json
    for (const hotelData of hotels_data) {
        hotels.push(hotelData);
    }

    // Write the new data to the file
    fs.writeFileSync('hotels.json', JSON.stringify(hotels)); 
    console.log('Hotel Data saved');
}