import { SortField, SortOrder } from "@/app/(dashboard)/(routes)/users/page";
import { Transaction } from "@/interfaces/transactionInterface";
import { User, UserResponse } from "@/interfaces/userInterface";
import { Service } from "@/types/services";
import Axios from "@/utils/config-axios";

interface FetchUsersParams {
  page?: number;
  pageSize?: number;
  searchQuery?: string;
  sortField?: SortField;
  sortOrder?: SortOrder;
}

export const fetchUsers = async ({
  page = 1,
  pageSize = 10,
  searchQuery = "",
  sortField = "date_joined",
  sortOrder = "desc",
}: FetchUsersParams = {}): Promise<UserResponse> => {
  try {
    const params: Record<string, string | number> = {
      page,
      page_size: pageSize,
    };

    if (sortField) {
      params.sort_field = sortField;
      params.sort_order = sortOrder;
    }

    if (searchQuery) {
      params.query = searchQuery;
    }

    const response = await Axios.get("/users", { params });
    
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

export const fetchUserTransactions = async (
  id: string
): Promise<Transaction[]> => {
  try {
    const response = await Axios.get(`/administrator/transactions`, {
      params: {
        user: id,
        page: 1,
        page_size: 10,
        sort_field: "created_at",
        sort_order: "desc",
      },
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
    console.error(
      "Erreur lors de la récupération des services de l'utilisateur :",
      error
    );
    throw error;
  }
};

export interface TransactionsResponse {
  data: Transaction[];
  total_pages: number;
  current_page: number;
}

export const fetchUserTransactionsHistory = async (
  id: string,
  page: number = 1,
  pageSize: number = 10,
  sortField: string = "created_at",
  sortOrder: "asc" | "desc" = "desc",
  searchQuery: string = "",
  transactionType: string | null = null
): Promise<TransactionsResponse> => {
  try {
    const params: Record<string, string | number> = {
      user: id,
      page,
      page_size: pageSize,
      sort_field: sortField,
      sort_order: sortOrder
    };
    
    if (searchQuery) {
      params.query = searchQuery;
    }
    
    if (transactionType) {
      if (transactionType === "paiement") {
        params.type = "payment";
      } else if (transactionType === "retrait") {
        params.type = "retrait";
      } else if (transactionType === "depot") {
        params.type = "depot";
      } else {
        params.type = transactionType;
      }
    }
    
    const response = await Axios.get(`/transactions`, { params });
    
    return {
      data: response.data.data as Transaction[],
      total_pages: response.data.total_pages || 1,
      current_page: response.data.current_page || 1
    };
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des transactions de l'utilisateur :",
      error
    );
    throw error;
  }
};
