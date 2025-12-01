import BannerModel from "../model/bannerModel.js";
import fs from "fs";
import path from "path";
import AboutModel from "../model/aboutModel.js";
import BenefitModel from "../model/benefitModel.js";
import SavingModel from "../model/savingModel.js";
import SetModel from "../model/setModel.js";
import StrengthModel from "../model/strengthModel.js";
import ClientModel from "../model/clientModel.js";
import TestImotionalModel from "../model/testimotionalModel.js";
import SegmentModel from "../model/segmentModel.js";
import WhySegmentModel from "../model/whySegmentModel.js";
import SegmentFleetModel from "../model/segmentFleetModel.js";
import ChauferModel from "../model/chauferModel.js";
import ChauferEdgeModel from "../model/chauferEdgeModel.js";
import ChauferServiceModel from "../model/chauferServiceModel.js";
import CorporateModel from "../model/corporateModel.js";
import ChauferEdgeDetailModel from "../model/chauferEdgeDetailModel.js";
import TransportationModel from "../model/transportationModel.js";
import BusinessTransportationModel from "../model/businessTransportationModel.js";
import FutureMobilityModel from "../model/futureMobilityModel.js";
import FutureMobilityDetailModel from "../model/futureMobilityDetailModel.js";
import BelieveModel from "../model/whyBelieveModel.js";
import LogisticModel from "../model/logisticModel.js";
import WhytransportationModel from "../model/whyTransPortationModel.js";
// ✅ YEH SAHI HAI (Curly Braces lagayein):
import { DriverInquiry, DriverPage } from "../model/DriverModel.js";
import { AboutUSModel } from "../model/AboutUSModel.js";


export const addBanner = async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Video file is required",
            });
        }
        const videoPath = `public/uploads/${req.file.filename}`;
        const existingBanner = await BannerModel.findOne();

        if (existingBanner) {
            const oldPath = path.join("public", existingBanner.video);
            if (fs.existsSync(oldPath)) {
                fs.unlinkSync(oldPath);
            }
            existingBanner.video = videoPath;
            existingBanner.status = req.body.status ?? existingBanner.status;
            await existingBanner.save();
            return res.status(200).json({
                success: true,
                message: "Banner updated successfully",
                data: existingBanner,
            });
        }

        const banner = await BannerModel.create({
            video: videoPath,
            status: req.body.status ?? true,
        });
        res.status(201).json({
            success: true,
            message: "Banner created successfully",
            data: banner,
        });
    } catch (error) {
        console.error("Error in addBanner:", error);
        next(error);
    }
};

export const addAbout = async (req, res, next) => {
    try {
        const { title, description } = req.body;

        if (!title || !description) {
            return res.status(400).json({
                success: false,
                message: "Title and description are required",
            });
        }

        const existingAbout = await AboutModel.findOne();
        let imagePath;
        if (req.file) {
            imagePath = `public/uploads/${req.file.filename}`;
        }

        if (existingAbout) {
            if (req.file && existingAbout.image) {
                const oldImagePath = path.join("public", existingAbout.image);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
                existingAbout.image = imagePath;
            }

            existingAbout.title = title;
            existingAbout.description = description;

            await existingAbout.save();

            return res.status(200).json({
                success: true,
                message: req.file
                    ? "About Us updated successfully with new image"
                    : "About Us updated successfully",
                data: existingAbout,
            });
        }

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Image is required for creating About Us for the first time",
            });
        }

        const about = await AboutModel.create({
            title,
            description,
            image: imagePath,
        });

        res.status(201).json({
            success: true,
            message: "About Us created successfully",
            data: about,
        });
    } catch (error) {
        console.error("Error in addAbout:", error);
        next(error);
    }
};


export const addBenefit = async (req, res, next) => {
    try {
        const { title, description } = req.body;
        if (!title || !description) return res.status(400).json({ success: false, message: "All field is required" });
        if (!req.file) return res.status(400).json({ success: false, message: "All field is required" });

        const imagePath = req.file ? `public/uploads/${req.file.filename}` : null;

        const benefit = await BenefitModel.create({
            title,
            description,
            image: imagePath,
        });

        res.status(201).json({
            success: true,
            message: "Benefit added successfully",
            data: benefit,
        });
    } catch (error) {
        next(error);
    }
};

export const editBenefit = async (req, res, next) => {
    try {

        const { title, description, _id } = req.body;

        const benefit = await BenefitModel.findById(_id);
        if (!benefit)
            return res.status(404).json({ success: false, message: "Benefit not found" });

        // If new image is uploaded, remove old image
        if (req.file) {
            if (benefit.image) {
                const oldPath = path.join("public", benefit.image);
                if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
            }
            benefit.image = `public/uploads/${req.file.filename}`;
        }

        benefit.title = title || benefit.title;
        benefit.description = description || benefit.description;

        await benefit.save();

        res.status(200).json({
            success: true,
            message: "Benefit updated successfully",
            data: benefit,
        });
    } catch (error) {
        next(error);
    }
};

