import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route  } from 'react-router-dom';
import { io } from 'socket.io-client';
import './index.css';
import App from './App';
import PlayerPage from './pages/PlayerPage';
const URL = 'http://localhost:3001';
const socket = io.connect(URL);   
ReactDOM.render(
  <BrowserRouter>
  <Switch>
    <Route path="/" render={() => <App socket={socket} />} exact />
    <Route path="/player" render={() => <PlayerPage socket={socket} />} exact />
    <Route path="/player/:playerId" render={() => <PlayerPage socket={socket} />} exact />
    <Route component={() => ( <div>404 not found</div> )} />
  </Switch>
</BrowserRouter>,

  document.getElementById('root')
);
