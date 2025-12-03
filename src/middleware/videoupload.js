import multer from "multer";
import path from "path";
import fs from "fs";

const uploadDir = "public/uploads";
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9) + ext;
        cb(null, uniqueName);
    },
});

const fileFilter = (req, file, cb) => {
     if (
    file.mimetype.startsWith("video/") ||
    file.mimetype.startsWith("image/")
  )  {
    cb(null, true);
  }
    else cb(new Error("Only video files are allowed"), false);
};

const uploadVideo = multer({
    storage,
    fileFilter,
    limits: { fileSize: 100 * 1024 * 1024 },
});

export default uploadVideo;
