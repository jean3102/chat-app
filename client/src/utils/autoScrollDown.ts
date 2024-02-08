export const autoScrollDown = (element: HTMLUListElement) => {
	setTimeout(() => {
		if (element)
			element.scrollIntoView({
				behavior: 'smooth',
				block: 'end',
			});
	}, 0);
};
