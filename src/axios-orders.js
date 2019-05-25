import axios from "axios";

const instance = axios.create({
  baseURL: "https://burger-builder-761b3.firebaseio.com/"
});
instance.interceptors.request.use(req => req, err => Promise.reject(err));

instance.interceptors.response.use(res => res, err => Promise.reject(err));

export default instance;
