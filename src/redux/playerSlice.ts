import { RootState } from "./store";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {SongInfoI} from "components/Player/Player.types";
import songsInfo from "songsInfo.json";

interface PlayerState {
	playlistSongs: SongInfoI[];
	isPlayingNow: boolean;
	currentSong: SongInfoI | null;
	currentTime: number;
}

const initialState: PlayerState = {
	playlistSongs: songsInfo,
	isPlayingNow: false,
	currentSong: null,
	currentTime: 0
}

export const playerSlice = createSlice({
	name: 'player',
	initialState,
	reducers: {
		setIsPlayingNow: (state, action: PayloadAction<boolean>) => {
			state.isPlayingNow = action.payload;
		},
		setCurrentSong: (state, action: PayloadAction<SongInfoI>) => {
			state.currentSong = action.payload;
		},
		setCurrentTime: (state, action: PayloadAction<number>) => {
			state.currentTime = action.payload;
		}
	}
});
export default playerSlice.reducer;

export const {setIsPlayingNow, setCurrentSong, setCurrentTime} = playerSlice.actions;

export const selectPlaylistSongs = (state: RootState) => state.player.playlistSongs;
export const selectIsPlayingNow = (state: RootState) => state.player.isPlayingNow;
export const selectCurrentSong = (state: RootState) => state.player.currentSong;
export const selectCurrentTime = (state: RootState) => state.player.currentTime;