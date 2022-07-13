import React, {useRef} from 'react';
import './Player.scss';
import PlayerPlaylist from "./PlayerPlaylist";
import {useAppDispatch, useAppSelector} from "redux/hooks";
import {
	selectCurrentSong,
	setCurrentSong,
	setCurrentTime,
	setIsPlayingNow
} from "redux/playerSlice";
import {SongInfoI} from "./Player.types";
import PlayerControl from "./PlayerControl";


const Player: React.FC = () => {
	const currentAudio = useRef<HTMLAudioElement>();
	const isAudioPlayPressed = useRef<boolean>(false);
	const currentSong = useAppSelector(selectCurrentSong);
	const dispatch = useAppDispatch();

	const seekTime = (t: number) => {
		if (!currentAudio.current) return;
		currentAudio.current.currentTime = t;
	}

	const pause = () => {
		if (!currentAudio.current) return;
		currentAudio.current.pause();
		dispatch(setIsPlayingNow(false));
	}

	const onAudioTimeUpdate = () => {
		if (!currentAudio.current) return;
		dispatch(setCurrentTime(currentAudio.current.currentTime));
	}

	const audioOnCanPlay = (e: Event) => {
		if (!currentAudio.current) return;
		currentAudio.current.play();
		currentAudio.current.addEventListener('timeupdate', onAudioTimeUpdate);
		isAudioPlayPressed.current = false;
		dispatch(setIsPlayingNow(true));
	}

	const playNewSong = (song: SongInfoI): void => {
		if (isAudioPlayPressed.current) return;
		isAudioPlayPressed.current = true;
		if (currentAudio.current) {
			pause();
			currentAudio.current.removeEventListener('canplay', audioOnCanPlay);
			currentAudio.current.removeEventListener('timeupdate', onAudioTimeUpdate);
			delete currentAudio.current;
		}
		const audio = new Audio(song.url);
		currentAudio.current = audio;
		dispatch(setCurrentSong(song));
		dispatch(setCurrentTime(0));
		audio.addEventListener('canplay', audioOnCanPlay);
	}

	const continuePlaying = () => {
		if (!currentAudio.current) return;
		currentAudio.current.play();
		dispatch(setIsPlayingNow(true));
	}

	const play = (song?: SongInfoI): void => {
		if (!song && currentAudio.current) {
			continuePlaying();
			return;
		}
		if (song && currentSong && currentSong.id === song.id) {
			continuePlaying();
			return;
		}

		if (song) playNewSong(song);
	}

	return <div className="player-wrapper">
		<div className="player">
			<PlayerPlaylist play={play} pause={pause}/>
			<PlayerControl seek={seekTime} play={play} pause={pause}/>
		</div>
	</div>
}

export default Player;