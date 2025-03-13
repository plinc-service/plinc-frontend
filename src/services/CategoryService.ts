import {
  Category,
  CategoryFormType,
  GetCategoriesResponse,
} from "@/interfaces/categoryInterface";
import Axios from "@/utils/config-axios";
import axios from "axios";
import Cookies from "js-cookie";

export const CategoryService = {
  getCategories: async ({
    page = 1,
    page_size = 8,
    query = "",
  }: {
    page?: number;
    page_size?: number;
    query?: string;
  }): Promise<GetCategoriesResponse> => {
    try {
      const response = await Axios.get("/categories", {
        params: {
          page,
          page_size,
          query,
        },
      });
      return response.data as GetCategoriesResponse;
    } catch (error) {
      throw error;
    }
  },
  createCategory: async (data: CategoryFormType) => {
    try {
      const token = Cookies.get("auth-token");
      const url = `${process.env.NEXT_PUBLIC_API_URL}/prestataire/categories`;
      const response = await axios.post(url, data, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      return response.data as Category;
    } catch (error) {
      throw error;
    }
  },
  deleteCategory: async (id: string) => {
    try {
      const token = Cookies.get("auth-token");
      const url = `${process.env.NEXT_PUBLIC_API_URL}/prestataire/categories/${id}`;
      const response = await axios.delete(url, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      return response.data as Category;
    } catch (error) {
      throw error;
    }
  },
  updateCategory: async (id: string, data: CategoryFormType) => {
    try {
      const token = Cookies.get("auth-token");
      const url = `${process.env.NEXT_PUBLIC_API_URL}/prestataire/categories/${id}`;
      const response = await axios.put(url, data, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      return response.data as Category;
    } catch (error) {
      throw error;
    }
  },
};
