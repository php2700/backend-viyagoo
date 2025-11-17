import { Router } from "express";
import { addQuote, getAbout, getBanner, getBenefit, getClients, getSaving, getSetData, getStrength, getTestimonials,addLocation,getLocations } from "../controller/userController.js";

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



export default userRouter;