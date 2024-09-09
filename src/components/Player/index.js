import React from 'react';
import './index.scss'
function Player({player}) {
    return(
        <li>
            <span className="PlayerText">{player.name}</span> {player.words.length > 0 && <span className="PlayerText">{player.words.length}</span>}
        </li>
    );
}

export default Player;
