import Login from 'app/containers/Authentication/Login';
import Register from 'app/containers/Authentication/Register';
import Dashboard from 'app/containers/Dashboard';
import { Routes } from 'app/routes';
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
  <BrowserRouter>
    <Switch>
      <Route exact path={Routes.ROOT} component={Dashboard} />
      <Route exact path={Routes.LOGIN} component={Login} />
      <Route exact path={Routes.REGISTER} component={Register} />
    </Switch>
    <Sugar background="#484848" color="white" />
  </BrowserRouter>
));
