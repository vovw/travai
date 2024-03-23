import jwt from 'jsonwebtoken'
import tripSchema from '../models/tripSchema.js'
import { ObjectId } from 'bson'

function getDaysBetweenDates(date1, date2) {
    // Parse the dates and create Date objects
    const [day1, month1, year1] = date1.split("/").map(part => parseInt(part));
    const [day2, month2, year2] = date2.split("/").map(part => parseInt(part));
    const d1 = new Date(year1, month1 - 1, day1);
    const d2 = new Date(year2, month2 - 1, day2);

    // Calculate the difference in milliseconds
    const diffInMs = Math.abs(d2 - d1);

    // Convert the difference in milliseconds to days and return it
    return Math.round(diffInMs / (1000 * 60 * 60 * 24));
}

export async function getTotalPrice(req, res) {
    try {
        //logic here
        const user =  jwt.verify(req.headers['authorization'], process.env.SECRET)
        console.log(user)
        const id = new ObjectId(user._id)
        const tripData = await tripSchema.findOne({ userId: id })
        const people = parseInt(req.body.people)
        const days = getDaysBetweenDates(tripData.depFlight.flightDate,tripData.retFlight.flightDate)
        console.log(days)
        let totalPrice = 0
        if (tripData.hotel) {
            totalPrice += parseInt(tripData.hotel.hotelPrice.replace(',',''))*days*people
        }
        if (tripData.depFlight) {
            totalPrice += parseInt(tripData.depFlight.flightPrice.replace(',',''))*people
        }
        if (tripData.retFlight) {
            totalPrice += parseInt(tripData.retFlight.flightPrice.replace(',',''))*people
        }
        res.status(200).json({ totalPrice: totalPrice })
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: "Server Error" })
    }
}

export async function addPlaces(req, res) {
    try {
        //logic here
        const user =jwt.verify(req.headers['authorization'], process.env.SECRET)
        console.log(user)
        const id = new ObjectId(user._id)
        const tripData = await tripSchema.findOne({ userId: id })
        tripData.places = req.body.places
        await tripData.save()
        res.status(200).json({ message: "Places added successfully" })
    } catch (e) {
        console.error(e)
        res.status(500).json({ message: "Server Error" })
    }
}

export async function makeTrip(req, res) {
    try {
        const user =jwt.verify(req.headers['authorization'], process.env.SECRET)
        const oldTrip = await tripSchema.findOne({ userId: user._id })
        if(oldTrip){
            await tripSchema.deleteOne({ userId: user._id })
        }
        const newTrip =new tripSchema({
            userId: user._id,
            depFlight: req.body[1],
            retFlight: req.body[2],
            hotel: req.body[0],
            places: req.body.places ? req.body.places : []
        })
        let data=await newTrip.save()
        console.log(data)
        res.status(200).json({ message: "Trip added successfully",error:false })
    } catch (e) {
        console.error(e)
        res.status(500).json({ message: "Server Error" })
    }
}


export async function getTrip(req, res) {
    try {
        //logic here
        const user = jwt.verify(req.headers['authorization'], process.env.SECRET)
        console.log(user)
        const id = new ObjectId(user._id)
        const tripData = await tripSchema.findOne({ userId: id })
        res.status(200).json(tripData)
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: "Server Error" })
    }

}
