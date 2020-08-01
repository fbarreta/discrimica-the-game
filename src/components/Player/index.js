import React from 'react';
import './index.scss'
function Player(props) {
    return(
        <li>
            <span className="PlayerText">{props.children}</span>
        </li>
    );
}

export default Player;
