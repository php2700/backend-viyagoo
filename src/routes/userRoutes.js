import { Router } from "express";
import { addQuote, getAbout, getBanner, getBenefit, getClients, getSaving, getSetData, getStrength, getTestimonials,addLocation,getLocations, getLogistic, getEvSegment, getWhySegment, getSegmentFleet, getChaufer, getChauferService, getCorporate, getViyagooEdge, getViyagooEdgeDetail } from "../controller/userController.js";

const userRouter = Router();

/*-------------------home page api---------------*/
userRouter.post('/quote', addQuote)
userRouter.get('/get-banner', getBanner)
userRouter.get('/get-about', getAbout)
userRouter.get('/get-benefit', getBenefit);
userRouter.get('/get-saving', getSaving)
userRouter.get('/get-set', getSetData)
userRouter.get('/get-stregic', getStrength)
userRouter.get('/get-clients', getClients)
userRouter.get('/get-testimonial', getTestimonials);
userRouter.get("/add-location", addLocation);
userRouter.get("/get-locations", getLocations);


/*====================service===================== */
userRouter.get('/logistic', getLogistic)

/*====================ev-segment===================== */
userRouter.get('/segment', getEvSegment)
userRouter.get('/why-segment', getWhySegment)
userRouter.get('/segment-fleet', getSegmentFleet)

/*=====================chaufer service=============== */
userRouter.get('/chaufer', getChaufer)
userRouter.get('/chaufer-service', getChauferService)
userRouter.get('/corporate', getCorporate)
userRouter.get('/viyagoo-edge', getViyagooEdge)
userRouter.get('/viyagoo-edge-detail', getViyagooEdgeDetail)


export default userRouter;