import cloudinary from '../config/cloudinary.js';
import ErrorHandler from '../utils/error.handler.js';

const uploadToCloudinary = async (file, resourceType, folder) => {
    if (!file)
        throw new ErrorHandler('No file is provided', 500, null, true);

    if (!resourceType || !['image', 'video'].includes(resourceType))
        throw new ErrorHandler('No valid resource type is provided', 500, null, true);

    const uploadResult = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
            {
                folder,
                resource_type: resourceType,
            },
            (error, result) => {
                if (error) return reject(error);
                return resolve(result);
            }
        ).end(file);
    });

    return uploadResult.public_id;
};

export const uploadFiles = async (files, resourceType, folder) => {
    if (!files)
        throw new ErrorHandler('No files are provided', 500, null, true);

    if (!resourceType || !['image', 'video'].includes(resourceType))
        throw new ErrorHandler('No valid resource type is provided', 500, null, true);

    const filesArray = Array.isArray(files) ? files : [files];

    const uploadPromises = filesArray.map(file => uploadToCloudinary(file, resourceType, folder));

    return Promise.allSettled(uploadPromises);
};

export const deleteFile = async (publicId, resourceType) => {
    if (!publicId)
        throw new ErrorHandler('No public id is provided', 500, null, true);

    if (!resourceType || !['image', 'video'].includes(resourceType))
        throw new ErrorHandler('No valid resource type is provided', 500, null, true);

    await cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
};
