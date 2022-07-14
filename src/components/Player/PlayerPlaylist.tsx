import React from 'react';
import {useAppSelector} from "redux/hooks";
import {selectCurrentSong, selectIsPlayingNow, selectPlaylistSongs} from "redux/playerSlice";
import {convertDurationNumberIntoString} from "utils/utils";
import {AiOutlineClockCircle, AiOutlineProfile, AiOutlineUser, AiOutlineFileImage} from "react-icons/ai";
import {FaPlay, FaPause} from "react-icons/fa"
import {SongInfoI} from "./Player.types";
import {Link, useNavigate} from "react-router-dom";


interface PlayerPlaylistPropsI {
	play: (song: SongInfoI) => void;
	pause: () => void;
}

const PlayerPlaylist: React.FC<PlayerPlaylistPropsI> = (props: PlayerPlaylistPropsI) => {
	const songs = useAppSelector(selectPlaylistSongs);
	const currentSong = useAppSelector(selectCurrentSong);
	const isPlayingNow = useAppSelector(selectIsPlayingNow);
	const navigate = useNavigate();

	const isSongPlayingNow = (song: SongInfoI): boolean => {
		if (!currentSong) return false;
		return song.id === currentSong.id && isPlayingNow;
	}

	const getSongsLis = (): JSX.Element[] => {
		const lis: JSX.Element[] = [];

		songs.forEach((item, i) => {
			lis.push(<li className="player-playlist__item" key={item.id}>
				<div className="player-playlist__item-number">
					<img src={item.images.width120} className="player-playlist__item-photo" alt="photo" width={30} height={30}/>
					{!isSongPlayingNow(item) && <FaPlay onClick={() => props.play(item)} size={30} className="player-playlist__item-play"/>}
					{isSongPlayingNow(item) && <FaPause onClick={() => props.pause()} size={30} className="player-playlist__item-play"/>}
				</div>
				<div className="player-playlist__item-name"><Link to={`/song/${item.id}`}>{item.name}</Link></div>
				<div className="player-playlist__item-artist">{item.artist}</div>
				<div className="player-playlist__item-time">{convertDurationNumberIntoString(item.duration)}</div>
			</li>)
		})

		return lis;
	}

	return <div className="player-playlist__wrapper">
		<h2>Playlist</h2>
		<div className="player-playlist">
			<ul className="player-playlist__header">
				<li><AiOutlineFileImage/></li>
				<li><AiOutlineProfile style={{marginRight: 4	}}/> TITLE</li>
				<li><AiOutlineUser style={{marginRight: 4	}}/>ARTIST</li>
				<li><AiOutlineClockCircle style={{marginRight: 4	}}/>TIME</li>
			</ul>
			<ul className="player-playlist__list">
				{getSongsLis()}
			</ul>
		</div>
	</div>
}

export default PlayerPlaylist;