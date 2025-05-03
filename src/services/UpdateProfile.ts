import axios from "axios";

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}`;

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
