const dotenv = require('dotenv');
const cloudinary = require('cloudinary').v2;

dotenv.config({ path: './config.env' });
// Configure the Cloudinary client
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports = cloudinary;
// Define a function to upload the file to Cloudinary
// exports.uploadFileToCloudinary = async (file) => {
//   const result = await cloudinary.uploader.upload(file.path, {
//     folder: 'school-images',
//     public_id: file.originalname.split('.')[0],
//   });
//   console.log('--RESULT--', result.secure_url);
//   return result.secure_url;
// };
