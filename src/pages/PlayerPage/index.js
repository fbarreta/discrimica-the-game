import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRemove } from '@fortawesome/free-solid-svg-icons';
import Header from './../../components/Header';
import repPlayer from './../../repositories/player';
import repInfo from './../../repositories/info';
import repWord from './../../repositories/word';
import './index.scss'
function PlayerPage({socket}) {
    const { playerId } = useParams();
    const [player, setPlayer] = useState();
    const [words, setWords] = useState([]);
    const [name, setName] = useState('');
    const [word, setWord] = useState('');
    const [wordToGuess, setWordToGuess] = useState({id: null, description: ''});
    const [isDisabled, setIsDisabled] = useState(false);
    const [match, setMatch] = useState({id: null, started: false, activePlayerId: null});
    const [time, setTime] = useState(10);
    const history = useHistory();

    useEffect(() => {
        socket.on('player-info', (resp) => {
            setMatch(resp);
        });
    }, [socket, match]);

    const checkEnabled = useCallback(() => {
        if (words.length >= 5) {
            setIsDisabled(true);
        } else {
            setIsDisabled(false);
        }
    },[words.length]);

    useEffect(() => {
        if (playerId) {
            repPlayer.getPlayer(playerId).then((resp) => {
                setPlayer(resp);
                setWords(resp.words);
                checkEnabled();
            });
            repInfo.getStatus().then((resp) => {
                setMatch(resp);
            });
        }
    }, [checkEnabled, playerId]);

    const joinPlayer = () => {
        repPlayer.addPlayer(name).then((resp) => {
            const id = resp.id;
            history.push(`/player/${id}`)
        });
    };

    const getWord = () => {
        repInfo.getWord().then((resp) => {
            setWordToGuess(resp);
            let timer = setInterval(() => {
                setTime((time) => {
                  if (time === 0) {
                    clearInterval(timer);
                    repInfo.nextTurn().then(() => {
                        setTime(10);
                        setWordToGuess({id: null, description: ''});
                    });
                    return 0;
                  } else return time - 1;
                });
            }, 1000);
        });
    };

    const guessWord = () => {
        repPlayer.guessWord(playerId, wordToGuess.id).then((resp) => {
            console.log(resp);
            if (resp.status === 'success') {
                if (resp.wordCount > 0) {
                    repInfo.getWord().then((resp) => {
                        setWordToGuess(resp);
                    });
                } else {
                    setTime(0);
                    repInfo.nextTurn().then(() => {
                        setWordToGuess({id: null, description: ''});
                    });
                }
            }
        });
    };

    const addWord = (desc) => {
        const word = {
            description: desc
        };
        repWord.addWord(playerId, word).then((resp) => {
            const newWords = [...words, resp];
            setWords(newWords);
            setWord('');
            checkEnabled();
        });
    };

    const removeWord = (id) => {
        const word = {
            id: id
        };
        repWord.removeWord(playerId, word).then((resp) => {
            const newWords = words.filter(x => x.id !== id);
            setWords(newWords);
            checkEnabled();
        });
    };
    
    return (
        <>
            <Header />
            <hr/>
            {!playerId && (
                <>
                    <label id='name'>Name: </label>
                    <input type='text' size={20} label='name' value={name} onChange={(e) => {
                        setName(e.target.value);
                    }}/>
                    <button onClick={() => {
                        joinPlayer();
                    }}>Join</button>
                </>
            )}
            {playerId && player && (
                <>
                    <p className='PlayerText'>{player.name}</p>
                    {!match.started ? (
                        <>
                            <label id='word'>Word: </label>
                            <input type='text' size={20} label='word' value={word} disabled={isDisabled} onChange={(e) => {
                                setWord(e.target.value);
                            }}/>
                            <button disabled={isDisabled} onClick={() => {
                                addWord(word);
                            }}>Add</button>
                            <br/>
                            <ul>
                            {
                                words.map((w, i) => {
                                    return <li key={i}>{w.description} <FontAwesomeIcon icon={faRemove} onClick={() => {
                                        removeWord(w.id);
                                    }} /></li>
                                })
                            }
                            </ul>
                        </>
                    ) : (
                        <>
                            {match.activePlayerId === playerId && time > 0 ? (
                                <>
                                    <p>{time}</p>
                                    {!wordToGuess.id ? (
                                        <>
                                            <p>Pick your word !</p>
                                            <button onClick={() => {
                                                getWord();
                                            }}>Pick</button>
                                        </>
                                    ) : (
                                        <>
                                            <p>{wordToGuess.description}</p>
                                            <button onClick={() => {
                                                guessWord();
                                            }}>GUESS</button>
                                        </>
                                    )}
                                </>
                            ) : (
                                <>
                                    Wait for your turn ...
                                </>
                            )}
                        </>
                    )}
                </>
            )}
        </>
    );
}

export default PlayerPage;
