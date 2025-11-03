import { Router } from "express";
import { authentication } from "../middleware/authentication.js";
import { authorization } from "../middleware/authorization.js";
import { addAbout, addBanner, addBenefit, addClients, addSaving, addSetUsPart, addStragicStrength, addTestimonial, deleteBenefit, deleteclient, deleteSaving, deleteStrength, deleteTestimonial, editBenefit, editCleient, editSaving, editStrength, editTestimonial } from "../controller/admincontroller.js";
import upload from '../middleware/upload.js';
import { getAbout, getBanner, getBenefit, getClients, getSaving, getSetData, getStrength, getTestimonials, Login, quotelist } from "../controller/userController.js";
import uploadVideo from "../middleware/videoupload.js";

const adminRouter = Router();

adminRouter.post('/login', Login)
/*------------------banner------------------*/
adminRouter.get('/get-quote-list', authentication, authorization(['admin']), quotelist)

/*------------------banner------------------*/
adminRouter.get('/get-banner', authentication, authorization(['admin']), getBanner)
adminRouter.post('/banner', authentication, authorization(['admin']), uploadVideo.single("video"), addBanner)

/*------------------about us------------------*/
adminRouter.get('/about', authentication, authorization(['admin']), getAbout)
adminRouter.post('/about', authentication, authorization(['admin']), upload.single("image"), addAbout)

/*------------------Benefit APIs------------------*/
adminRouter.get('/get-benefit', authentication, authorization(['admin']), getBenefit);
adminRouter.post('/benefit', authentication, authorization(['admin']), upload.single("image"), addBenefit);
adminRouter.patch('/edit-benefit', authentication, authorization(['admin']), upload.single("image"), editBenefit);
adminRouter.delete('/delete-benefit/:id', authentication, authorization(['admin']), deleteBenefit);

/*------------------saving------------------*/
adminRouter.get('/get-saving', authentication, authorization(['admin']), getSaving)
adminRouter.post('/saving', authentication, authorization(['admin']), upload.single("image"), addSaving)
adminRouter.patch('/edit-saving', authentication, authorization(['admin']), editSaving)
adminRouter.delete("/delete-saving/:id", authentication, authorization(['admin']), upload.single("image"), deleteSaving)

/*------------------what sets us part------------------*/
adminRouter.get('/get-set', authentication, authorization(['admin']), getSetData)
adminRouter.post('/set', authentication, authorization(['admin']), upload.fields([{ name: "image", maxCount: 1 }, { name: "smallImage", maxCount: 1 },]), addSetUsPart)

/*------------------stragic strength------------------*/
adminRouter.get('/get-stregic', authentication, authorization(['admin']), getStrength)
adminRouter.post('/stregic', authentication, authorization(['admin']), upload.single("image"), addStragicStrength)
adminRouter.patch('/edit-stregic', authentication, authorization(['admin']), editStrength)
adminRouter.delete("/delete-stregic/:id", authentication, authorization(['admin']), upload.single("image"), deleteStrength)

/*------------------clients------------------*/
adminRouter.get('/get-clients', authentication, authorization(['admin']), getClients)
adminRouter.post('/client', authentication, authorization(['admin']), upload.single("image"), addClients)
adminRouter.patch('/edit-client', authentication, authorization(['admin']), editCleient)
adminRouter.delete("/delete-client/:id", authentication, authorization(['admin']), upload.single("image"), deleteclient)

/*------------------testimotional------------------*/
adminRouter.get('/get-testimonial', authentication, authorization(['admin']), getTestimonials);
adminRouter.post('/testimonial', authentication, authorization(['admin']), addTestimonial);
adminRouter.patch('/edit-testimonial', authentication, authorization(['admin']), editTestimonial);
adminRouter.delete('/delete-testimonial/:id', authentication, authorization(['admin']), deleteTestimonial);


export default adminRouter