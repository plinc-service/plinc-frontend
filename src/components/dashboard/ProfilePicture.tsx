import { useUpdateUser } from "@/hooks/useUser";
import { UserService } from "@/services/UpdateProfile";
import axios from "axios";
import { useRef, useState } from "react";

export const ProfilePicture = ({ currentImage }: { currentImage: string }) => {
	const inputRef = useRef<HTMLInputElement>(null);
	const [img, setImg] = useState(currentImage);
	const { updateUser } = useUpdateUser();

	const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;
		const { presigned_url, public_url } = await UserService.requestPresignedUrl(file.name, "profile");
		await axios.put(presigned_url, file, {
			headers: { "Content-Type": file.type },
		});
		setImg(public_url);
		await updateUser({ image_url: public_url });
	};

	return (
		<div className="relative w-20 h-20">
			<img
				src={img}
				alt="profile"
				className="rounded-full object-cover cursor-pointer"
				width={80}
				height={80}
				onClick={() => inputRef.current?.click()}
			/>
			<input
				ref={inputRef}
				type="file"
				className="hidden"
				accept="image/*"
				onChange={handleFile}
			/>
		</div>
	);
};