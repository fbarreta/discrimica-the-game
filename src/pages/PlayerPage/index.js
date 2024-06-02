import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
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
    const history = useHistory();

    useEffect(() => {
        if (playerId) {
            repPlayer.getPlayer(playerId).then((resp) => {
                setPlayer(resp);
                setWords(resp.words);
            });
        }
    }, [playerId]);

    const joinPlayer = () => {
        repPlayer.addPlayer(name).then((resp) => {
            const id = resp.id;
            history.push(`/player/${id}`)
        });
    };

    const addWord = (description) => {
        repWord.addWord(playerId, description).then((resp) => {
            console.log(resp);
            const newWords = [...words, resp];
            setWords(newWords);
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
                    <label id='word'>Word: </label>
                    <input type='text' size={20} label='word' value={word} onChange={(e) => {
                        setWord(e.target.value);
                    }}/>
                    <button onClick={() => {
                        addWord(word);
                    }}>Add</button>
                    <br/>
                    <ul>
                    {
                        words.map((w, i) => {
                            return <li key={i}>{w.description}</li>
                        })
                    }
                    </ul>
                </>
            )}
        </>
    );
}

export default PlayerPage;
