import fs from "fs";
import path from "path";

export const deleteImage = (imagePath) => {
    if (!imagePath) return;

    // remove leading slash if any
    const cleanPath = imagePath.startsWith("/")
        ? imagePath.slice(1)
        : imagePath;

    const fullPath = path.join(process.cwd(), cleanPath);

    if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath);
    }
};
