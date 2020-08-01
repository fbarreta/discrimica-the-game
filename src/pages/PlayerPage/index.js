import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Header from './../../components/Header';
import FormField from './../../components/FormField';
import useForm from './../../hooks/useForm';
import repPlayer from './../../repositories/player';
import repWord from './../../repositories/word';

function PlayerPage() {
    const { playerId } = useParams();
    const defaultEmpty = {
        name: ''
    };
    const defaultEmptyWord = {
        description: ''
    };
    const history = useHistory();
    const [player, setPlayer] = useState(defaultEmpty);
    const [words, setWords] = useState([]);
    const { handleChange, values, clearForm } = useForm(defaultEmpty);

    useEffect(() => {
        if (playerId) {
            repPlayer.getPlayer(playerId).then((resp) => {
                setPlayer(resp);
                setWords(resp.words);
            });
        }
    }, [playerId]);
    
    return (
        <>
            <Header />
            <hr/>
            {!playerId && (
                <form onSubmit={(e) => {
                    e.preventDefault();
                    repPlayer.addPlayer(values.name).then((resp) => {
                        clearForm(defaultEmptyWord);
                        history.push(`/player/${resp.id}`); 
                    });
                }}>
                    <FormField
                        label='Name'
                        type='text'
                        name='name'
                        value={values.name}
                        onChange={handleChange}
                    />
                    <button>
                        Join
                    </button>
                </form>
            )}
            
            {playerId && (
                <>
                    <h1>{player.name}</h1>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        repWord.addWord(playerId, values.description).then((resp) => {
                            console.log(resp);
                            clearForm(defaultEmpty);
                            setWords([...words, resp]);
                        });
                    }}>
                        <FormField
                            label='Word'
                            type='text'
                            name='description'
                            value={values.description}
                            onChange={handleChange}
                        />
                        <button>
                            Add Word
                        </button>
                    </form>
                    Words
                    <ul>
                    {
                    words.map((word, index) => {
                        return(
                            <li key={index}>{word.description}</li>
                        );
                    })
                    }
                    </ul>
                </>
            )}
        </>
    );
}

export default PlayerPage;
