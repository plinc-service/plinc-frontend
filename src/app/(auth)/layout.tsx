export default function LoginLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<main className="flex items-center justify-center h-screen bg-primary">
			{children}
		</main>
	);
}