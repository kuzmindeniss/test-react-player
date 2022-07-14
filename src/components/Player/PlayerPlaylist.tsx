import React, {useState} from 'react';
import {useAppSelector} from "redux/hooks";
import {selectCurrentSong, selectIsPlayingNow, selectPlaylistSongs} from "redux/playerSlice";
import {convertDurationNumberIntoString} from "utils/utils";
import {AiOutlineClockCircle, AiOutlineProfile, AiOutlineUser, AiOutlineFileImage} from "react-icons/ai";
import {FaPlay, FaPause} from "react-icons/fa"
import {SongInfoI} from "./Player.types";
import {Link, useNavigate} from "react-router-dom";
import {TbSortDescending} from "react-icons/tb";


interface PlayerPlaylistPropsI {
	play: (song: SongInfoI) => void;
	pause: () => void;
}

const PlayerPlaylist: React.FC<PlayerPlaylistPropsI> = (props: PlayerPlaylistPropsI) => {
	const songs = useAppSelector(selectPlaylistSongs);
	const currentSong = useAppSelector(selectCurrentSong);
	const isPlayingNow = useAppSelector(selectIsPlayingNow);
	const [sort, setSort] = useState<string>();

	const isSongPlayingNow = (song: SongInfoI): boolean => {
		if (!currentSong) return false;
		return song.id === currentSong.id && isPlayingNow;
	}

	const getFilteredSongs = (): SongInfoI[] => {
		let sortedSongs = [...songs];
		console.log(sort);
		if (sort === 'title') {
			sortedSongs = sortedSongs.sort((a, b) => {
				return a.name > b.name ? 1 : -1;
			});
		}
		if (sort === 'artist') {
			sortedSongs = sortedSongs.sort((a, b) => {
				return a.artist > b.artist ? 1 : -1;
			});
		}
		if (sort === 'time') {
			sortedSongs = sortedSongs.sort((a, b) => {
				return a.duration > b.duration ? 1 : -1;
			});
		}

		return sortedSongs;
	}

	const getSongsLis = (): JSX.Element[] => {
		const lis: JSX.Element[] = [];

		getFilteredSongs().forEach((item, i) => {
			lis.push(<li className="player-playlist__item" key={item.id}>
				<div className="player-playlist__item-number">
					<img src={item.images.width120} className="player-playlist__item-photo" alt="photo" width={30} height={30}/>
					{!isSongPlayingNow(item) && <FaPlay onClick={() => props.play(item)} size={30} className="player-playlist__item-play"/>}
					{isSongPlayingNow(item) && <FaPause onClick={() => props.pause()} size={30} className="player-playlist__item-play"/>}
				</div>
				<div className="player-playlist__item-name">{item.name}</div>
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
				<li onClick={() => setSort('title')}>
					<AiOutlineProfile style={{marginRight: 4	}}/>
					TITLE
					<TbSortDescending style={{marginLeft: 4	}}/>
				</li>
				<li onClick={() => setSort('artist')}>
					<AiOutlineUser style={{marginRight: 4	}}/>
					ARTIST
					<TbSortDescending style={{marginLeft: 4	}}/>
				</li>
				<li onClick={() => setSort('time')}>
					<AiOutlineClockCircle style={{marginRight: 4	}}/>
					TIME
					<TbSortDescending style={{marginLeft: 4	}}/>
				</li>
			</ul>
			<ul className="player-playlist__list">
				{getSongsLis()}
			</ul>
		</div>
	</div>
}

export default PlayerPlaylist;