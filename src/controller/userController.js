import AboutModel from "../model/aboutModel.js";
import AdminModel from "../model/adminModel.js";
import BannerModel from "../model/bannerModel.js";
import BenefitModel from "../model/benefitModel.js";
import QuoteModel from "../model/quoteModel.js";
import SavingModel from "../model/savingModel.js";
import SetModel from "../model/setModel.js";
import StrengthModel from "../model/strengthModel.js";
import TestImotionalModel from "../model/testimotionalModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

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

/*--------- Get Set ---------*/
export const getSetData = async (req, res, next) => {
    try {
        const setData = await SetModel.findOne();

        if (!setData) {
            return res.status(404).json({
                success: false,
                message: "No set data found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Set data fetched successfully",
            data: setData,
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
        const testimonials = await TestImotionalModel.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            message: "Testimonials fetched successfully",
            data: testimonials,
        });
    } catch (error) {
        next(error);
    }
};

export const addQuote = async (req, res, next) => {
    try {
        { }
        const quote = new QuoteModel(req?.body);
        await quote.save();
        res.status(200).json({
            success: true,
            message: "quote data saved successfully",
            data: testimonials,
        });
    } catch (error) {
        next(error);
    }
}