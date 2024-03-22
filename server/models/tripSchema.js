import mongoose from "mongoose"

let tripSchema=new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    depFlight : {
        flightName: { type: String, required: false, default : null },
        flightTime: { type: String, required: false, default : null },
        flightDuration: { type: String, required: false, default : null },
        stopInfo: { type: String, required: false, default : null },
        flightPrice: { type: String, required: false, default : null },
        flightLink: { type: String, required: false, default : null },
        site: { type: String, required: false, default : null },
        flightDate: { type: String, required: false, default : null }
    },
    retFlight : {
      flightName: { type: String, required: false, default : null },
      flightTime: { type: String, required: false, default : null },
      flightDuration: { type: String, required: false, default : null },
      stopInfo: { type: String, required: false, default : null },
      flightPrice: { type: String, required: false, default : null },
      flightLink: { type: String, required: false, default : null },
      site: { type: String, required: false, default : null },
      flightDate: { type: String, required: false, default : null }
  },
  hotel: {
    hotelName: { type: String, required: false, default : null },
    hotelPrice: { type: String, required: false, default : null },
    rating: { type: String, required: false, default : null },
    link: { type: String, required: false, default : null },
    location: { type: String, required: false, default : null }
  },
  places : [{
    placeName: { type: String, required: false, default : null },
    startTime :{
        hours:{
            type: String,
            required: false,
            default: '00'
        },
        minutes:{
            type: String,
            required: false,
            default: '00'
        },
    },
    duration:{
        hours:{
            type: String,
            required: false,
            default: '00'
        },
        minutes:{
            type: String,
            required: false,
            default: '00'
        },
    }, 
    }]
})

export default mongoose.model('Trip',tripSchema)