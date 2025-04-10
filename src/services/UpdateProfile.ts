import axios from "axios";

const baseUrl = "https://api-plinc.gini-africa.com/";

export const UserService = {
  requestPresignedUrl: async (filename: string, folder: string) => {
    const response = await axios.post(baseUrl + "prestataire/upload/file", {
      filename,
      folder,
    });
    return response.data;
  },

  updateUser: async (data: {
    name?: string;
    email?: string;
    image_url?: string;
  }) => {
    const response = await axios.put(baseUrl + "prestataire/profile", data);
    return response.data;
  },
};
