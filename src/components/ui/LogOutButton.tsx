import { useAuth } from "@/hooks/useAuth"
import { LogOut } from "lucide-react"
import { Button } from "./Button"

const LogOutButton = () => {
	const { logout } = useAuth()

	const handleLogOut = () => {
		logout();
	}
	return (
		<Button
			onClick={handleLogOut}
			className="gap-3 text-danger px-3 py-2 text-sm hover:no-underline"
			variant={"link"}
		>
			<LogOut className="h-4 w-4" />
			Se déconnecter
		</Button>
	)
}

export default LogOutButton