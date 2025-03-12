"use client";
import TopBar from "@/components/layout/TopBar";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { AlignCenter, ChevronDown, Plus, Search } from "lucide-react";
import { useState } from "react";
import CategoryTableWrapper from "./components/category-management/CategoryDataTableWrapper";
import CreateCategoryPopup from "./components/category-management/CreateCategoryPopup";

const ContentManagementPage = () => {
	const [activeTab, setActiveTab] = useState("Category");

	const [categorySearch, setCategorySearch] = useState("");
	const [serviceSearch, setServiceSearch] = useState("");

	const [triggerCategorySearch, setTriggerCategorySearch] = useState(false);
	// const [triggerNotificationSearch, setTriggerNotificationSearch] = useState(false);

	const [isCreateCategoryPopupOpen, setIsCreateCategoryPopupOpen] = useState(false);

	const handleTabChange = (value: string) => {
		setActiveTab(value);
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, tabType: string) => {
		if (e.key === 'Enter') {
			if (tabType === 'Category') {
				setTriggerCategorySearch(prev => !prev);
			}
			// } else if (tabType === 'Notification') {
			// 	setTriggerNotificationSearch(prev => !prev);
			// }
		}
	};

	const handleCreateCategory = () => {
		setIsCreateCategoryPopupOpen(true);
	};

	const renderFilters = () => {
		if (activeTab === "Category") {
			return (
				<>
					<div className="relative flex-1 max-w-[610px]">
						<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-input-placeholder" />
						<Input
							placeholder="Rechercher"
							className="pl-9 h-10"
							value={categorySearch}
							onChange={(e) => setCategorySearch(e.target.value)}
							onKeyDown={(e) => handleKeyDown(e, 'Category')}
						/>
					</div>
					<Button size={"sm"} onClick={handleCreateCategory}>
						<Plus className="h-4 w-4" />
						Nouvelle catégorie
					</Button>
					<CreateCategoryPopup
						open={isCreateCategoryPopupOpen}
						onClose={() => setIsCreateCategoryPopupOpen(false)}
					/>
				</>
			);
		} else if (activeTab === "Notification") {
			return (
				<>
					<div className="relative flex-1 max-w-[610px]">
						<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-input-placeholder" />
						<Input
							placeholder="Rechercher"
							className="pl-9 h-10"
							value={serviceSearch}
							onChange={(e) => setServiceSearch(e.target.value)}
							onKeyDown={(e) => handleKeyDown(e, 'service')}
						/>
					</div>
					<Button
						variant="outline"
						className="h-10 px-4 flex items-center gap-2 border border-neutral-low rounded-full"
					>
						<AlignCenter className="h-4 w-4" />
						<span>Trier par</span>
						<ChevronDown className="h-4 w-4 text-neutral-high" />
					</Button>
				</>
			);
		}
		return null;
	};

	return (
		<div className="px-5 pt-5 flex flex-col h-full w-full">
			<TopBar pageName="Gestion des contenu" />
			<div className="w-full h-full mt-4">
				<Tabs
					defaultValue="Category"
					className="w-full"
					onValueChange={handleTabChange}
					value={activeTab}
				>
					<div className="flex justify-between items-center">
						<TabsList>
							<TabsTrigger value="Category" className="cursor-pointer text-neutral-high">
								Gestion des catégories
							</TabsTrigger>
							<TabsTrigger disabled={true} value="Notification" className="cursor-pointer text-neutral-high">
								Notification
							</TabsTrigger>
							<TabsTrigger disabled={true} value="Announcement" className="cursor-pointer text-neutral-high">
								Annonces
							</TabsTrigger>
						</TabsList>

						{/* Zone des filtres qui change selon l'onglet actif */}
						<div className="inline-flex items-center gap-2">
							{renderFilters()}
						</div>
					</div>

					{activeTab === "Category" && (
						<CategoryContent
							key="Category"
							searchQuery={categorySearch}
							triggerSearch={triggerCategorySearch}
						/>
					)}

					{activeTab === "Notification" && (
						<NotificationContent
							key="Notification"
						/>
					)}
					{activeTab === "Announcement" && (
						<AnnouncementContent
							key="Announcement"
						/>
					)}
				</Tabs>
			</div>
		</div>
	);
};

const CategoryContent = ({
	searchQuery,
	triggerSearch
}: {
	searchQuery: string;
	triggerSearch: boolean
}) => {
	return (
		<div className="mt-4">
			<CategoryTableWrapper searchQuery={searchQuery} triggerSearch={triggerSearch} />
		</div>
	);
};

const NotificationContent = () => {
	return (
		<div className="mt-4">
			Notification
		</div>
	);
};

const AnnouncementContent = () => {
	return (
		<div className="mt-4">
			Annonces
		</div>
	);
};

export default ContentManagementPage;