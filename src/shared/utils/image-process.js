import sharp from 'sharp';

/**
 * Resizes an image to 500x500 and converts it to JPEG format.
 * @param {Buffer} image The image buffer to be resized.
 * @returns {Promise<Buffer>} The resized image buffer.
 */
export const resizeProfileImage = async (imageBuffer) => {
    return sharp(imageBuffer)
        .resize(500, 500)
        .toFormat('jpeg')
        .jpeg()
        .toBuffer();
};
