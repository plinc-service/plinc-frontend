import { cn } from "@/lib/utils";
import { Check, Pencil, X } from "lucide-react";
import { useState } from "react";

export const EditableField = ({
	label,
	value,
	onSave,
	className,
}: {
	label: string;
	value: string;
	onSave: (val: string) => void;
	className?: string;
}) => {
	const [editing, setEditing] = useState(false);
	const [currentValue, setCurrentValue] = useState(value);

	const save = () => {
		onSave(currentValue);
		setEditing(false);
	};

	return (
		<div className={cn("flex justify-center items-center group gap-1", className)}>
			<span className="font-medium">{label}:</span>
			{editing ? (
				<>
					<input
						className="border-b border-gray-300 focus:outline-none px-1"
						value={currentValue}
						onChange={(e) => setCurrentValue(e.target.value)}
					/>
					<Check className="h-4 w-4 text-green-600 cursor-pointer" onClick={save} />
					<X
						className="h-4 w-4 text-red-500 cursor-pointer"
						onClick={() => {
							setEditing(false);
							setCurrentValue(value);
						}}
					/>
				</>
			) : (
				<>
					<span>{value}</span>
					<Pencil className="h-4 w-4 text-gray-400 group-hover:inline hidden cursor-pointer" onClick={() => setEditing(true)} />
				</>
			)}
		</div>
	);
};