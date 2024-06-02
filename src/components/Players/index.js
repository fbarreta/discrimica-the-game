import React, { useState, useEffect } from 'react';
import repInfo from './../../repositories/info';
import { io } from 'socket.io-client';
import './index.scss'
import Player from '../Player';
function Players() {
    // var names = ['Felipe', 'Lidiane', 'Gabriel', 'Maria Clara', 'Rodrigo', 'Ricardo', 'Thais'];
    const [players, setPlayers] = useState([]);
    useEffect(
        () => {
        repInfo.getInfo().then((resp) => {
            setPlayers(resp.players);
        });
        const URL = 'http://localhost:3001';
        const socket = io(URL);
        socket.connect();
        socket.on('add-player', check);
          
        return () => {
        socket.disconnect();
        }
        },
        []
      )

    const check = (resp) => {
        setPlayers(resp.players);
    };

    return(
        <div>
            <div className="message">
                <h1>
                    Waiting for Players to join !!!!
                </h1>
            </div>
            <div>
                <ul className="players">
                    {players.map(function(p, index){
                        return <Player key={ index } player={p} />;
                    })}
                </ul>
            </div>
        </div>
    );
}

export default Players;
