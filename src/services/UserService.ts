import { User, UserResponse, Service } from "@/interfaces/userInterface";
import { Transaction } from "@/interfaces/transactionInterface";
import { SortField, SortOrder } from "@/app/(dashboard)/(routes)/users/page";
import Axios from "@/utils/config-axios";

interface FetchUsersParams {
  page?: number;
  searchQuery?: string;
  sortField?: SortField;
  sortOrder?: SortOrder;
}

export const fetchUsers = async ({
  page = 1,
  searchQuery = "",
  sortField = "date_joined",
  sortOrder = "desc",
}: FetchUsersParams = {}): Promise<UserResponse> => {
  try {
    const response = await Axios.get("/users", {
      params: {
        page,
        search: searchQuery,
        ordering: `${sortOrder === "desc" ? "-" : ""}${sortField}`,
      },
    });
    return response.data as UserResponse;
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs :", error);
    throw error;
  }
};

export const fetchUserById = async (id: string): Promise<User> => {
  try {
    const response = await Axios.get(`/user/${id}`);
    return response.data.data as User;
  } catch (error) {
    console.error("Erreur lors de la récupération de l'utilisateur :", error);
    throw error;
  }
};

export const fetchUserTransactions = async (id: string): Promise<Transaction[]> => {
  try {
    const response = await Axios.get(`/administrator/transactions`, {
      params: {
        user: id,
        page: 1,
        page_size: 10,
        sort_field: "created_at",
        sort_order: "desc"
      }
    });
    return response.data.data as Transaction[];
  } catch (error) {
    console.error("Erreur lors de la récupération des transactions :", error);
    throw error;
  }
};

export const fetchUserServices = async (id: string): Promise<Service[]> => {
  try {
    const response = await Axios.get(`/user/${id}/services`);
    return response.data.data as Service[];
  } catch (error) {
    console.error("Erreur lors de la récupération des services de l'utilisateur :", error);
    throw error;
  }
};
