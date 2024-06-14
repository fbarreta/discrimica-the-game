
import config from './../config';

function getInfo() {
    return fetch(`${config.URL_API}/info`).then(async (resp) => {
        return await resp.json();
    });
}

function getStatus() {
    return fetch(`${config.URL_API}/info`).then(async (resp) => {
        const info = await resp.json();
        return {
            id: info.id,
            started: info.started,
        };
    });
}

function start() {
    return fetch(`${config.URL_API}/start`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(async (resp) => {
        return await resp.json();
    });
}

function reset() {
    return fetch(`${config.URL_API}/reset`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(async (resp) => {
        return await resp.json();
    });
}

export default { getInfo, start, reset, getStatus }
