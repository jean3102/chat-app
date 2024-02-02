export const inputValidation = (input: HTMLInputElement) => {
	input.style.outline = '1px solid red';
	setTimeout(() => {
		if (input) input.style.outline = '1px solid gray';
	}, 2000);
};