export const deleteBenefit = async (req, res, next) => {
    try {
        const { id } = req.params;
        const benefit = await BenefitModel.findById(id);
        if (!benefit)
            return res.status(404).json({ success: false, message: "Benefit not found" });

        // Remove image if exists
        if (benefit.image) {
            const imagePath = path.join("public", benefit.image);
            if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
        }

        await BenefitModel.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: "Benefit deleted successfully",
        });
    } catch (error) {
        next(error);
    }
};


export const addSaving = async (req, res, next) => {
    try {
        const { title, description } = req.body;

        if (!title || !description)
            return res.status(400).json({ success: false, message: "all Field is required" });
        if (!req?.file) return res.status(400).json({ success: false, message: "all field is required" });

        const imagePath = req.file ? `public/uploads/${req.file.filename}` : null;

        const saving = await SavingModel.create({
            title,
            description,
            image: imagePath,
        });

        res.status(201).json({
            success: true,
            message: "Saving added successfully",
            data: saving,
        });
    } catch (error) {
        next(error);
    }
};



/*--------- Edit Saving ---------*/
export const editSaving = async (req, res, next) => {
    try {
        const { _id, title, description } = req.body;
        const saving = await SavingModel.findOne({ _id: _id });
        if (!saving)
            return res.status(404).json({ success: false, message: "Saving not found" });

        // Replace old image if new one uploaded
        if (req.file) {
            if (saving.image) {
                const oldPath = path.join("public", saving.image);
                if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
            }
            saving.image = `public/uploads/${req.file.filename}`;
        }

        saving.title = title || saving.title;
        saving.description = description || saving.description;
        await saving.save();

        res.status(200).json({
            success: true,
            message: "Saving updated successfully",
            data: saving,
        });
    } catch (error) {
        next(error);
    }
};

/*--------- Delete Saving ---------*/
export const deleteSaving = async (req, res, next) => {
    try {
        const { id } = req.params;

        const saving = await SavingModel.findById(id);
        if (!saving)
            return res.status(404).json({ success: false, message: "Saving not found" });

        if (saving.image) {
            const imagePath = path.join("public", saving.image);
            if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
        }

        await SavingModel.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: "Saving deleted successfully",
        });
    } catch (error) {
        next(error);
    }
};

export const addSetUsPart = async (req, res, next) => {
    try {
        const { description } = req.body;

        // Get current set record
        let existingSet = await SetModel.findOne();

        // Prepare image paths
        const imagePath = req.files?.image
            ? `/uploads/${req.files.image[0].filename}`
            : existingSet?.image;
        const smallImagePath = req.files?.smallImage
            ? `/uploads/${req.files.smallImage[0].filename}`
            : existingSet?.smallImage;

        // If exist, update
        if (existingSet) {
            // remove old files if replaced
            if (req.files?.image && existingSet.image) {
                const oldPath = path.join("public", existingSet.image);
                if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
            }
            if (req.files?.smallImage && existingSet.smallImage) {
                const oldSmallPath = path.join("public", existingSet.smallImage);
                if (fs.existsSync(oldSmallPath)) fs.unlinkSync(oldSmallPath);
            }

            existingSet.image = imagePath;
            existingSet.smallImage = smallImagePath;
            existingSet.description = description || existingSet.description;

            await existingSet.save();
            return res.status(200).json({
                success: true,
                message: "Set updated successfully",
                data: existingSet,
            });
        }

        // Otherwise, create new record
        const newSet = await SetModel.create({
            image: imagePath,
            smallImage: smallImagePath,
            description,
        });

        res.status(201).json({
            success: true,
            message: "Set created successfully",
            data: newSet,
        });
    } catch (error) {
        next(error);
    }
};


// export const addStragicStrength = async (req, res, next) => {
//     try {
//         if (!req.file)
//             return res.status(400).json({ success: false, message: "Image is required" });

//         const imagePath = `/uploads/${req.file.filename}`;

//         const strategic = await StrengthModel.create({ image: imagePath });

//         res.status(201).json({
//             success: true,
//             message: "Strategic image added successfully",
//             data: strategic,
//         });
//     } catch (error) {
//         next(error);
//     }
// };

export const addStragicStrength = async (req, res, next) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({
                success: false,
                message: "At least one image is required",
            });
        }

        const images = req.files.map((file) => `public/uploads/${file.filename}`);

        const inserted = await Promise.all(
            images.map((image) => StrengthModel.create({ image }))
        );

        res.status(201).json({
            success: true,
            message: "Images uploaded successfully",
            data: inserted,
        });
    } catch (error) {
        next(error);
    }
};



