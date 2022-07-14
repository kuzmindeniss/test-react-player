import React, {useEffect} from 'react';
import {useAppSelector} from "redux/hooks";
import {selectCurrentSong} from "redux/playerSlice";
import {SongInfoI} from "./Player.types";
import WaveForm from "./WaveForm";

interface PlayerSongPropsI {
	play: (song?: SongInfoI) => void;
}

const PlayerSong: React.FC<PlayerSongPropsI> = (props: PlayerSongPropsI) => {
	const currentSong = useAppSelector(selectCurrentSong);

	useEffect(() => {
		if (!currentSong) return;
		props.play(currentSong);
	}, [])

	if (currentSong === null) return <div>
		<h2>Not playing now</h2>
	</div>

	return <div className="player-song__wrapper">
		<h2>Song page</h2>
		<div className="player-song__content">
			<img src={currentSong.images.width500} width={500} height={500} alt="photo"/>
			<WaveForm />
		</div>
	</div>
}

export default PlayerSong;