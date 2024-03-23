// import jwt from 'jsonwebtoken'
// import tripSchema from '../models/tripSchema.js'
// import { ObjectId } from 'bson'
import { doMagic } from "../llm/magic.js"
import { cityDetail } from '../llm/describe.js'

export async function makeMagic(req,res){
    try{
        const result = await doMagic(JSON.stringify(req.body.jsonData))
        res.status(200).json(result)
    }catch(e){
        console.error(e)
        res.status(500).json({message:"Server Error"})
    }
}

export async function getDetails(req,res){
    try{
        const result = await cityDetail(req.body.dest)
        res.status(200).json(result)
    }catch(e){
        console.error(e)
        res.status(500).json({message:"Server Error"})
    }
}