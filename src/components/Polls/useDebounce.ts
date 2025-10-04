import { useCallback, useEffect, useRef } from 'react';

export const useDebounce = (callback: () => void, delay: number) => {
	const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	// useEffect(()=> {

	// }, [callback])
	return useCallback(() => {
		if (timeoutRef.current) clearTimeout(timeoutRef.current);
		timeoutRef.current = setTimeout(callback, delay);
	}, [callback, delay]);
};
