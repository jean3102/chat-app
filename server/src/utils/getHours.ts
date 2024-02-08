export const getHour = () => {
	// Get the current date and time
	const currentDate = new Date();

	// Get the current hour (1-12) and AM/PM
	const currentHour = currentDate.getHours() % 12 || 12; // Convert 0 to 12
	const format = currentDate.getHours() < 12 ? 'AM' : 'PM';

	// Get the current minute and second
	const currentMinute = currentDate.getMinutes();
	const currentSecond = currentDate.getSeconds();

	// Format the hour, minute, and second
	const formattedHour = currentHour < 10 ? '0' + currentHour : currentHour;
	const formattedMinute =
		currentMinute < 10 ? '0' + currentMinute : currentMinute;
	const formattedSecond =
		currentSecond < 10 ? '0' + currentSecond : currentSecond;
	return (
		formattedHour + ':' + formattedMinute + ':' + formattedSecond + ' ' + format
	);
};
