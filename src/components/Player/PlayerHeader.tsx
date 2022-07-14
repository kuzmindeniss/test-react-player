import React from 'react';
import {Link} from "react-router-dom";
import {RiHome2Line} from "react-icons/ri";

const PlayerHeader: React.FC = () => {

	return <div className="player-header">
		<Link to={'/'}>
			<RiHome2Line size={30} className="player-header__home"/>
		</Link>
	</div>
}

export default PlayerHeader;