/*--------- Edit Strategic ---------*/
export const editStrength = async (req, res, next) => {
    try {
        const { id } = req.body;

        const strategic = await StrengthModel.findById(id);
        if (!strategic)
            return res.status(404).json({ success: false, message: "Strategic not found" });

        // Replace old image
        if (req.file) {
            const newImage = `public/uploads/${req.file.filename}`;
            if (strategic.image) {
                const oldPath = path.join("public", strategic.image);
                if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
            }
            strategic.image = newImage;
        }

        await strategic.save();

        res.status(200).json({
            success: true,
            message: "Strategic image updated successfully",
            data: strategic,
        });
    } catch (error) {
        next(error);
    }
};

/*--------- Delete Strategic ---------*/
export const deleteStrength = async (req, res, next) => {
    try {
        const { id } = req.params;

        const strategic = await StrengthModel.findById(id);
        if (!strategic)
            return res.status(404).json({ success: false, message: "Strategic not found" });

        // Remove image from uploads
        if (strategic.image) {
            const imagePath = path.join("public", strategic.image);
            if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
        }

        await StrengthModel.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: "Strategic image deleted successfully",
        });
    } catch (error) {
        next(error);
    }
};


// export const addClients = async (req, res, next) => {
//     try {
//         if (!req.file) {
//             return res.status(400).json({ success: false, message: "Image is required" });
//         }

//         const imagePath = `/uploads/${req.file.filename}`;

//         const client = await ClientModel.create({ image: imagePath });

//         res.status(201).json({
//             success: true,
//             message: "Client added successfully",
//             data: client,
//         });
//     } catch (error) {
//         next(error);
//     }
// };
export const addClients = async (req, res, next) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ success: false, message: "At least 1 image is required" });
        }

        let savedClients = [];

        req.files.forEach((file) => {
            const imagePath = `/uploads/${file.filename}`;
            savedClients.push({ image: imagePath });
        });

        const clients = await ClientModel.insertMany(savedClients);

        res.status(201).json({
            success: true,
            message: "Clients added successfully",
            data: clients,
        });
    } catch (error) {
        next(error);
    }
};



/*------------------Edit Client------------------*/
export const editCleient = async (req, res, next) => {
    try {
        const { id } = req.body;
        const client = await ClientModel.findById(id);

        if (!client) {
            return res.status(404).json({ success: false, message: "Client not found" });
        }

        // If new image uploaded, delete old one
        if (req.file) {
            const oldPath = path.join("uploads", path.basename(client.image));
            if (fs.existsSync(oldPath)) {
                fs.unlinkSync(oldPath);
            }
            client.image = `/uploads/${req.file.filename}`;
        }

        await client.save();

        res.status(200).json({
            success: true,
            message: "Client updated successfully",
            data: client,
        });
    } catch (error) {
        next(error);
    }
};

/*------------------Delete Client------------------*/
export const deleteclient = async (req, res, next) => {
    try {
        const { id } = req.params;

        const client = await ClientModel.findById(id);
        if (!client) {
            return res.status(404).json({ success: false, message: "Client not found" });
        }

        const oldPath = path.join("uploads", path.basename(client.image));
        if (fs.existsSync(oldPath)) {
            fs.unlinkSync(oldPath);
        }

        await ClientModel.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: "Client deleted successfully",
        });
    } catch (error) {
        next(error);
    }
};

export const addTestimonial = async (req, res, next) => {
    try {
        const { name, designation, description } = req.body;

        if (!name || !designation || !description) {
            return res.status(400).json({
                success: false,
                message: "All fields (name, designation, description) are required",
            });
        }

        const testimonial = await TestImotionalModel.create({
            name,
            designation,
            description,
        });

        res.status(201).json({
            success: true,
            message: "Testimonial added successfully",
            data: testimonial,
        });
    } catch (error) {
        next(error);
    }
};


/*------------------ Edit Testimonial ------------------*/
export const editTestimonial = async (req, res, next) => {
    try {
        const { id, name, designation, description } = req.body;

        const testimonial = await TestImotionalModel.findById(id);
        if (!testimonial) {
            return res.status(404).json({
                success: false,
                message: "Testimonial not found",
            });
        }

        testimonial.name = name || testimonial.name;
        testimonial.designation = designation || testimonial.designation;
        testimonial.description = description || testimonial.description;

        await testimonial.save();

        res.status(200).json({
            success: true,
            message: "Testimonial updated successfully",
            data: testimonial,
        });
    } catch (error) {
        next(error);
    }
};

/*------------------ Delete Testimonial ------------------*/
export const deleteTestimonial = async (req, res, next) => {
    try {
        const { id } = req.params;

        const testimonial = await TestImotionalModel.findById(id);
        if (!testimonial) {
            return res.status(404).json({
                success: false,
                message: "Testimonial not found",
            });
        }

        await TestImotionalModel.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: "Testimonial deleted successfully",
        });
    } catch (error) {
        next(error);
    }
};

