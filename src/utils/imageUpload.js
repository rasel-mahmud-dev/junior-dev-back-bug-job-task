const cloudinary = require('cloudinary').v2;

import settings from '../../settings.json';

cloudinary.config({
  cloud_name: settings.CLOUDINARY_CLOUD_NAME,
  api_key: settings.CLOUDINARY_API_KEY,
  api_secret: settings.CLOUDINARY_API_SECRET,
  secure: true
});


function uploadImage(filePath) {
  return new Promise((resolve, _) => {
    try {
      let result = cloudinary.uploader.upload(filePath, {use_filename: true, overwrite: true});
      resolve(result);
    } catch (ex) {
      resolve(null);
    }
  });
}

export default uploadImage;
