// import jwt from 'jsonwebtoken'
// import tripSchema from '../models/tripSchema.js'
// import { ObjectId } from 'bson'
import { doMagic } from "../llm/magic.js"

export async function makeMagic(req,res){
    try{
        const result = await doMagic(JSON.stringify(req.body.jsonData))
        res.status(200).json(result)
    }catch(e){
        console.error(e)
        res.status(500).json({message:"Server Error"})
    }
}