import { Router } from "express"
import { makeMagic,getDetails } from "../controllers/llmController.js"
const router=Router()

router.post('/do-magic',makeMagic)
router.post('/get-details',getDetails)

export default router