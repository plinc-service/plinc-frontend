"use client";
import { createContext, useContext, useState } from "react";

interface AuthContextType {
	email: string;
	setEmail: (email: string) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [email, setEmail] = useState("");
	return (
		<AuthContext.Provider value={{ email, setEmail }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuthContext = () => {
	const context = useContext(AuthContext);

	if (context === null) {
		throw new Error("useAuthContext doit être utilisé à l'intérieur d'un AuthProvider");
	}

	return context;
};