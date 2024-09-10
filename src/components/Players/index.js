import React, { useState, useEffect } from 'react';
import repInfo from './../../repositories/info';
import './index.scss'
import Player from '../Player';
function Players({socket}) {
    const [players, setPlayers] = useState([]);
    const [teams, setTeams] = useState([]);
    const [activeTeamIndex, setActiveTeamIndex] = useState(0);
    const [activePlayerIndex, setActivePlayerIndex] = useState(0);
    const [isMatchStarted, SetIsMatchStarted] = useState(false);
    useEffect(
        () => {
        repInfo.getInfo().then((resp) => {
            if (resp.teams.lengh > 0) {
                setActivePlayerIndex(resp.teams[resp.activeTeamIndex].activePlayerIndex);
                setActiveTeamIndex(resp.activeTeamIndex);
            }
            setPlayers(resp.players);
            SetIsMatchStarted(resp.started);
            setTeams(resp.teams);
        });
    },[]);

    useEffect(() => {
        socket.on('add-player', (resp) => {
            setPlayers(resp.players);
            setTeams(resp.teams);
            if (resp.teams.lengh > 0) {
                setActiveTeamIndex(resp.activeTeamIndex);
                setActivePlayerIndex(resp.teams[resp.activeTeamIndex].activePlayerIndex);
            }
        });
    }, [socket]);

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
                            {teams.map(function(t, teamIndex){
                                    return <div key={teamIndex} className='t' >
                                            <p className={`team-text ${t.color} ${activeTeamIndex === teamIndex ? 'active' : ''}`}>{t.name}</p>
                                            <p className='score-text'>{t.points}</p>
                                            <ul className="players">
                                                {t.players.map(function(p, playerIndex){
                                                    return <li key={playerIndex} className={`player-text ${t.color} ${activeTeamIndex === teamIndex && activePlayerIndex === playerIndex ? 'active' : ''}`}>{p.name}</li>;
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
