import cloudinary from "cloudinary";

class ImageServices {
  async upload(image, path) {
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.CLOUD_API_KEY,
      api_secret: process.env.CLOUD_API_SECRET,
      secure: true,
    });
    const result = await new Promise((resolve, reject) => {
      cloudinary.v2.uploader
        .upload_stream(
          {
            resource_type: "image",
            public_id: path,
            format: "png",
          },
          (err, result) => {
            if (err) {
              console.error(err);
              reject(err);
            } else {
              resolve(result);
            }
          }
        )
        .end(image);
    });
    return result.secure_url;
  }
}

export default new ImageServices();
