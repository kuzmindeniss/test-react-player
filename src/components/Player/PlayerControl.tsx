import React, {useRef} from 'react';
import {
	BsFillPauseCircleFill,
	BsFillPlayCircleFill,
	BsFillSkipBackwardFill,
	BsFillSkipForwardFill
} from "react-icons/bs";
import {selectCurrentSong, selectCurrentTime, selectIsPlayingNow} from "redux/playerSlice";
import {SongInfoI} from "./Player.types";
import {convertDurationNumberIntoString} from "../../utils/utils";
import {useAppSelector} from "redux/hooks";
import {Link} from "react-router-dom";


interface PlayerControlI {
	play: () => void;
	pause: (song?: SongInfoI) => void;
	seek: (t: number) => void;
	next: (songs?: SongInfoI[]) => void;
	prev: (songs?: SongInfoI[]) => void;
}

const PlayerControl: React.FC<PlayerControlI> = (props: PlayerControlI) => {
	const isPlayingNow = useAppSelector(selectIsPlayingNow);
	const currentSong = useAppSelector(selectCurrentSong);
	const currentTime = useAppSelector(selectCurrentTime);
	const timelineRef = useRef<HTMLDivElement>(null);

	const getCurrentSongInfo = (): JSX.Element | null => {
		if (!currentSong) return null;
		return <React.Fragment>
			<img className="player-control--song-img" src={currentSong.images.width120} alt="song" width={45} height={45}/>
			<div className="player-control--song-info">
				<Link to={`song`} className="player-control--song-name">{currentSong.name}</Link>
				<span className="player-control--song-artist">{currentSong.artist}</span>
			</div>
		</React.Fragment>
	}

	const getPercentFromTime = (): number => {
		if (!currentTime || !currentSong || !currentSong.duration) return 0;
		return currentTime / currentSong.duration * 100;
	}

	const timelineClicked = (e: React.MouseEvent) => {
		if (!timelineRef.current || !currentSong) return;
		const ratio = e.nativeEvent.offsetX / timelineRef.current.offsetWidth;
		const newTimeNumber = currentSong.duration * ratio;
		props.seek(newTimeNumber);
	}

	return <div className="player-control__wrapper">
		<div className="player-control">
			<div className="player-control__top">
				<div className="player-control__top-left">
					{getCurrentSongInfo()}
				</div>
				<div className="player-control__top-center">
					<BsFillSkipBackwardFill size={'1.6em'} onClick={() => props.prev()}/>
					{isPlayingNow && <BsFillPauseCircleFill size={'2.2em'} onClick={() => props.pause()}/>}
					{!isPlayingNow && <BsFillPlayCircleFill size={'2.2em'} onClick={() => props.play()}/>}
					<BsFillSkipForwardFill size={'1.6em'} onClick={() => props.next()}/>
				</div>
				<div className="player-control__top-right"></div>
			</div>
			<div className="player-control__bottom">
				<div className="player-control__bottom-left">{convertDurationNumberIntoString(currentTime)}</div>
				<div className="player-control__bottom-center">
					<div className="player-control__timeline" ref={timelineRef} onClick={timelineClicked}>
						<div className="player-control__timeline-bg"></div>
						<div className="player-control__timeline-progress"
								 style={{width: getPercentFromTime() + '%'}}
						></div>
						<div className="player-control__timeline-circle"
								 style={{left: getPercentFromTime() + '%'}}
						></div>
					</div>
				</div>
				<div className="player-control__bottom-right">{currentSong && convertDurationNumberIntoString(currentSong.duration)}</div>
			</div>
		</div>
	</div>
}

export default PlayerControl;