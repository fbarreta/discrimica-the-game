import React, { useState, useEffect } from 'react';
import repInfo from './../../repositories/info';
import { io } from 'socket.io-client';
import './index.scss'
import Player from '../Player';
function Players() {
    // var names = ['Felipe', 'Lidiane', 'Gabriel', 'Maria Clara', 'Rodrigo', 'Ricardo', 'Thais'];
    const [players, setPlayers] = useState([]);
    const [teams, setTeams] = useState([]);
    const [activeTeamIndex, setActiveTeamIndex] = useState(0);
    const [isMatchStarted, SetIsMatchStarted] = useState(false);
    useEffect(
        () => {
        repInfo.getInfo().then((resp) => {
            console.log(resp);
            setPlayers(resp.players);
            SetIsMatchStarted(resp.started);
            setTeams(resp.teams);
        });
        const URL = 'http://localhost:3001';
        const socket = io(URL);
        socket.connect();
        socket.on('add-player', check);
          
        return () => {socket.disconnect();}
        },
        []
      )

    const check = (resp) => {
        setPlayers(resp.players);
    };

    const start = (resp) => {
        repInfo.start().then((resp) => {
            SetIsMatchStarted(resp.started);
            setTeams(resp.teams);
        });
    };

    const reset = (resp) => {
        repInfo.reset().then((resp) => {
            setPlayers(resp.players);
            SetIsMatchStarted(resp.started);
            setTeams(resp.teams);
        });
    };

    return(
        <>
            {!isMatchStarted && (
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
                    <div className="button">
                        <button onClick={() => {
                            start();
                        }}>Start Match</button>
                    </div>
                </div>
            )}

            {isMatchStarted && (
                <>
                    <div>
                        <div className="message">
                            <h1>
                                Game Started
                            </h1>
                        </div>
                        <div className='container'>
                            {teams.map(function(t, index){
                                    return <div key={index} className='t' >
                                            <p className={`team-text ${t.color} ${activeTeamIndex === index ? 'active' : ''}`}>{t.name}</p>
                                            <p className='score-text'>{t.points}</p>
                                            <ul className="players">
                                                {t.players.map(function(p, index){
                                                    return <li key={index} className={`player-text ${t.color}`}>{p.name}</li>;
                                                })}
                                            </ul>
                                        </div>
                                })}
                        </div>
                    </div>
                    <div className="button">
                        <button onClick={() => {
                            reset();
                        }}>End Game</button>
                    </div>
                </>
            )}
        </>
    );
}

export default Players;
