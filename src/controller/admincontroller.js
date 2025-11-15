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

        const images = req.files.map((file) => `/uploads/${file.filename}`);

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
            const newImage = `/uploads/${req.file.filename}`;
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