export const addEvSegment = async (req, res, next) => {
    try {
        const { about, evAdvantage, services } = req.body;

        if (!about || !evAdvantage || !services) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        let parsedServices = services;
        const existing = await SegmentModel.findOne();
        if (existing) {
            existing.about = about;
            existing.evAdvantage = evAdvantage;
            existing.services = parsedServices;
            await existing.save();

            return res.status(200).json({
                success: true,
                message: "EV Segment updated successfully",
                data: existing,
            });
        }

        const newSegment = await SegmentModel.create({
            about,
            evAdvantage,
            services: parsedServices,
        });

        return res.status(201).json({
            success: true,
            message: "EV Segment created successfully",
            data: newSegment,
        });

    } catch (error) {
        next(error);
    }
};


export const addWhySegment = async (req, res, next) => {
    try {
        const { title, description } = req.body;

        if (!title || !description || !req.file) {
            return res.status(400).json({
                success: false,
                message: "Image, Title and Description are required",
            });
        }

        const imagePath = `public/uploads/${req.file.filename}`;

        const data = await WhySegmentModel.create({
            title,
            description,
            image: imagePath,
        });

        return res.status(201).json({
            success: true,
            message: "Why EV Segment added successfully",
            data,
        });
    } catch (error) {
        next(error);
    }
};


export const editWhySegment = async (req, res, next) => {
    try {
        const { title, description, _id } = req.body;

        const existing = await WhySegmentModel.findById(_id);

        if (!existing) {
            return res.status(404).json({
                success: false,
                message: "Why EV Segment not found",
            });
        }

        // Remove old image if new one is uploaded
        if (req.file) {
            if (existing.image && fs.existsSync(existing.image)) {
                fs.unlinkSync(existing.image);
            }
            existing.image = `public/uploads/${req.file.filename}`;
        }

        if (title) existing.title = title;
        if (description) existing.description = description;

        await existing.save();

        res.status(200).json({
            success: true,
            message: "Why EV Segment updated successfully",
            data: existing,
        });
    } catch (error) {
        next(error);
    }
};


export const deleteWhySegment = async (req, res, next) => {
    try {
        const { id } = req.params;

        const existing = await WhySegmentModel.findById(id);

        if (!existing) {
            return res.status(404).json({
                success: false,
                message: "Why EV Segment not found",
            });
        }
        if (existing.image && fs.existsSync(existing.image)) {
            fs.unlinkSync(existing.image);
        }

        await existing.deleteOne();

        res.status(200).json({
            success: true,
            message: "Why EV Segment deleted successfully",
        });
    } catch (error) {
        next(error);
    }
};

export const addSegmentFleet = async (req, res, next) => {
    try {
        const { description } = req.body;

        if (!description || !req.file) {
            return res.status(400).json({
                success: false,
                message: "Image, Description are required",
            });
        }

        const imagePath = `public/uploads/${req.file.filename}`;

        const data = await SegmentFleetModel.create({
            description,
            image: imagePath,
        });

        return res.status(201).json({
            success: true,
            message: " EV Segment fleet added successfully",
            data,
        });
    } catch (error) {
        next(error);
    }
};


export const editSegmentFleet = async (req, res, next) => {
    try {
        const { description, _id } = req.body;

        const existing = await SegmentFleetModel.findById(_id);

        if (!existing) {
            return res.status(404).json({
                success: false,
                message: " EV Segment fleet not found",
            });
        }

        // Remove old image if new one is uploaded
        if (req.file) {
            if (existing.image && fs.existsSync(existing.image)) {
                fs.unlinkSync(existing.image);
            }
            existing.image = `public/uploads/${req.file.filename}`;
        }

        if (description) existing.description = description;

        await existing.save();

        res.status(200).json({
            success: true,
            message: "Segment fleet updated successfully",
            data: existing,
        });
    } catch (error) {
        next(error);
    }
};


export const deleteSegmentFleet = async (req, res, next) => {
    try {
        const { id } = req.params;

        const existing = await SegmentFleetModel.findById(id);

        if (!existing) {
            return res.status(404).json({
                success: false,
                message: "Segment fleet not found",
            });
        }
        if (existing.image && fs.existsSync(existing.image)) {
            fs.unlinkSync(existing.image);
        }

        await existing.deleteOne();

        res.status(200).json({
            success: true,
            message: "Segment fleet deleted successfully",
        });
    } catch (error) {
        next(error);
    }
};

