
import config from './../config';

function getInfo() {
    return fetch(`${config.URL_API}/info`).then(async (resp) => {
        return await resp.json();
    });
}

export default { getInfo }
