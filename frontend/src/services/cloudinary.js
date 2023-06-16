import axios from "axios";

const uploadImage = async (image) => {
  try {
    const payload = new FormData();
    payload.append("file", image);
    payload.append("upload_preset", "chat-app");
    payload.append("cloud_name", "vetri");
    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/vetri/image/upload/",
      payload
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};

export default uploadImage;
