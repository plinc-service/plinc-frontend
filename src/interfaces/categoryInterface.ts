export interface Category {
  id: number;
  subcategories: [];
  name: string;
  color: string;
  created_at: string;
  updated_at: string;
}

export interface CategoryFormType {
  name: string;
  color: string;
}

export interface GetCategoriesResponse {
  success: boolean;
  data: Category;
  previous: string | null;
  next: string | null;
  total_pages: number;
}

export interface CategoryDetailsPopupProps {
  open: boolean;
  onClose: () => void;
  categoryDetails: Category | null;
  refetchList: () => void;
}
