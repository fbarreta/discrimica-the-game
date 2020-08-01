import React from 'react';
import './index.scss'
import Player from '../Player';
function Players() {
    var names = ['Felipe', 'Lidiane', 'Gabriel', 'Maria Clara', 'Rodrigo', 'Ricardo', 'Thais'];
    return(
        <div>
            <div className="message">
                <h1>
                    Waiting for Players to join !!!!
                </h1>
            </div>
            <div>
                <ul className="players">
                    {names.map(function(name, index){
                        return <Player key={ index }>{name}</Player>;
                    })}
                </ul>
            </div>
        </div>
    );
}

export default Players;
