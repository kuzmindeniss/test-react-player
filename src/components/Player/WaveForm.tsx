import React, {useEffect, useRef} from 'react';
import WaveSurfer from 'wavesurfer.js';
import {useAppSelector} from "redux/hooks";
import {selectCurrentSong, selectCurrentTime, selectIsPlayingNow} from "redux/playerSlice";

const WaveForm: React.FC = () => {
	const containerRef = useRef<HTMLDivElement>(null);
	const waveSurferRef = useRef<WaveSurfer>();

	const isPlayingNow = useAppSelector(selectIsPlayingNow);
	const currentTime = useAppSelector(selectCurrentTime);
	const currentSong = useAppSelector(selectCurrentSong);

	useEffect(() => {
		if (!waveSurferRef.current || !waveSurferRef.current.backend) return;
		if (isPlayingNow) {
			waveSurferRef.current.play();
		} else {
			waveSurferRef.current.pause();
		}
	}, [isPlayingNow])

	useEffect(() => {
		if (!waveSurferRef.current || !waveSurferRef.current.backend) return;
		waveSurferRef.current.setCurrentTime(currentTime);
	}, [currentTime])

	useEffect(() => {
		if (!currentSong) return;
		const waveSurfer = WaveSurfer.create({
			container: containerRef.current!,
			responsive: true,
			waveColor: "#800080",
			progressColor: "#D09AA7",
			height: 150,
			barWidth: 3,
			scrollParent: false
		})
		waveSurfer.load(currentSong.url);
		waveSurfer.on('ready', () => {
			waveSurferRef.current = waveSurfer;
			waveSurfer.setMute(true);
		})

		return () => {
			waveSurfer.destroy()
		}
	}, [currentSong])

	return <div className="waveContainer" ref={containerRef}>
	</div>
}

export default WaveForm;