import { Router } from "express"
import { getTrip,makeTrip,addPlaces } from "../controllers/tripController.js"
const router=Router()

router.post('/get-results',getTrip)
router.post('/make-trip',makeTrip)
router.post('/add-places',addPlaces)

export default router