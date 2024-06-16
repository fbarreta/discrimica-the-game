
import config from './../config';

function getInfo() {
    return fetch(`${config.URL_API}/info`).then(async (resp) => {
        return await resp.json();
    });
}

function getStatus() {
    return fetch(`${config.URL_API}/status`).then(async (resp) => {
        return await resp.json();
    });
}

function getWord() {
    return fetch(`${config.URL_API}/getWord`).then(async (resp) => {
        return await resp.json();
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

function nextTurn() {
    return fetch(`${config.URL_API}/nextTurn`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(async (resp) => {
        return await {};
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

export default { getInfo, start, reset, getStatus, getWord, nextTurn }
