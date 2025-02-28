"use client"

import { AuthService } from '@/services/AuthService';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Spinner from '../ui/Spinner';

interface AuthWrapperProps {
	children: React.ReactNode;
}

export const AuthWrapper = ({ children }: AuthWrapperProps) => {
	const [isLoading, setIsLoading] = useState(true);
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const router = useRouter();

	useEffect(() => {
		const checkAuth = async () => {
			const hasToken = !!AuthService.getToken();

			if (!hasToken) {
				router.push('/login');
				return;
			}

			setIsAuthenticated(true);
			setIsLoading(false);
		};

		checkAuth();
	}, [router]);

	if (isLoading) {
		return (
			<div className="flex items-center justify-center min-h-screen bg-white">
				<div className="text-center">
					<Spinner />
				</div>
			</div>
		);
	}

	return isAuthenticated ? <>{children}</> : null;
};