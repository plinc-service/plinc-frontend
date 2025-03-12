import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import Image from "next/image";

interface ProfileInformationProps {
	userImageUrl: string;
	userName: string;
	userEmail: string;
	onClick: () => void;
	className?: string;
}


const ProfileInformation: React.FC<ProfileInformationProps> = ({
	onClick,
	userImageUrl,
	userName,
	userEmail,
	className
}) => {
	return (
		<div className={cn("z-[11] h-full", className)}>
			<aside className="flex flex-col bg-background rounded-bl-xl rounded-tl-xl items-center gap-3 px-5 py-10 h-full min-w-[360px] text-base transition-colors text-neutral-high">
				{/* Top */}
				<div className="flex w-full items-center justify-between">
					<h2>Profile</h2>
					<button className="hover:text-[#94A3B8] cursor-pointer" onClick={onClick}>
						<X />
					</button>
				</div>

				{/* Profile */}
				<div className="flex flex-col justify-center items-center">
					<Image src={userImageUrl} alt={userName} width={80} height={80} />
					<p className="text-base text-primary mt-2.5">{userName}</p>
					<p className="text-sm max-w-[300px] truncate">{userEmail}</p>
				</div>
			</aside>
		</div>
	)
}

export default ProfileInformation