import fs from 'fs';

export const clearPastData = async () => {
    // Get the initial data from flights.json
    fs.writeFileSync('flights.json', JSON.stringify([]));
    fs.writeFileSync('hotels.json', JSON.stringify([])); 
    
    console.log('Data cleared');
}