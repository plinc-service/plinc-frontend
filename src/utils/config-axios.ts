import axios from "axios";
const Axios = axios.create({
  baseURL: "https://api-plinc.gini-africa.com/administrator",
});

Axios.interceptors.request.use((request) => {
  const accessToken = "f9ed23adfefef33db200ffd8dc626c9e6a5c08ad";
  if (accessToken) {
    request.headers.Authorization = "Token " + accessToken;
  }
  return request;
});

export default Axios;
