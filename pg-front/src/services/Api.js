import axios from "axios";
import CONSTS from "../constants";

axios.defaults.withCredentials = true;
// User
const login = (email, password) => {
  return axios.post(CONSTS.LOGIN_URL, { email, password });
};

const logout = () => {
  return axios.post(CONSTS.LOGOUT_URL);
};

const register = (email, password) => {
  return axios.post(CONSTS.REGISTER_URL, { email, password });
};

const check = () => {
  return axios.post(CONSTS.CHECK_URL);
};

// Gallery
const galleryList = () => {
  return axios.post(CONSTS.GALLERY_URL);
};
const addImage = (data) => {
  // needs to send data
  return axios.post(CONSTS.ADD_IMAGE_URL, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
const removeImage = (imageId) => {
  return axios.post(CONSTS.REMOVE_IMAGE_URL, { imageId });
};

export default {
  check,
  login,
  logout,
  register,
  galleryList,
  addImage,
  removeImage,
};
