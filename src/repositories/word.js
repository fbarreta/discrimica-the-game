
import config from './../config';

function addWord(playerId, word) {
    return fetch(`${config.URL_API}/addWord/${playerId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `word=${word}`,
    }).then(async (resp) => {
        return await resp.json();
    });
}

export default { addWord }
