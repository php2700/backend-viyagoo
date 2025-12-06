import { Router } from "express";
import { addQuote, getAbout, getBanner, getBenefit, getClients, getSaving, getSetData, getStrength, getAboutData, getTestimonials, addLocation, getLocations, getLogistic, getEvSegment, getWhySegment, getSegmentFleet, getChaufer, getChauferService, getCorporate, getViyagooEdge, getViyagooEdgeDetail, getTransportation, getWhyTransportation, getBusinessTransportation, getFutureMobility, getFututreDetail, getBelieveTransportation, driverpagecontent, submitdriverform, getSecurity, getaboutBanner, getViyagooBanner, getServiceBanner, getHomeBgBanner, getStrageticHeading, getClientHeading, getTestimonialHeading, getBenefitHeading, getSecurityHeading, getSegmentFleetHeading, getWhySegmentHeading, getchaufferServiceHeading, getCorporateHeading, getWhyTransportHeading, getBusinessHeading, getContact } from "../controller/userController.js";

const userRouter = Router();

/*-------------------home page api---------------*/
userRouter.post('/quote', addQuote)
userRouter.get('/get-banner', getBanner)
userRouter.get('/get-about', getAbout)
userRouter.get('/benefit-heading', getBenefitHeading);
userRouter.get('/get-benefit', getBenefit);
userRouter.get('/security-heading', getSecurityHeading);
userRouter.get('/get-security', getSecurity)
userRouter.get('/get-saving', getSaving)
userRouter.get('/get-set', getSetData)
userRouter.get('/stregic-heading', getStrageticHeading);
userRouter.get('/get-stregic', getStrength)
userRouter.get('/client-heading', getClientHeading);
userRouter.get('/get-clients', getClients)
userRouter.get('/testimonial-heading', getTestimonialHeading);
userRouter.get('/get-testimonial', getTestimonials);
userRouter.get("/add-location", addLocation);
userRouter.get("/get-locations", getLocations);
userRouter.get('/home-bg-banner', getHomeBgBanner)


/*====================service===================== */
userRouter.get('/get-service-banner', getServiceBanner)

userRouter.get('/logistic', getLogistic)

/*====================ev-segment===================== */
userRouter.get('/why-segment-heading', getWhySegmentHeading);
userRouter.get('/segment-fleet-heading', getSegmentFleetHeading);
userRouter.get('/segment', getEvSegment)
userRouter.get('/why-segment', getWhySegment)
userRouter.get('/segment-fleet', getSegmentFleet)

/*=====================chaufer service=============== */
userRouter.get('/chaufer', getChaufer)
userRouter.get('/chaufer-service-heading', getchaufferServiceHeading);
userRouter.get('/chaufer-service', getChauferService)
userRouter.get('/corporate', getCorporate)
userRouter.get('/heading-corporate', getCorporateHeading);
userRouter.get('/viyagoo-edge', getViyagooEdge)
userRouter.get('/viyagoo-edge-detail', getViyagooEdgeDetail)

userRouter.get('/transportation-heading', getWhyTransportHeading);
userRouter.get('/business-heading', getBusinessHeading);
userRouter.get('/transportation', getTransportation)
userRouter.get('/why-transportation', getWhyTransportation)
userRouter.get('/business-transportation', getBusinessTransportation)
userRouter.get('/future-mobility', getFutureMobility)
userRouter.get('/detail-future-mobility', getFututreDetail)
userRouter.get('/believe-transportation', getBelieveTransportation)

userRouter.get('/get-viyagoo-banner', getViyagooBanner)
userRouter.get("/driver-page-content", driverpagecontent)
userRouter.post("/submit-driver-form", submitdriverform)

userRouter.get('/get-about-banner', getaboutBanner)
userRouter.get('/aboutUS', getAboutData)


userRouter.get('/contact',  getContact)


export default userRouter;