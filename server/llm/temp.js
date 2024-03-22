import { doMagic } from "./magic.js";

let json = JSON.stringify([{
    "_id": {
      "$oid": "65fdbbfae9b4f4ad15850c82"
    },
    "userId": {
      "$oid": "65fdba9f261bd7148fb647f8"
    },
    "depFlight": {
      "flightName": "Air India AI 841",
      "flightTime": "12:00",
      "flightDuration": "55 m ",
      "stopInfo": "Non stop",
      "flightPrice": "2,799",
      "flightLink": "https://www.makemytrip.com/flight/search?itinerary=BOM-PNQ-28/03/2024&tripType=O&paxType=A-1_C-0_I-0&intl=false&cabinClass=E&ccde=IN&lang=eng",
      "site": "makemytrip",
      "flightDate": "28/03/2024"
    },
    "retFlight": {
      "flightName": "Air India AI 841",
      "flightTime": "12:00",
      "flightDuration": "55 m ",
      "stopInfo": "Non stop",
      "flightPrice": "2,799",
      "flightLink": "https://www.makemytrip.com/flight/search?itinerary=BOM-PNQ-28/03/2024&tripType=O&paxType=A-1_C-0_I-0&intl=false&cabinClass=E&ccde=IN&lang=eng",
      "site": "makemytrip",
      "flightDate": "28/03/2024"
    },
    "hotel": {
      "hotelName": "Lemon Tree Premier, Mumbai International Airport, Mumbai",
      "hotelPrice": "₹ 4,066",
      "rating": "Very Good",
      "link": "www.makemytrip.com/hotels/hotel-details?hotelId=201905141416461036&_uCurrency=INR&checkin=03282024&checkout=03292024&city=CTBOM&country=IN&lat=19.10772&lng=72.88197&locusId=CTBOM&locusType=city&rank=1&reference=hotel&roomStayQualifier=2e0e&rsc=1e2e0e&searchText=CTBOM&viewType=PREMIUM&mtkeys=-900690439668462511",
      "location": "2.3 km drive to T2 - Chhatrapati Shivaji International Airport"
    },
    "places": [
      {
        "placeName": "Sample Place",
        "startTime": {
          "hours": "12",
          "minutes": "30"
        },
        "duration": {
          "hours": "2",
          "minutes": "15"
        },
        "_id": {
          "$oid": "65fdc5f4e85a35fae1302be4"
        }
      },
      {
        "placeName": "Sample Place",
        "startTime": {
          "hours": "12",
          "minutes": "30"
        },
        "duration": {
          "hours": "2",
          "minutes": "15"
        },
        "_id": {
          "$oid": "65fdc5f4e85a35fae1302be5"
        }
      }
    ],
    "__v": 1
  }]);

const temp = async () => {
    json = await doMagic(json);
    console.log(json);
}

temp()