import TopBar from "@/components/layout/TopBar"
import ServicesTableWrapper from "./components/ServicesTableWrapper"

const ServicesPage = () => {
	return (
		<div className="px-5 pt-5 flex flex-col h-full w-full">
			<TopBar pageName="Services" />
			<div className="w-full h-full mt-4">
				<ServicesTableWrapper />
			</div>
		</div>
	)
}

export default ServicesPage