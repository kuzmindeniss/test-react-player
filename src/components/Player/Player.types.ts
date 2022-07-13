export interface SongInfoI {
	id: number;
	name: string;
	url: string;
	artist: string;
	duration: number;
	images: {
		"width120": string;
		"width500": string;
	}
}