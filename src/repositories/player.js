
import config from './../config';

function addPlayer(name) {
    return fetch(`${config.URL_API}/addPlayer`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `name=${name}`,
    }).then(async (resp) => {
        return await resp.json();
    });
}

function getPlayer(playerID) {
    return fetch(`${config.URL_API}/getPlayer/${playerID}`).then(async (resp) => {
        return await resp.json();
    });
}

function guessWord(playerID, wordId) {
    return fetch(`${config.URL_API}/guessWord/${playerID}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: wordId })
    }).then(async (resp) => {
        return await resp.json();
    });
}

export default { addPlayer, getPlayer, guessWord }
