import { UserResponse } from "@/interfaces/userInterface";
import Axios from "@/utils/config-axios";

export const fetchUsers = async (page = 1): Promise<UserResponse> => {
  try {
    const response = await Axios.get("/users", {
      params: { page },
    });
    return response.data as UserResponse;
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs :", error);
    throw error;
  }
};
