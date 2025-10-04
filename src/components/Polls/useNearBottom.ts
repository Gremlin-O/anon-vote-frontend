'use client';
import { useEffect, useRef, useState, useCallback, RefCallback } from 'react';

interface IUseNearBottomOptions {
	threshold?: number;
	rootMargin?: string;
	enabled?: boolean;
}

interface IUseNearBottomReturn {
	isNearBottom: boolean;
	triggerRef: RefCallback<HTMLElement>;
	setIsNearBottom: (state: boolean) => void;
}

export const useNearBottom = (options: IUseNearBottomOptions = {}): IUseNearBottomReturn => {
	const { threshold = 0.1, rootMargin = '100px' } = options;

	const [isNearBottom, setIsNearBottom] = useState<boolean>(false);

	const observerRef = useRef<IntersectionObserver | null>(null);

	const triggerRef: RefCallback<HTMLElement> = useCallback(
		(node: HTMLElement | null) => {
			if (observerRef.current) {
				observerRef.current.disconnect();
				observerRef.current = null;
			}

			if (node) {
				const observer = new IntersectionObserver(
					([entry]) => {
						setIsNearBottom(entry.isIntersecting);
						console.log([entry]);
					},
					{ threshold, rootMargin }
				);

				observer.observe(node);
				observerRef.current = observer;
			}
		},
		[threshold, rootMargin]
	);

	useEffect(() => {
		return () => {
			if (observerRef.current) {
				observerRef.current.disconnect();
			}
		};
	}, []);

	return { isNearBottom, triggerRef, setIsNearBottom };
};
