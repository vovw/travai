import { Router } from "express"
import { getTrip,makeTrip,addPlaces,getTotalPrice } from "../controllers/tripController.js"
const router=Router()

router.post('/get-results',getTrip)
router.post('/make-trip',makeTrip)
router.post('/add-places',addPlaces)
router.post('/get-total-Price',getTotalPrice)

export default router