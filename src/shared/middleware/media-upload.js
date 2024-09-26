import multer from 'multer';
import ErrorHandler from '../utils/error.handler.js';

const createMulterOptions = (maxFileSize) => {
    const storage = multer.memoryStorage();

    const fileFilter = (_req, file, cb) => {
        const isValidFileType = file.mimetype.startsWith('image') || file.mimetype.startsWith('video');
        if (isValidFileType) {
            cb(null, true);
        } else {
            cb(new ErrorHandler('Only image and video files are allowed', 400), false);
        }
    };

    return {
        storage,
        fileFilter,
        limits: { fileSize: maxFileSize }
    };
};

export const uploadSingleFile = (mediaName, maxFileSize = 5 * 1024 * 1024) => {
    if (!mediaName)
        throw new ErrorHandler('No media name is provided');

    const options = createMulterOptions(maxFileSize);
    return multer(options).single(mediaName);
};

export const uploadMixOfFiles = (arrayOfMedias, maxFileSize = 5 * 1024 * 1024) => {
    if (!arrayOfMedias || !arrayOfMedias.length)
        throw new ErrorHandler('No media names are provided');

    const options = createMulterOptions(maxFileSize);
    return multer(options).fields(arrayOfMedias);
};
