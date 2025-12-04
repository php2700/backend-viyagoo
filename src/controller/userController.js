import AboutModel from "../model/aboutModel.js";
import AdminModel from "../model/adminModel.js";
import BannerModel from "../model/bannerModel.js";
import BenefitModel, { BenefitHeadingModel, ServiceBgBannerModel } from "../model/benefitModel.js";
import ClientModel, { ClientHeadingModel } from "../model/clientModel.js";
import QuoteModel from "../model/quoteModel.js";
import SavingModel, { SecurityHeadingModel, SecurityModel } from "../model/savingModel.js";
import SetModel from "../model/setModel.js";
import StrengthModel, { StrengthHeadingModel } from "../model/strengthModel.js";
import TestImotionalModel, { TestimonialHeadingModel } from "../model/testimotionalModel.js";
import Location from "../model/Location.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import SegmentModel, { ServiceBannerModel } from "../model/segmentModel.js";
import WhySegmentModel, { WhySegmentHeadingModel } from "../model/whySegmentModel.js";
import SegmentFleetModel, { FleetHeadingModel } from "../model/segmentFleetModel.js";
import LogisticModel from "../model/logisticModel.js";
import ChauferModel from "../model/chauferModel.js";
import ChauferEdgeModel from "../model/chauferEdgeModel.js";
import ChauferServiceModel, { ChaufferHeadingModel } from "../model/chauferServiceModel.js";
import CorporateModel, { CorporateHeadingModel } from "../model/corporateModel.js";
import ChauferEdgeDetailModel from "../model/chauferEdgeDetailModel.js";
import TransportationModel from "../model/transportationModel.js";
import WhytransportationModel, { TransportHeadingModel } from "../model/whyTransPortationModel.js";
import BusinessTransportationModel, { BusinessHeadingModel } from "../model/businessTransportationModel.js";
import FutureMobilityModel from "../model/futureMobilityModel.js";
import FutureMobilityDetailModel from "../model/futureMobilityDetailModel.js";
import BelieveModel from "../model/whyBelieveModel.js";
// import DriverPage from "../model/DriverModel.js";
// import DriverInquiry from "../model/DriverModel.js";
import ViyagooBannerModel, { DriverPage, DriverInquiry } from "../model/DriverModel.js";
import AboutBannerModel, { AboutUSModel } from "../model/AboutUSModel.js";



const checkPassword = async (password, hashPassword) => {
    const verifyPassword = await bcrypt.compare(password, hashPassword);
    if (verifyPassword) return verifyPassword;
    throw new Error('Email and Password wrong')
}

const generateToken = async (userData) => {
    const token = await jwt.sign({ id: userData?.id, role: userData?.role }, process.env.JWT_SECRET_KEY, { algorithm: process.env.JWT_ALGORITHM, expiresIn: process.env.JWT_EXPIRE_TIME });
    if (token) return token;
    throw new Error('something went wrong')

}

export const Login = async (req, res, next) => {
    try {
        const { email, password } = req?.body;

        const isExistEmail = await AdminModel.findOne({ email: email });
        if (!isExistEmail) return res.status(404).json({ success: false, message: 'email not valid' })

        await checkPassword(password, isExistEmail?.password);
        const token = await generateToken(isExistEmail);

        const userData = {
            _id: isExistEmail?._id,
            role: isExistEmail?.role,
            token: token
        }
        return res.status(200).json({ message: 'login-successfully', data: userData })
    } catch (error) {
        next(error)
    }
}

export const quotelist = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const totalQuote = await QuoteModel.countDocuments();
        const quoteData = await QuoteModel.find().skip(skip).limit(limit).sort({ createdAt: -1 });
        return res.status(200).json({
            success: true,
            data: quoteData,
            pagination: {
                totalCount: totalQuote,
                page: page,
                limit: limit,
                totalPage: Math.ceil(totalQuote / limit)
            }
        })
    } catch (error) {
        next(error)
    }
}

