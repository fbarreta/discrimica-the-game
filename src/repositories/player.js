
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

export default { addPlayer, getPlayer }
