import React, {useEffect, useMemo, useRef} from 'react';
import './Player.scss';
import PlayerPlaylist from "./PlayerPlaylist";
import {useAppDispatch, useAppSelector} from "redux/hooks";
import {
	selectCurrentSong, selectPlaylistSongs,
	setCurrentSong,
	setCurrentTime,
	setIsPlayingNow
} from "redux/playerSlice";
import {SongInfoI} from "./Player.types";
import PlayerControl from "./PlayerControl";
import _ from "lodash";
import {Route, Routes} from "react-router-dom";
import PlayerSong from "./PlayerSong";
import PlayerHeader from "./PlayerHeader";

const Player: React.FC = () => {
	const currentAudio = useRef<HTMLAudioElement>();
	const isAudioPlayPressed = useRef<boolean>(false);
	const currentSong = useAppSelector(selectCurrentSong);
	const playlistSongs = useAppSelector(selectPlaylistSongs);
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

	const throttledOnAudioTimeUpdate = useMemo(
		() => _.throttle(onAudioTimeUpdate, 800),
		[]);

	const audioOnCanPlay = (e: Event) => {
		if (!currentAudio.current) return;
		currentAudio.current.play();
		currentAudio.current.addEventListener('timeupdate', throttledOnAudioTimeUpdate);
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
		audio.addEventListener('error', (e) => {
			console.log(`error`);
		});
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

	const nextTrack = (songs: SongInfoI[]  = playlistSongs) => {
		if (!currentSong) return;
		let idx = songs.indexOf(currentSong) + 1;
		if (idx >= songs.length) idx = 0;
		play(songs[idx]);
	}

	const prevTrack = (songs: SongInfoI[] = playlistSongs) => {
		if (!currentSong) return;
		let idx = songs.indexOf(currentSong) - 1;
		if (idx < 0) idx = songs.length - 1;
		play(songs[idx]);
	}

	useEffect(() => {
		return () => {
			throttledOnAudioTimeUpdate.cancel();
		}
	}, []);

	return <div className="player-wrapper">
		<div className="player">
			<PlayerHeader/>
			<Routes>
				<Route path="/" element={<PlayerPlaylist play={play} pause={pause}/>} />
				<Route path="/song/:id" element={<PlayerSong play={play}/>} />
				<Route path="*" element={<PlayerPlaylist play={play} pause={pause}/>} />
			</Routes>
			<PlayerControl prev={prevTrack} next={nextTrack} seek={seekTime} play={play} pause={pause}/>
		</div>
	</div>
}

export default Player;