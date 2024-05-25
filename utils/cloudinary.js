// const V2 = require("cloudinary");

// V2.config({
//   cloud_name: process.env.CLOUDNAME,
//   api_key: process.env.API_KEY,
//   api_secret: process.env.API_SECRET,
// });

// exports.uploadImageCloudinary = async (imageData) => {
//   const base64Image = imageData.toString("base64");
//   return new Promise((resolve, reject) => {
//     `data:image/png;base64,${base64Image}`,
//       { public_id: "user_image" },
//       (error, result) => {
//         if (error) {
//           reject(error);
//         } else {
//           const url = result?.secure_url;
//           resolve(url);
//         }
//       };
//   });
// };

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDNAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

exports.uploadImageCloudinary = async (imageData) => {
  const base64Image = imageData.toString("base64");
  const dataUrl = `data:image/png;base64,${base64Image}`;

  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      dataUrl,
      { public_id: "user_image" },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          const url = result?.secure_url;
          resolve(url);
        }
      }
    );
  });
};
