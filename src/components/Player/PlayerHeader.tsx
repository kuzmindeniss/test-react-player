import React from 'react';
import {IoChevronBackSharp, IoChevronForwardSharp} from "react-icons/io5";
import {Link, useNavigate} from "react-router-dom";
import {RiHome2Line} from "react-icons/ri";

const PlayerHeader: React.FC = () => {
	const navigate = useNavigate();

	const goToPreviousPage = () => {
		navigate(-1);
	}

	const goToNextPage = () => {
		navigate(1);
	}

	return <div className="player-header">
		<Link to={'/'}>
			<RiHome2Line size={30} className="player-header__home"/>
		</Link>
		<IoChevronBackSharp size={30} className="player-header__back" onClick={goToPreviousPage}/>
		<IoChevronForwardSharp size={30} className="player-header__forward" onClick={goToNextPage}/>
	</div>
}

export default PlayerHeader;