export const addLogistic = async (req, res, next) => {
    try {
        const {
            description,
            services,
            ourProcessTitle,
            whyViyagoo,
        } = req.body;

        const servicesArr = typeof services === "string" ? JSON.parse(services) : services;
        const ourProcessTitleArr = typeof ourProcessTitle === "string" ? JSON.parse(ourProcessTitle) : ourProcessTitle;
        const whyViyagooArr = typeof whyViyagoo === "string" ? JSON.parse(whyViyagoo) : whyViyagoo;

        const whyViyagooImage = req.files?.whyViyagooImage?.[0]
            ? `public/uploads/${req.files.whyViyagooImage[0].filename}`
            : null;

        const ourProcessImage = req.files?.ourProcessImage?.[0]
            ? `public/uploads/${req.files.ourProcessImage[0].filename}`
            : null;

        let existing = await LogisticModel.findOne();

        if (!existing) {
            if (!whyViyagooImage || !ourProcessImage) {
                return res.status(400).json({
                    success: false,
                    message: "Both images are required for creating first entry",
                });
            }

            const newLogistic = await LogisticModel.create({
                description,
                services: servicesArr,
                ourProcessImage,
                ourProcessTitle: ourProcessTitleArr,
                whyViyagooImage,
                whyViyagoo: whyViyagooArr,
            });

            return res.status(201).json({
                success: true,
                message: "Logistic created successfully",
                data: newLogistic,
            });
        }

        if (whyViyagooImage) {
            if (existing.whyViyagooImage && fs.existsSync(existing.whyViyagooImage)) {
                fs.unlinkSync(existing.whyViyagooImage);
            }
            existing.whyViyagooImage = whyViyagooImage;
        }

        if (ourProcessImage) {
            if (existing.ourProcessImage && fs.existsSync(existing.ourProcessImage)) {
                fs.unlinkSync(existing.ourProcessImage);
            }
            existing.ourProcessImage = ourProcessImage;
        }
        if (description) existing.description = description;
        if (servicesArr) existing.services = servicesArr;
        if (ourProcessTitleArr) existing.ourProcessTitle = ourProcessTitleArr;
        if (whyViyagooArr) existing.whyViyagoo = whyViyagooArr;

        await existing.save();

        return res.status(200).json({
            success: true,
            message: "Logistic updated successfully",
            data: existing,
        });

    } catch (error) {
        next(error);
    }
};


export const addChaufer = async (req, res, next) => {
    try {
        let { description, mobility } = req.body;


        let existing = await ChauferModel.findOne();


        if (!existing) {
            const newData = await ChauferModel.create({
                description,
                mobility,
            });

            return res.status(201).json({
                success: true,
                message: "Chaufer details created successfully",
                data: newData,
            });
        }

        /* ---------------- UPDATE ---------------- */
        if (description) existing.description = description;
        if (mobility) existing.mobility = mobility;

        await existing.save();

        return res.status(200).json({
            success: true,
            message: "Chaufer details updated successfully",
            data: existing,
        });

    } catch (error) {
        next(error);
    }
};

export const addViyagooEdge = async (req, res, next) => {
    try {
        let { description } = req.body;


        let existing = await ChauferEdgeModel.findOne();
        if (!existing) {
            const newData = await ChauferEdgeModel.create({
                description,
            });

            return res.status(201).json({
                success: true,
                message: "Chaufer Edge details created successfully",
                data: newData,
            });
        }

        /* ---------------- UPDATE ---------------- */
        if (description) existing.description = description;

        await existing.save();

        return res.status(200).json({
            success: true,
            message: "Chaufer Edge details updated successfully",
            data: existing,
        });

    } catch (error) {
        next(error);
    }
};


export const addChauferService = async (req, res, next) => {
    try {
        const { title, points } = req.body;

        if (!title || !points || !req.file) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const parsedPoints = typeof points === "string" ? JSON.parse(points) : points;

        const data = await ChauferServiceModel.create({
            title,
            points: parsedPoints,
            image: `public/uploads/${req.file.filename}`
        });

        res.status(201).json({
            success: true,
            message: "Chaufer service added successfully",
            data
        });
    } catch (error) {
        next(error);
    }
};


export const updateChauferService = async (req, res, next) => {
    try {
        const { title, points, _id } = req.body;

        const item = await ChauferServiceModel.findById(_id);
        if (!item) return res.status(404).json({ success: false, message: "Not found" });

        // update fields
        if (title) item.title = title;
        if (points) item.points = JSON.parse(points);

        // update image & Remove old one
        if (req.file) {
            const oldPath = item.image;
            if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);

            item.image = `public/uploads/${req.file.filename}`;
        }

        await item.save();

        res.status(200).json({
            success: true,
            message: "Chaufer service updated successfully",
            data: item
        });

    } catch (error) {
        next(error);
    }
};


