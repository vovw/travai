import { Router } from "express"
import { makeMagic } from "../controllers/llmController.js"
const router=Router()

router.post('/do-magic',makeMagic)

export default router