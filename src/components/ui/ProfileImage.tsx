import Image from "next/image";
import { useState } from "react";

interface ProfileImageProps {
	src: string;
	alt: string;
}

const ProfileImage = ({ src, alt }: ProfileImageProps) => {
	const [imgSrc, setImgSrc] = useState(src);
	const [isLoading, setIsLoading] = useState(true);
	const [hasError, setHasError] = useState(false);

	return (
		<>
			{isLoading && <div className="animate-pulse bg-gray-200 rounded-full w-8 h-8" />}
			<Image
				src={imgSrc}
				alt={alt}
				width={32}
				height={32}
				className={`rounded-full ${isLoading ? 'hidden' : 'block'}`}
				onLoadingComplete={() => setIsLoading(false)}
				onError={() => {
					setImgSrc("/default-avatar.png");
					setHasError(true);
					setIsLoading(false);
				}}
			/>
		</>
	);
}

export default ProfileImage;