export const getBanner = async (req, res, next) => {
    try {
        const banner = await BannerModel.findOne();

        if (!banner) {
            return res.status(404).json({
                success: false,
                message: "No banner found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Banner fetched successfully",
            data: banner,
        });
    } catch (error) {
        console.error("Error fetching banner:", error);
        next(error);
    }
};

export const getAbout = async (req, res, next) => {
    try {
        const about = await AboutModel.findOne();

        if (!about) {
            return res.status(404).json({
                success: false,
                message: "No About Us data found",
            });
        }

        res.status(200).json({
            success: true,
            message: "About Us fetched successfully",
            data: about,
        });
    } catch (error) {
        console.error("Error fetching about:", error);
        next(error);
    }
};


export const getBenefit = async (req, res, next) => {
    try {
        const benefits = await BenefitModel.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            message: "Benefits fetched successfully",
            data: benefits,
        });
    } catch (error) {
        next(error);
    }
};

export const getBenefitHeading = async (req, res, next) => {
    try {
        const benefits = await BenefitHeadingModel.findOne()
        res.status(200).json({
            success: true,
            message: "Benefits fetched successfully",
            data: benefits,
        });
    } catch (error) {
        next(error);
    }
};



export const getSecurityHeading = async (req, res, next) => {
    try {
        const benefits = await SecurityHeadingModel.findOne()
        res.status(200).json({
            success: true,
            message: "security fetched successfully",
            data: benefits,
        });
    } catch (error) {
        next(error);
    }
};

export const getStrageticHeading = async (req, res, next) => {
    try {
        const benefits = await StrengthHeadingModel.findOne()
        res.status(200).json({
            success: true,
            message: "strategic fetched successfully",
            data: benefits,
        });
    } catch (error) {
        next(error);
    }
};

export const getClientHeading = async (req, res, next) => {
    try {
        const benefits = await ClientHeadingModel.findOne()
        res.status(200).json({
            success: true,
            message: "client heading fetched successfully",
            data: benefits,
        });
    } catch (error) {
        next(error);
    }
};

export const getTestimonialHeading = async (req, res, next) => {
    try {
        const benefits = await TestimonialHeadingModel.findOne()
        res.status(200).json({
            success: true,
            message: "testimonial heading fetched successfully",
            data: benefits,
        });
    } catch (error) {
        next(error);
    }
};

export const getWhySegmentHeading = async (req, res, next) => {
    try {
        const benefits = await WhySegmentHeadingModel.findOne()
        res.status(200).json({
            success: true,
            message: "why segment heading fetched successfully",
            data: benefits,
        });
    } catch (error) {
        next(error);
    }
};

export const getSegmentFleetHeading = async (req, res, next) => {
    try {
        const benefits = await FleetHeadingModel.findOne()
        res.status(200).json({
            success: true,
            message: "segment fleet heading fetched successfully",
            data: benefits,
        });
    } catch (error) {
        next(error);
    }
};


export const getBusinessHeading = async (req, res, next) => {
    try {
        const benefits = await BusinessHeadingModel.findOne()
        res.status(200).json({
            success: true,
            message: "business heading fetched successfully",
            data: benefits,
        });
    } catch (error) {
        next(error);
    }
};

export const getWhyTransportHeading = async (req, res, next) => {
    try {
        const benefits = await TransportHeadingModel.findOne()
        res.status(200).json({
            success: true,
            message: "why transport heading fetched successfully",
            data: benefits,
        });
    } catch (error) {
        next(error);
    }
};

export const getchaufferServiceHeading = async (req, res, next) => {
    try {
        const benefits = await ChaufferHeadingModel.findOne()
        res.status(200).json({
            success: true,
            message: "chauffer heading fetched successfully",
            data: benefits,
        });
    } catch (error) {
        next(error);
    }
};

/*--------- Get All Savings ---------*/
export const getSaving = async (req, res, next) => {
    try {
        const savings = await SavingModel.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            message: "Savings fetched successfully",
            data: savings,
        });
    } catch (error) {
        next(error);
    }
};


/*--------- Get All Savings ---------*/
export const getSecurity = async (req, res, next) => {
    try {
        const savings = await SecurityModel.find().sort({ createdAt: -1 });
        console.log(savings,'ggg')
        res.status(200).json({
            success: true,
            message: "Savings fetched successfully",
            data: savings,
        });
    } catch (error) {
        next(error);
    }
};
/*--------- Get Set ---------*/
// export const getSetData = async (req, res, next) => {
//     try {
//         const setData = await SetModel.findOne();

