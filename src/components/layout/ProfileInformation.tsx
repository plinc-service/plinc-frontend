import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/Avatar";

interface ProfileInformationProps {
	userImageUrl: string | null;
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
					<Avatar className="w-20 h-20">
						<AvatarImage src={userImageUrl || undefined} alt={userName || "Admin"} />
						<AvatarFallback>
							{userName
								? userName
									.trim()
									.split(" ")
									.map((part) => part[0])
									.join("")
									.slice(0, 2)
									.toUpperCase()
								: "AD"}
						</AvatarFallback>
					</Avatar>
					<p className="text-base text-primary mt-2.5">{userName}</p>
					<p className="text-sm max-w-[300px] truncate">{userEmail}</p>
				</div>
			</aside>
		</div>
	)
}

export default ProfileInformation

{/*
	import { useUpdateUser } from "@/hooks/useUser";
import { cn } from "@/lib/utils";
import { EditableField } from "../dashboard/EditableField";
import { ProfilePicture } from "../dashboard/ProfilePicture";

export const ProfileInformation = ({
	user,
	className,
	onClick,
}: {
	user: { username: string; email: string; image_url: string };
	className: string;
	onClick: () => void;
}) => {
	const { updateUser } = useUpdateUser();

	return (
		<div className={cn("z-[11] h-full", className)}>
			<aside className="flex flex-col bg-background rounded-bl-xl rounded-tl-xl items-center gap-3 px-5 py-10 h-full min-w-[360px] text-base transition-colors text-neutral-high">
				<ProfilePicture currentImage={user.image_url} />
				<div className="flex flex-col justify-center items-cente">
					<EditableField
						label="Nom"
						value={user.username}
						className="text-base text-primary mt-2.5"
						onSave={(val) => updateUser({ name: val })}
					/>
					<EditableField
						label="Email"
						value={user.email}
						className="text-sm max-w-[300px] truncate"
						onSave={(val) => updateUser({ email: val })}
					/>
				</div>
			</aside>
		</div>
	);
};
*/}