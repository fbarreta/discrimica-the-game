
import config from './../config';

function addWord(playerId, word) {
    return fetch(`${config.URL_API}/word/${playerId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(word),
    }).then(async (resp) => {
        return await resp.json();
    });
}

function removeWord(playerId, word) {
    return fetch(`${config.URL_API}/word/${playerId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(word),
    }).then(async (resp) => {
        return await resp.json();
    });
}

export default { addWord, removeWord }