//         if (!setData) {
//             return res.status(404).json({
//                 success: false,
//                 message: "No set data found",
//             });
//         }

//         res.status(200).json({
//             success: true,
//             message: "Set data fetched successfully",
//             data: setData,
//         });
//     } catch (error) {
//         next(error);
//     }
// };
export const getSetData = async (req, res, next) => {
    try {
        const setData = await SetModel.findOne();

        return res.status(200).json({
            success: true,
            message: setData ? "Set data fetched successfully" : "No set data found",
            data: setData || null,
        });

    } catch (error) {
        next(error);
    }
};


/*--------- Get All Strategics ---------*/
export const getStrength = async (req, res, next) => {
    try {
        const data = await StrengthModel.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            message: "Strategic images fetched successfully",
            data,
        });
    } catch (error) {
        next(error);
    }
};

/*------------------Get All Clients------------------*/
export const getClients = async (req, res, next) => {
    try {
        const clients = await ClientModel.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            message: "Clients fetched successfully",
            data: clients,
        });
    } catch (error) {
        next(error);
    }
};


/*------------------ Get All Testimonials ------------------*/
export const getTestimonials = async (req, res, next) => {
    try {
        console.log("Attempting to fetch testimonials...");
        const testimonials = await TestImotionalModel.find().sort({ createdAt: -1 });
        console.log("Testimonials found:", testimonials);
        res.status(200).json({
            success: true,
            message: "Testimonials fetched successfully",
            data: testimonials,
        });
    } catch (error) {
        console.error("!!! ERROR in getTestimonials:", error);
        next(error);
    }
};

// export const addQuote = async (req, res, next) => {
//     try {
//         { }
//         const quote = new QuoteModel(req?.body);
//         await quote.save();
//         res.status(200).json({
//             success: true,
//             message: "quote data saved successfully",
//             data: testimonials,
//         });
//     } catch (error) {
//         next(error);
//     }
// }
export const addQuote = async (req, res, next) => {
    try {
        // req.body से नया क्वोट बनाएं
        const quote = new QuoteModel(req.body);

        // उसे डेटाबेस में सेव करें
        await quote.save();

        // जवाब में 'testimonials' की जगह 'quote' भेजें
        res.status(200).json({
            success: true,
            message: "Quote data saved successfully",
            data: quote, // <-- यहाँ ठीक किया गया है
        });

    } catch (error) {
        // कोई भी एरर आने पर उसे हैंडल करें
        next(error);
    }
};

// 

// ========== Add Location ==========
export const addLocation = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name)
            return res.status(400).json({ message: "Location name required" });

        const exists = await Location.findOne({ name });
        if (exists) return res.status(400).json({ message: "Already exists" });

        const newLoc = await Location.create({ name });

        return res.status(201).json({
            message: "Location added",
            data: newLoc,
        });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

