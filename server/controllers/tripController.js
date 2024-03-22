import jwt from 'jsonwebtoken'
import tripSchema from '../models/tripSchema.js'
import { ObjectId } from 'bson'

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
