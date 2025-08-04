import { useEffect, useState } from 'react';

export const useMobile = () => {
	const [isMobile, setIsMobile] = useState<boolean>(false);

	useEffect(() => {
		if (typeof window !== 'undefined') {
			setIsMobile(window.innerWidth <= 600);
		}
		const handleResize = () => {
			setIsMobile(window.innerWidth <= 600);
		};

		window.addEventListener('resize', handleResize);

		return () => window.removeEventListener('resize', handleResize);
	}, []);
	return isMobile;
};
