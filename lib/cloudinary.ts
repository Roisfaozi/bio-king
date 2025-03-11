import { credentialsConfig } from '@/config/credentials.config';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: credentialsConfig.cloudinary.cloudName,
  api_key: credentialsConfig.cloudinary.apiKey,
  api_secret: credentialsConfig.cloudinary.apiSecret,
});

const cloudinaryDir = 'bio_king-dev';

async function cloudinaryUpload(file: any, folder?: string) {
  return new Promise((resolve, reject) => {
    let dir = cloudinaryDir;
    if (folder !== '') {
      dir = `${cloudinaryDir}/${folder}`;
    }

    cloudinary.uploader
      .upload_stream(
        { resource_type: 'image', folder: dir, public_id: 'bio' },
        onDone,
      )
      .end(file);
    function onDone(error: any, result: any) {
      if (error) {
        return reject({ success: false, error });
      }
      return resolve({ success: true, result });
    }
  });
}

export { cloudinaryUpload };
