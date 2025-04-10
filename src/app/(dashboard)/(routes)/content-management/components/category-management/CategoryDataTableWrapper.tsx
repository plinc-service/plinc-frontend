import { useCategoryRequests } from "@/hooks/useCategory";
import { Category } from "@/interfaces/categoryInterface";
import { useEffect, useState } from "react";
import { CategoryDataTable } from "./CategoryDataTable";
import CategoryDetailsPopup from "./CategoryDetailsPopup";
import { CategoryColumns } from "./columns";

interface CategoryTableWrapperProps {
	searchQuery: string;
	triggerSearch: boolean;
}

const CategoryTableWrapper = ({
	searchQuery,
	triggerSearch
}: CategoryTableWrapperProps) => {
	const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
	const [isPopupOpen, setIsPopupOpen] = useState(false);

	const {
		data: categories,
		refetch,
		error,
		loading,
		setSearchQuery,
		page,
		setPage,
		totalPages,
		goToNextPage,
		goToPreviousPage,
		goToPage
	} = useCategoryRequests();

	useEffect(() => {
		setSearchQuery(searchQuery);
	}, [searchQuery, setSearchQuery]);

	useEffect(() => {
		if (searchQuery.trim() !== '') {
			refetch();
		}
	}, [triggerSearch, refetch, searchQuery]);

	const handleServiceClick = (category: Category) => {
		setSelectedCategory(category);
		setIsPopupOpen(true);
	};

	const handleClosePopup = () => {
		setIsPopupOpen(false);
	};

	return (
		<>
			<CategoryDataTable
				columns={CategoryColumns}
				data={categories}
				onClick={(item: Category) => handleServiceClick(item)}
				error={error}
				isLoading={loading}
				page={page}
				totalPages={totalPages}
				onNextPage={goToNextPage}
				onPreviousPage={goToPreviousPage}
				onPageChange={goToPage}
			/>
			<CategoryDetailsPopup
				open={isPopupOpen}
				onClose={handleClosePopup}
				refetchList={refetch}
				categoryDetails={selectedCategory}
				page={page}
				setPage={setPage}
				currentLength={categories.length}
			/>
		</>
	);
};

export default CategoryTableWrapper;