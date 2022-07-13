export const convertDurationNumberIntoString = (duration: number) => {
	const minutes: number = Math.floor(duration / 60);
	let seconds: number | string = Math.floor(duration - (minutes * 60));

	if (String(seconds).length < 2) seconds = '0' + seconds

	return `${minutes}:${seconds}`;
}