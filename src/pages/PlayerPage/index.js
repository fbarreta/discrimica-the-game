import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRemove } from '@fortawesome/free-solid-svg-icons';
import Header from './../../components/Header';
import repPlayer from './../../repositories/player';
import repWord from './../../repositories/word';
import './index.scss'
function PlayerPage() {
    const { playerId } = useParams();
    const [player, setPlayer] = useState();
    const [words, setWords] = useState([]);
    const [name, setName] = useState('');
    const [word, setWord] = useState('');
    const [isDisabled, setIsDisabled] = useState(false);
    const [match] = useState({id: null, started: false});
    const history = useHistory();

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
        }
    }, [checkEnabled, playerId]);

    useEffect(() => {
        if (playerId) {
            repPlayer.getPlayer(playerId).then((resp) => {
                setPlayer(resp);
                setWords(resp.words);
                checkEnabled();
            });
        }
    }, [checkEnabled, playerId]);

    const joinPlayer = () => {
        repPlayer.addPlayer(name).then((resp) => {
            const id = resp.id;
            history.push(`/player/${id}`)
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
                            Wait for your turn ...
                        </>
                    )}
                </>
            )}
        </>
    );
}

export default PlayerPage;
