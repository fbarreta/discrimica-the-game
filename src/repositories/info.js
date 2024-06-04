
import config from './../config';

function getInfo() {
    return fetch(`${config.URL_API}/info`).then(async (resp) => {
        return await resp.json();
    });
}

function shuffle() {
    return fetch(`${config.URL_API}/shuffle`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        // body: JSON.stringify(word),
    }).then(async (resp) => {
        return await resp.json();
    });
}

export default { getInfo, shuffle }
