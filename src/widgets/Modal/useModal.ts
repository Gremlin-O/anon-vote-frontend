import { useCallback, useEffect, useState } from 'react';

export const useModal = (modalHash: string) => {
	const [isShown, setIsShown] = useState(false);

	const show = useCallback(() => {
		setIsShown(true);
		window.location.hash = modalHash;
	}, [setIsShown, modalHash]);

	const hide = useCallback(() => {
		setIsShown(false);
		window.location.hash = '';
	}, [setIsShown]);

	const toggle = useCallback(() => {
		if (isShown) {
			hide();
		} else {
			show();
		}
	}, [isShown, hide, show]);

	useEffect(() => {
		if (window.location.hash === '#' + modalHash) {
			show();
		}
	}, [show, modalHash]);

	return {
		show,
		hide,
		toggle,
		isShown,
	};
};
