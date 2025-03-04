import { AuthProvider } from "@/components/contexts/AuthContext";

export default function LoginLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<AuthProvider>
			<main className="flex items-center justify-center h-screen bg-primary">
				{children}
			</main>
		</AuthProvider>
	);
}