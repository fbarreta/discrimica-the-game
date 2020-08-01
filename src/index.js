import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route  } from 'react-router-dom';
import './index.css';
import App from './App';
import PlayerPage from './pages/PlayerPage';

ReactDOM.render(
  <BrowserRouter>
  <Switch>
    <Route path="/" component={App} exact />
    <Route path="/player" component={PlayerPage} exact />
    <Route path="/player/:playerId" component={PlayerPage} exact />
    <Route component={() => ( <div>404 not found</div> )} />
  </Switch>
</BrowserRouter>,

  document.getElementById('root')
);
