import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const Spinner = ({ className }: { className?: string }) => {
	return (
		<Loader2 className={cn("mr-2 h-6 w-6 animate-spin text-primary", className)} />
	)
}

export default Spinner;