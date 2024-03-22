import { Router } from "express"
import { scrapeController } from "../controllers/scrapeController.js"
const router=Router()

router.post('/get-results',scrapeController)

export default router