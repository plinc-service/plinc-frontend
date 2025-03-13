import { Button } from "@/components/ui/Button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CategoryTablePaginationProps<TData> {
	page: number;
	totalPages: number;
	onPreviousPage: () => void;
	onNextPage: () => void;
	onPageChange: (page: number) => void;
	data: TData[];
}

const CategoryTablePagination = <TData,>({
	page,
	totalPages,
	onPreviousPage,
	onNextPage,
	data,
	onPageChange,
}: CategoryTablePaginationProps<TData>) => {

	const getPaginationItems = () => {
		const items = [];
		const maxVisiblePages = 5;

		if (totalPages <= maxVisiblePages) {
			for (let i = 1; i <= totalPages; i++) {
				items.push(i);
			}
		} else {
			items.push(1);

			const startPage = Math.max(2, page - 1);
			const endPage = Math.min(totalPages - 1, page + 1);

			if (startPage > 2) {
				items.push('...');
			}

			for (let i = startPage; i <= endPage; i++) {
				items.push(i);
			}

			if (endPage < totalPages - 1) {
				items.push('...');
			}

			if (totalPages > 1) {
				items.push(totalPages);
			}
		}

		return items;
	};

	const paginationItems = getPaginationItems();

	return (
		<div className="flex items-center justify-between py-4">
			<Button
				variant="ghost"
				size="sm"
				className="h-8 text-sm text-neutral-high"
				onClick={onPreviousPage}
				disabled={page === 1 || !data.length}
			>
				<ChevronLeft className="mr-1 h-4 w-4 text-neutral-high" />
				Précédent
			</Button>

			<div className="flex items-center gap-1">
				{paginationItems.map((item, index) => (
					typeof item === 'number' ? (
						<Button
							key={`page-${item}`}
							variant={page === item ? "default" : "ghost"}
							size="icon"
							className={`h-8 w-8 text-sm ${page === item
								? "bg-primary/10 hover:bg-primary/20 text-primary"
								: "text-muted-foreground hover:text-foreground"
								}`}
							onClick={() => onPageChange(item)}
						>
							{item}
						</Button>
					) : (
						<span key={`ellipsis-${index}`} className="px-2">...</span>
					)
				))}
			</div>

			<Button
				variant="ghost"
				size="sm"
				className="h-8 text-sm text-neutral-high"
				onClick={onNextPage}
				disabled={page === totalPages || !data.length}
			>
				Suivant
				<ChevronRight className="ml-1 h-4 w-4 text-neutral-high" />
			</Button>
		</div>
	)
}

export default CategoryTablePagination