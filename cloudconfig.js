const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.cloud_API_KEY,
    api_secret: process.env.cloud_API_SECRET

})

const storage = new CloudinaryStorage({  //folder
  cloudinary: cloudinary,
  params: {
    folder: 'WanderLust_dev',
    allowedFormats: async (req, file) => ['png',"jpeg", "jpg","avif"] // supports promises as well
  },
});
module.exports = {
    cloudinary,
    storage,
}