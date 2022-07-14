import React, {useEffect} from 'react';
import {useAppSelector} from "redux/hooks";
import {selectCurrentSong, selectSongById} from "redux/playerSlice";
import {useNavigate, useParams} from "react-router-dom";
import {SongInfoI} from "./Player.types";
import WaveForm from "./WaveForm";

interface PlayerSongPropsI {
	play: (song?: SongInfoI) => void;
}

const PlayerSong: React.FC<PlayerSongPropsI> = (props: PlayerSongPropsI) => {
	const { id } = useParams();
	const song: SongInfoI | null = useAppSelector(state => selectSongById(state, id));
	const currentSong = useAppSelector(selectCurrentSong);
	const navigate = useNavigate();


	useEffect(() => {
		if (!currentSong || !song) return;
		if (currentSong.id !== song.id) {
			navigate(`/song/${currentSong.id}`);
		}
	}, [currentSong]);

	useEffect(() => {
		if (!song) return;
		props.play(song);
	}, [])

	if (song === null) return <div>
		<h2>Song not found</h2>
	</div>

	return <div className="player-song__wrapper">
		<h2>Song page</h2>
		<div className="player-song__content">
			<img src={song.images.width500} width={500} height={500} alt="photo"/>
			<WaveForm />
		</div>
	</div>
}

export default PlayerSong;