// ========== Get All Locations ==========
export const getLocations = async (req, res) => {
    try {
        const locations = await Location.find().sort({ name: 1 });

        return res.status(200).json({
            message: "Locations fetched successfully",
            data: locations,
        });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};


export const getEvSegment = async (req, res, next) => {
    try {
        const segment = await SegmentModel.findOne();

        return res.status(200).json({
            success: true,
            data: segment || {},
        });
    } catch (error) {
        next(error);
    }
};


export const getWhySegment = async (req, res, next) => {
    try {
        const data = await WhySegmentModel.find();

        return res.status(200).json({
            success: true,
            data,
        });
    } catch (error) {
        next(error);
    }
};


export const getSegmentFleet = async (req, res, next) => {
    try {
        const data = await SegmentFleetModel.find();

        return res.status(200).json({
            success: true,
            data,
        });
    } catch (error) {
        next(error);
    }
};


export const getLogistic = async (req, res, next) => {
    try {
        const data = await LogisticModel.findOne();

        return res.status(200).json({
            success: true,
            data,
        });
    } catch (error) {
        next(error);
    }
};


export const getChaufer = async (req, res, next) => {
    try {
        const data = await ChauferModel.findOne();
        return res.status(200).json({
            success: true,
            data,
        });
    } catch (error) {
        next(error);
    }
};

export const getViyagooEdge = async (req, res, next) => {
    try {
        const data = await ChauferEdgeModel.findOne();
        return res.status(200).json({
            success: true,
            data,
        });
    } catch (error) {
        next(error);
    }
};

export const getChauferService = async (req, res, next) => {
    try {
        const data = await ChauferServiceModel.find();
        res.status(200).json({ success: true, data });
    } catch (err) {
        next(err);
    }
};

export const getCorporate = async (req, res) => {
    try {
        const data = await CorporateModel.find();
        return res.status(200).json({ success: true, data });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

export const getCorporateHeading = async (req, res, next) => {
    try {
        const benefits = await CorporateHeadingModel.findOne()
        res.status(200).json({
            success: true,
            message: "testimonial heading fetched successfully",
            data: benefits,
        });
    } catch (error) {
        next(error);
    }
};


export const getViyagooEdgeDetail = async (req, res) => {
    try {
        const data = await ChauferEdgeDetailModel.find();
        return res.status(200).json({ success: true, data });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

export const getTransportation = async (req, res) => {
    try {
        const data = await TransportationModel.findOne();
        return res.status(200).json({ success: true, data });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

export const getWhyTransportation = async (req, res) => {
    try {
        const data = await WhytransportationModel.find();
        return res.status(200).json({ success: true, data });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

export const getBusinessTransportation = async (req, res) => {
    try {
        const data = await BusinessTransportationModel.find();
        return res.status(200).json({ success: true, data });

    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

export const getFutureMobility = async (req, res) => {
    try {
        const data = await FutureMobilityModel.findOne();

        return res.status(200).json({
            success: true,
            data
        });

    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

export const getFututreDetail = async (req, res) => {
    try {
        const data = await FutureMobilityDetailModel.find().sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            data
        });

    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

export const getBelieveTransportation = async (req, res) => {
    try {
        const data = await BelieveModel.findOne();

        return res.status(200).json({ success: true, data });

    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};
export const driverpagecontent = async (req, res) => {
     try {
    const content = await DriverPage.findOne();
    res.json({ success: true, data: content || {} });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }

}
export const submitdriverform = async (req, res) => {
      try {
    const newData = new DriverInquiry(req.body);
    await newData.save();
    res.status(200).json({ success: true, message: "Form submitted successfully!" });
  } catch (err) {
    console.error("Form Submit Error:", err);
    res.status(500).json({ success: false, error: err.message });
  }

}
export const getAboutData = async (req, res) => {
  try {
    let aboutData = await AboutUSModel.findOne();
    if (!aboutData) {
      return res.status(200).json({ success: true, data: {} });
    }
    res.status(200).json({ success: true, data: aboutData });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getaboutBanner = async (req, res, next) => {
    try {
        const banner = await AboutBannerModel.findOne();

        if (!banner) {
            return res.status(404).json({
                success: false,
                message: "No banner found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Banner fetched successfully",
            data: banner,
        });
    } catch (error) {
        console.error("Error fetching banner:", error);
        next(error);
    }
};

export const getServiceBanner = async (req, res, next) => {
    try {
        const banner = await ServiceBannerModel.findOne();

        if (!banner) {
            return res.status(404).json({
                success: false,
                message: "No banner found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Banner fetched successfully",
            data: banner,
        });
    } catch (error) {
        console.error("Error fetching banner:", error);
        next(error);
    }
};

export const getHomeBgBanner = async (req, res, next) => {
    try {
        const banner = await ServiceBgBannerModel.findOne();

        if (!banner) {
            return res.status(404).json({
                success: false,
                message: "No banner found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Banner fetched successfully",
            data: banner,
        });
    } catch (error) {
        console.error("Error fetching banner:", error);
        next(error);
    }
};

export const getViyagooBanner = async (req, res, next) => {
    try {
        const banner = await ViyagooBannerModel.findOne();

        if (!banner) {
            return res.status(404).json({
                success: false,
                message: "No banner found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Banner fetched successfully",
            data: banner,
        });
    } catch (error) {
        console.error("Error fetching banner:", error);
        next(error);
    }
};