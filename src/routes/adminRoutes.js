import { Router } from "express";
import { authentication } from "../middleware/authentication.js";
import { authorization } from "../middleware/authorization.js";
import { addAbout, addBanner, addBelieveTransportation, addBenefit, addBusinessTransportation, addChaufer, addChauferService, addClients, addCorporate, addEvSegment, addFutureMobility, addFututreDetail, addLogistic, addSaving, addSegmentFleet, addSetUsPart, addStragicStrength, addTestimonial, addViyagooEdge, addViyagooEdgeDetail, addWhySegment, addWhyTransportation, deleteBenefit, deleteBusinessTransportation, deleteChauferService, deleteclient, deleteCorporate, deleteFututreDetail, deleteSaving, deleteSegmentFleet, deleteStrength, deleteTestimonial, deleteViyagooEdgeDetail, deleteWhySegment, deleteWhyTransportation, editBenefit, editCleient, editSaving, editSegmentFleet, editStrength, editTestimonial, editWhySegment, updateBusinessTransportation, updateChauferService, updateCorporate, updateFututreDetail, updateViyagooEdgeDetail, updateWhyTransportation, upsertTransportation ,driverinquiries,driverpagecontent,updatedriverpage,getAboutData,updateAboutData, editSecurity, addSecurity, deleteSecurity, addaboutBanner, addviyagooBanner, addServiceBanner, addHomeBgBanner} from "../controller/admincontroller.js";
import upload from '../middleware/upload.js';
import { getAbout, getaboutBanner, getBanner, getBelieveTransportation, getBenefit, getBusinessTransportation, getChaufer, getChauferService, getClients, getCorporate, getEvSegment, getFutureMobility, getFututreDetail, getHomeBgBanner, getLogistic, getSaving, getSecurity, getSegmentFleet, getServiceBanner, getSetData, getStrength, getTestimonials, getTransportation, getViyagooBanner, getViyagooEdge, getViyagooEdgeDetail, getWhySegment, getWhyTransportation, Login, quotelist, } from "../controller/userController.js";
import uploadVideo from "../middleware/videoupload.js";

const adminRouter = Router();

adminRouter.post('/login', Login)
/*------------------banner------------------*/
adminRouter.get('/get-quote-list', authentication, authorization(['admin']), quotelist)

