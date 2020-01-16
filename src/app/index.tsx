import Dashboard from 'app/containers/Dashboard';
import LandingPage from 'app/containers/LandingPage';
// @ts-ignore
import { initializeRendererAssets } from 'codecharacter-renderer';
import * as React from 'react';
import { hot } from 'react-hot-loader';
// @ts-ignore
import { Sugar } from 'react-preloaders';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

initializeRendererAssets();

/* tslint:disable-next-line:variable-name */
export const App = hot(module)(() => (
  <React.Fragment>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/home" component={LandingPage} />
      </Switch>
    </BrowserRouter>
    <Sugar background="#484848" color="white" />
  </React.Fragment>
));
