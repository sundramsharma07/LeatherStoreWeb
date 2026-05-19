import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

// Configure Cloudinary using separate env variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Uploads a local file to Cloudinary and returns the result object.
 * @param {string} filePath - Path to the local file.
 * @param {string} folder - Destination folder on Cloudinary.
 * @returns {Promise<object>}
 */
export const uploadToCloudinary = (filePath, folder = 'leathercraft') => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      filePath,
      { folder },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
  });
};

/**
 * Extracts the public ID from a Cloudinary URL.
 * @param {string} url - The full Cloudinary URL.
 * @returns {string|null}
 */
export const extractPublicId = (url) => {
  if (!url || !url.includes('res.cloudinary.com')) return null;
  
  const parts = url.split('/upload/');
  if (parts.length > 1) {
    // Form: v12345678/folder/filename.jpg
    const pathAfterUpload = parts[1];
    // Remove the version segment (e.g. v12345678/)
    const withoutVersion = pathAfterUpload.replace(/^v\d+\//, '');
    // Remove file extension (e.g. .jpg)
    return withoutVersion.replace(/\.[^/.]+$/, '');
  }
  return null;
};

/**
 * Deletes a file from Cloudinary using its URL.
 * @param {string} url - Full URL of the asset to delete.
 * @returns {Promise<object>}
 */
export const deleteFromCloudinary = (url) => {
  return new Promise((resolve, reject) => {
    const publicId = extractPublicId(url);
    if (!publicId) {
      return resolve({ result: 'not_cloudinary' });
    }
    cloudinary.uploader.destroy(publicId, (error, result) => {
      if (error) return reject(error);
      resolve(result);
    });
  });
};