export const deleteChauferService = async (req, res, next) => {
    try {
        const { id } = req.params;

        const item = await ChauferServiceModel.findById(id);
        if (!item) return res.status(404).json({ success: false, message: "Not found" });

        // delete image
        if (fs.existsSync(item.image)) fs.unlinkSync(item.image);

        await item.deleteOne();

        res.status(200).json({
            success: true,
            message: "Chaufer service deleted successfully",
        });

    } catch (error) {
        next(error);
    }
};


export const addCorporate = async (req, res) => {
    try {
        const { title, description } = req.body;
        const image = req.file ? req.file.path : null;

        if (!image) {
            return res.status(400).json({ success: false, message: "Image required" });
        }

        const result = await CorporateModel.create({
            title,
            description,
            image,
        });

        return res.status(201).json({
            success: true,
            message: "Corporate created",
            data: result,
        });

    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

export const updateCorporate = async (req, res) => {
    try {
        const { title, description, _id } = req.body;
        const newImage = req.file ? req.file.path : null;

        const existing = await CorporateModel.findById(_id);

        if (!existing) {
            return res.status(404).json({ success: false, message: "Not found" });
        }

        // remove old image if new image uploaded
        if (newImage && existing.image) {
            const oldPath = path.resolve(existing.image);
            if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
            existing.image = newImage;
        }

        existing.title = title ?? existing.title;
        existing.description = description ?? existing.description;

        await existing.save();

        return res.status(200).json({
            success: true,
            message: "Corporate updated successfully",
            data: existing,
        });

    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};


export const deleteCorporate = async (req, res) => {
    try {
        const { id } = req.params;

        const existing = await CorporateModel.findById(id);

        if (!existing) {
            return res.status(404).json({ success: false, message: "Not found" });
        }

        // delete image from folder
        if (existing.image) {
            const oldPath = path.resolve(existing.image);
            if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
        }

        await existing.deleteOne();

        return res.status(200).json({
            success: true,
            message: "Corporate deleted successfully",
        });

    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};


export const addViyagooEdgeDetail = async (req, res) => {
    try {
        const { description } = req.body;
        const image = req.file ? req.file.path : null;

        if (!image) {
            return res.status(400).json({ success: false, message: "Image required" });
        }

        const result = await ChauferEdgeDetailModel.create({
            description,
            image,
        });

        return res.status(201).json({
            success: true,
            message: "Viyagoo Edge Detail created",
            data: result,
        });

    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};


export const updateViyagooEdgeDetail = async (req, res) => {
    try {
        const { description, _id } = req.body;
        const newImage = req.file ? req.file.path : null;

        const existing = await ChauferEdgeDetailModel.findById(_id);

        if (!existing) {
            return res.status(404).json({ success: false, message: "Data not found" });
        }

        // Remove old image if new one uploaded
        if (newImage && existing.image) {
            const oldPath = path.resolve(existing.image);
            if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
            existing.image = newImage;
        }

        existing.description = description ?? existing.description;

        await existing.save();

        return res.status(200).json({
            success: true,
            message: "Viyagoo Edge Detail updated",
            data: existing,
        });

    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

export const deleteViyagooEdgeDetail = async (req, res) => {
    try {
        const { id } = req.params;

        const existing = await ChauferEdgeDetailModel.findById(id);

        if (!existing) {
            return res.status(404).json({ success: false, message: "Data not found" });
        }

        // delete image
        if (existing.image) {
            const oldPath = path.resolve(existing.image);
            if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
        }

        await existing.deleteOne();

        return res.status(200).json({
            success: true,
            message: "Viyagoo Edge Detail deleted successfully",
        });

    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};


export const upsertTransportation = async (req, res) => {
    try {
        const {
            description,
            growingChallenge,
            title1,
            description1,
            title2,
            description2,
            title3,
            description3,
            title4,
            description4
        } = req.body;

        const existing = await TransportationModel.findOne();
        const files = req.files || {};

        const getImage = (field) =>
            files[field] ? files[field][0].path : null;

        const newImages = {
            image1: getImage("image1"),
            image2: getImage("image2"),
            image3: getImage("image3"),
            image4: getImage("image4"),
        };

        if (existing) {

            // replace images if new uploaded
            for (let key of ["image1", "image2", "image3", "image4"]) {
                if (newImages[key]) {
                    const oldPath = existing[key];
                    if (oldPath && fs.existsSync(oldPath)) {
                        fs.unlinkSync(oldPath);
                    }
                    existing[key] = newImages[key];
                }
            }

            existing.description = JSON.parse(description);
            existing.growingChallenge = JSON.parse(growingChallenge);

            existing.title1 = title1;
            existing.description1 = description1;
            existing.title2 = title2;
            existing.description2 = description2;
            existing.title3 = title3;
            existing.description3 = description3;
            existing.title4 = title4;
            existing.description4 = description4;

            await existing.save();

            return res.status(200).json({
                success: true,
                message: "Transportation updated successfully",
                data: existing
            });
        }

        // create new
        const created = await TransportationModel.create({
            description: JSON.parse(description),
            growingChallenge: JSON.parse(growingChallenge),
            title1,
            description1,
            title2,
            description2,
            title3,
            description3,
            title4,
            description4,
            ...newImages,
        });

        return res.status(201).json({
            success: true,
            message: "Transportation created successfully",
            data: created
        });

    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

export const addWhyTransportation = async (req, res) => {
    try {
        const { title, description } = req.body;

        if (!req.file)
            return res.status(400).json({ success: false, message: "Image is required" });

        const newData = await WhytransportationModel.create({
            image: req.file.path,
            title,
            description
        });

        return res.status(201).json({
            success: true,
            message: "Why Transportation added successfully",
            data: newData
        });

    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

export const updateWhyTransportation = async (req, res) => {
    try {
        const { _id } = req.body

        const existing = await WhytransportationModel.findById(_id);
        if (!existing)
            return res.status(404).json({ success: false, message: "Record not found" });

        if (req.file) {
            if (existing.image && fs.existsSync(existing.image)) {
                fs.unlinkSync(existing.image);
            }
            existing.image = req.file.path;
        }

        existing.title = req.body.title || existing.title;
        existing.description = req.body.description || existing.description;

        await existing.save();

        return res.status(200).json({
            success: true,
            message: "Why Transportation updated successfully",
            data: existing,
        });

    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};


export const deleteWhyTransportation = async (req, res) => {
    try {
        const { id } = req.params;

        const existing = await WhytransportationModel.findById(id);
        if (!existing)
            return res.status(404).json({ success: false, message: "Record not found" });

        if (existing.image && fs.existsSync(existing.image)) {
            fs.unlinkSync(existing.image);
        }

        await WhytransportationModel.findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
            message: "Deleted successfully"
        });

    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};


export const addBusinessTransportation = async (req, res) => {
    try {
        const { title, description } = req.body;

        if (!req.file)
            return res.status(400).json({ success: false, message: "Image is required" });

        const imagePath = "public/uploads/" + req.file.filename;

        const saveData = await BusinessTransportationModel.create({
            image: imagePath,
            title,
            description
        });

        return res.status(201).json({
            success: true,
            message: "Business Transportation added successfully",
            data: saveData
        });

    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

export const updateBusinessTransportation = async (req, res) => {
    try {
        const { _id } = req.body;

        const existing = await BusinessTransportationModel.findById(_id);
        if (!existing)
            return res.status(404).json({ success: false, message: "Record not found" });

        if (req.file) {
            const oldImageFullPath = path.join(process.cwd(), existing.image);

            if (fs.existsSync(oldImageFullPath)) {
                fs.unlinkSync(oldImageFullPath);
            }

            existing.image = "public/uploads/" + req.file.filename;
        }

        existing.title = req.body.title || existing.title;
        existing.description = req.body.description || existing.description;

        await existing.save();

        return res.status(200).json({
            success: true,
            message: "Business Transportation updated successfully",
            data: existing
        });

    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};


export const deleteBusinessTransportation = async (req, res) => {
    try {
        const { id } = req.params;

        const existing = await BusinessTransportationModel.findById(id);
        if (!existing)
            return res.status(404).json({ success: false, message: "Record not found" });

        const fullPath = path.join(process.cwd(), existing.image);

        if (fs.existsSync(fullPath)) {
            fs.unlinkSync(fullPath);
        }

        await BusinessTransportationModel.findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
            message: "Business Transportation deleted successfully"
        });

    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};


export const addFutureMobility = async (req, res) => {
    try {
        const { description } = req.body;

        if (!description)
            return res.status(400).json({ success: false, message: "Description is required" });

        const existing = await FutureMobilityModel.findOne();

        if (existing) {
            // If new image uploaded → remove old image
            if (req.file) {
                const oldImagePath = path.join(process.cwd(), existing.image);

                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }

                existing.image = "public/uploads/" + req.file.filename;
            }

            existing.description = description;

            await existing.save();

            return res.status(200).json({
                success: true,
                message: "Future mobility updated successfully",
                data: existing,
            });
        }

        // ---------- CASE: CREATE ----------
        if (!req.file)
            return res.status(400).json({ success: false, message: "Image is required" });

        const newData = await FutureMobilityModel.create({
            description,
            image: "public/uploads/" + req.file.filename,
        });

        return res.status(201).json({
            success: true,
            message: "Future mobility created successfully",
            data: newData,
        });

    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};


export const addFututreDetail = async (req, res) => {
    try {
        const { title, description } = req.body;

        if (!req.file)
            return res.status(400).json({ success: false, message: "Image is required" });

        const saveData = await FutureMobilityDetailModel.create({
            title,
            description,
            image: "public/uploads/" + req.file.filename
        });

        return res.status(201).json({
            success: true,
            message: "Future mobility detail added successfully",
            data: saveData
        });

    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

export const updateFututreDetail = async (req, res) => {
    try {
        const { _id } = req.body;

        const existing = await FutureMobilityDetailModel.findById(_id);
        if (!existing)
            return res.status(404).json({ success: false, message: "Record not found" });

        if (req.file) {
            const oldPath = path.join(process.cwd(), existing.image);
            if (fs.existsSync(oldPath)) {
                fs.unlinkSync(oldPath);
            }
            existing.image = "public/uploads/" + req.file.filename;
        }

        existing.title = req.body.title || existing.title;
        existing.description = req.body.description || existing.description;
        await existing.save();
        return res.status(200).json({
            success: true,
            message: "Future mobility detail updated successfully",
            data: existing
        });

    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};


export const deleteFututreDetail = async (req, res) => {
    try {
        const { id } = req.params;

        const existing = await FutureMobilityDetailModel.findById(id);
        if (!existing)
            return res.status(404).json({ success: false, message: "Record not found" });

        // Remove image file
        const oldPath = path.join(process.cwd(), existing.image);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);

        await FutureMobilityDetailModel.findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
            message: "Future mobility detail deleted successfully"
        });

    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

export const addBelieveTransportation = async (req, res) => {
    try {
        const { services, closingDescription, description } = req.body;
        const existing = await BelieveModel.findOne();
        let saveData;

        if (existing) {
            existing.description = description;
            existing.services = services;
            existing.closingDescription = closingDescription;

            saveData = await existing.save();

            return res.status(200).json({
                success: true,
                message: "Believe transportation updated successfully",
                data: saveData,
            });
        }

        saveData = await BelieveModel.create({
            description,
            services,
            closingDescription,
        });

        return res.status(201).json({
            success: true,
            message: "Believe transportation added successfully",
            data: saveData,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};
export const driverinquiries = async (req, res) => {
     try {
    const inquiries = await DriverInquiry.find().sort({ createdAt: -1 });
    res.json({ success: true, data: inquiries });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }



}
export const driverpagecontent = async (req, res) => {
     try {
    const content = await DriverPage.findOne();
    res.json({ success: true, data: content || {} });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }

}
export const updatedriverpage = async (req, res) => {
    try {
    const { topTitle, topDescription, bottomTitle, bottomDescription } = req.body;
    let updateData = { topTitle, topDescription, bottomTitle, bottomDescription };

    // Agar nayi image upload hui hai
    if (req.file) {
      updateData.bottomImage = req.file.path; // Cloudinary use kar rahe ho to uska URL
    }

    const updatedContent = await DriverPage.findOneAndUpdate(
      {}, updateData, { new: true, upsert: true }
    );
    res.json({ success: true, message: "Page content updated!", data: updatedContent });
  } catch (err) {
    res.status(500).json({ error: err.message });
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

export const updateAboutData = async (req, res) => {
  try {
    // find existing document
    let about = await AboutUSModel.findOne();

    // If not exists → create new
    if (!about) {
      about = new AboutUSModel();
    }

    // helper to replace image and delete old one
    const handleImageUpdate = (fieldName) => {
      if (req.files && req.files[fieldName]?.[0]) {
        const oldPath = about[fieldName];

        // delete old image if exists
        if (oldPath) {
          const fullOldPath = path.join(process.cwd(), oldPath);
          if (fs.existsSync(fullOldPath)) {
            fs.unlinkSync(fullOldPath);
          }
        }

        // set new image
        about[fieldName] = "public/uploads/" + req.files[fieldName][0].filename;
      }
    };

    // Handle images
    handleImageUpdate("whatSetImage");
    handleImageUpdate("vehicleIcon");
    handleImageUpdate("safetyIcon");
    handleImageUpdate("tripIcon");
    handleImageUpdate("tripDailyIcon");

    // Handle text fields
    about.description = req.body.description ?? about.description;
    about.subDescription = req.body.subDescription ?? about.subDescription;
    about.visionTitle = req.body.visionTitle ?? about.visionTitle;
    about.visionDesc = req.body.visionDesc ?? about.visionDesc;
    about.missionTitle = req.body.missionTitle ?? about.missionTitle;
    about.missionDesc = req.body.missionDesc ?? about.missionDesc;
    about.whatSetDescription = req.body.whatSetDescription ?? about.whatSetDescription;

    about.vehicles = req.body.vehicles ?? about.vehicles;
    about.sefety = req.body.sefety ?? about.sefety;
    about.trips = req.body.trips ?? about.trips;
    about.dailyTrip = req.body.dailyTrip ?? about.dailyTrip;

    // Save document
    await about.save();

    return res.status(200).json({
      success: true,
      message: "About section updated successfully",
      data: about
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