/*------------------banner------------------*/
adminRouter.get('/get-banner', authentication, authorization(['admin']), getBanner)
adminRouter.post('/banner', authentication, authorization(['admin']),   uploadVideo.fields([
    { name: "image", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]), addBanner)

/*------------------about us------------------*/
adminRouter.get('/about', authentication, authorization(['admin']), getAbout)
adminRouter.post('/about', authentication, authorization(['admin']), upload.single("image"), addAbout)

/*------------------Benefit APIs------------------*/
adminRouter.get('/home-bg-banner', authentication, authorization(['admin']), getHomeBgBanner)
adminRouter.post('/home-bg-banner', authentication, authorization(['admin']), upload.single("banner"), addHomeBgBanner)

adminRouter.get('/get-benefit', authentication, authorization(['admin']), getBenefit);
adminRouter.post('/benefit', authentication, authorization(['admin']), upload.single("image"), addBenefit);
adminRouter.patch('/edit-benefit', authentication, authorization(['admin']), upload.single("image"), editBenefit);
adminRouter.delete('/delete-benefit/:id', authentication, authorization(['admin']), deleteBenefit);

/*------------------saving------------------*/
adminRouter.get('/get-saving', authentication, authorization(['admin']), getSaving)
adminRouter.patch('/saving', authentication, authorization(['admin']), upload.single("image"), editSaving)
adminRouter.post('/saving', authentication, authorization(['admin']), upload.single("image"), addSaving)
adminRouter.delete("/delete-saving/:id", authentication, authorization(['admin']), deleteSaving)

/*------------------security------------------*/
adminRouter.get('/get-security', authentication, authorization(['admin']), getSecurity)
adminRouter.patch('/security', authentication, authorization(['admin']), upload.single("image"), editSecurity)
adminRouter.post('/security', authentication, authorization(['admin']), upload.single("image"), addSecurity)
adminRouter.delete("/delete-security/:id", authentication, authorization(['admin']), deleteSecurity)

/*------------------what sets us part------------------*/
adminRouter.get('/get-what-set-apart', authentication, authorization(['admin']), getSetData)
adminRouter.post('/set-apart', authentication, authorization(['admin']), upload.fields([{ name: "image", maxCount: 1 }, { name: "smallImage", maxCount: 1 },]), addSetUsPart)

/*------------------stragic strength------------------*/
adminRouter.get('/get-stregic', authentication, authorization(['admin']), getStrength)
adminRouter.post('/stregic', authentication, authorization(['admin']), upload.array("images", 5), addStragicStrength)
adminRouter.patch('/edit-stregic', authentication, authorization(['admin']),upload.single("image"), editStrength)
adminRouter.delete("/delete-stregic/:id", authentication, authorization(['admin']), deleteStrength)

/*------------------clients------------------*/
adminRouter.get('/get-clients', authentication, authorization(['admin']), getClients)
adminRouter.post('/client', authentication, authorization(['admin']), upload.array("images", 5), addClients)
adminRouter.patch('/edit-client', authentication, authorization(['admin']),upload.single("image"), editCleient)
adminRouter.delete("/delete-client/:id", authentication, authorization(['admin']),  deleteclient)

/*------------------testimotional------------------*/
adminRouter.get('/get-testimonial', authentication, authorization(['admin']), getTestimonials);
adminRouter.post('/testimonial', authentication, authorization(['admin']), addTestimonial);
adminRouter.patch('/edit-testimonial', authentication, authorization(['admin']), editTestimonial);
adminRouter.delete('/delete-testimonial/:id', authentication, authorization(['admin']), deleteTestimonial);



/*======================************services***** start*************================================= */
/*------------------service banner------------------*/
adminRouter.get('/get-service-banner', authentication, authorization(['admin']), getServiceBanner)
adminRouter.post('/service-banner', authentication, authorization(['admin']), upload.single("banner"), addServiceBanner)

/*=====================   ev segment =========================  */

/*------------------------about ev segment -------*/
adminRouter.get('/segment', authentication, authorization(['admin']), getEvSegment)
adminRouter.post('/segment', authentication, authorization(['admin']), addEvSegment)

/*------------------------why ev segment -------*/
adminRouter.get('/why-segment', authentication, authorization(['admin']), getWhySegment)
adminRouter.patch('/why-segment', authentication, authorization(['admin']), upload.single("image"), editWhySegment)
adminRouter.post('/why-segment', authentication, authorization(['admin']), upload.single("image"), addWhySegment)
adminRouter.delete("/why-segment/:id", authentication, authorization(['admin']), deleteWhySegment)

/*------------------------our fleet -------*/
adminRouter.get('/segment-fleet', authentication, authorization(['admin']), getSegmentFleet)
adminRouter.patch('/segment-fleet', authentication, authorization(['admin']), upload.single("image"), editSegmentFleet)
adminRouter.post('/segment-fleet', authentication, authorization(['admin']), upload.single("image"), addSegmentFleet)
adminRouter.delete("/segment-fleet/:id", authentication, authorization(['admin']), deleteSegmentFleet)


/*=====================   logistic =========================  */
adminRouter.get('/logistic', authentication, authorization(['admin']), getLogistic)
adminRouter.post('/logistic', authentication, authorization(['admin']), upload.fields([{ name: "whyViyagooImage", maxCount: 1 }, { name: "ourProcessImage", maxCount: 1 }]), addLogistic)



/*=====================   chaufer $ airport transfers =========================  */

/*------------------------chaufer---------------*/
adminRouter.get('/chaufer', authentication, authorization(['admin']), getChaufer)
adminRouter.post('/chaufer', authentication, authorization(['admin']), addChaufer)

/*------------------------chaufer services---------------*/
adminRouter.get('/chaufer-service', authentication, authorization(['admin']), getChauferService)
adminRouter.post('/chaufer-service', authentication, authorization(['admin']), upload.single("image"), addChauferService)
adminRouter.patch('/chaufer-service', authentication, authorization(['admin']), upload.single("image"), updateChauferService)
adminRouter.delete('/chaufer-service/:id', authentication, authorization(['admin']), deleteChauferService)

/*------------------------corporate---------------*/
adminRouter.get('/corporate', authentication, authorization(['admin']), getCorporate)
adminRouter.post('/corporate', authentication, authorization(['admin']), upload.single("image"), addCorporate)
adminRouter.patch('/corporate', authentication, authorization(['admin']), upload.single("image"), updateCorporate)
adminRouter.delete('/corporate/:id', authentication, authorization(['admin']), deleteCorporate)

/*------------------------viyagoo Edge---------------*/
adminRouter.get('/viyagoo-edge', authentication, authorization(['admin']), getViyagooEdge)
adminRouter.post('/viyagoo-edge', authentication, authorization(['admin']), addViyagooEdge)

/*------------------------viyagoo Edge Detail---------------*/
adminRouter.get('/viyagoo-edge-detail', authentication, authorization(['admin']), getViyagooEdgeDetail)
adminRouter.post('/viyagoo-edge-detail', authentication, authorization(['admin']), upload.single("image"), addViyagooEdgeDetail)
adminRouter.patch('/viyagoo-edge-detail', authentication, authorization(['admin']), upload.single("image"), updateViyagooEdgeDetail)
adminRouter.delete('/viyagoo-edge-detail/:id', authentication, authorization(['admin']), deleteViyagooEdgeDetail)

/*=====================   transportation =========================  */

/*------------------------transportation---------------*/
adminRouter.get('/transportation', authentication, authorization(['admin']), getTransportation)
adminRouter.post('/transportation', authentication, authorization(['admin']), upload.fields([
    { name: "image1", maxCount: 1 }, { name: "image2", maxCount: 1 }, { name: "image3", maxCount: 1 }, { name: "image4", maxCount: 1 },
]), upsertTransportation)

/*------------------------why transportation---------------*/
adminRouter.get('/why-transportation', authentication, authorization(['admin']), getWhyTransportation)
adminRouter.post('/why-transportation', authentication, authorization(['admin']), upload.single("image"), addWhyTransportation)
adminRouter.patch('/why-transportation', authentication, authorization(['admin']), upload.single("image"), updateWhyTransportation)
adminRouter.delete('/why-transportation/:id', authentication, authorization(['admin']), deleteWhyTransportation)

/*------------------------business transportation---------------*/
adminRouter.get('/business-transportation', authentication, authorization(['admin']), getBusinessTransportation)
adminRouter.post('/business-transportation', authentication, authorization(['admin']), upload.single("image"), addBusinessTransportation)
adminRouter.patch('/business-transportation', authentication, authorization(['admin']), upload.single("image"), updateBusinessTransportation)
adminRouter.delete('/business-transportation/:id', authentication, authorization(['admin']), deleteBusinessTransportation)

/*------------------------future mobility---------------*/
adminRouter.get('/future-mobility', authentication, authorization(['admin']), getFutureMobility)
adminRouter.post('/future-mobility', authentication, authorization(['admin']), upload.single("image"), addFutureMobility)

/*------------------------future mobility detail---------------*/
adminRouter.get('/detail-future-mobility', authentication, authorization(['admin']), getFututreDetail)
adminRouter.post('/detail-future-mobility', authentication, authorization(['admin']), upload.single("image"), addFututreDetail)
adminRouter.patch('/detail-future-mobility', authentication, authorization(['admin']), upload.single("image"), updateFututreDetail)
adminRouter.delete('/detail-future-mobility/:id', authentication, authorization(['admin']), deleteFututreDetail)

/*------------------------why believe transportation---------------*/
adminRouter.get('/believe-transportation', authentication, authorization(['admin']), getBelieveTransportation)
adminRouter.post('/believe-transportation', authentication, authorization(['admin']), addBelieveTransportation)
/*======================****************services  ***** end***********************================================= */




adminRouter.get('/get-viyagoo-banner', authentication, authorization(['admin']), getViyagooBanner)
adminRouter.post('/viyagoo-banner', authentication, authorization(['admin']), upload.single("banner"), addviyagooBanner)
adminRouter.get("/driver-inquiries", authentication, authorization(["admin"]),driverinquiries)
adminRouter.get("/driver-page-content", authentication, authorization(["admin"]),driverpagecontent)
adminRouter.post("/driver-page-content", authentication, authorization(["admin"]), upload.single("image"),updatedriverpage)



/*------------------banner------------------*/
adminRouter.get('/get-about-banner', authentication, authorization(['admin']), getaboutBanner)
adminRouter.post('/about-banner', authentication, authorization(['admin']), upload.single("banner"), addaboutBanner)
adminRouter.get('/aboutUS', authentication, authorization(['admin']), getAboutData )
adminRouter.post('/aboutUS', authentication, authorization(['admin']),upload.fields([
    { name: "whatSetImage", maxCount: 1 }, { name: "vehicleIcon", maxCount: 1 }, { name: "safetyIcon", maxCount: 1 }, { name: "tripIcon", maxCount: 1 },
     { name: "tripDailyIcon", maxCount: 1 }
]), updateAboutData)


export default adminRouter