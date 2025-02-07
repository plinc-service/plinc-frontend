import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "@/services/UserService";
import { SortField, SortOrder } from "@/app/(dashboard)/(routes)/users/page";

interface UseUsersProps {
  page?: number;
  searchQuery?: string;
  sortField?: SortField;
  sortOrder?: SortOrder;
}

export const useUsers = ({ 
  page = 1, 
  searchQuery = "", 
  sortField = "date_joined", 
  sortOrder = "desc" 
}: UseUsersProps = {}) => {
  const {
    data,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ["users", page, searchQuery, sortField, sortOrder],
    queryFn: () => fetchUsers({ page, searchQuery, sortField, sortOrder })
  });

  return {
    users: data?.data ?? [],
    pagination: {
      previous: data?.previous,
      next: data?.next
    },
    loading: isLoading,
    error: error?.message,
    refetch,
  };
};
