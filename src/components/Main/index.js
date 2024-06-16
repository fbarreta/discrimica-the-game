import React from 'react';
import Header from '../Header';
import Players from '../Players';
function Main({socket}) {
    return(
        <>
            <Header />
            <hr/>
            <Players socket={socket}/>
        </>
    );
}

export default Main;
