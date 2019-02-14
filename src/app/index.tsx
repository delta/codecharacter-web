import Dashboard from 'app/containers/Dashboard';
// @ts-ignore
import { initializeRendererAssets } from 'codecharacter-renderer';
import * as React from 'react';
import { hot } from 'react-hot-loader';
import { Route, Switch } from 'react-router';

initializeRendererAssets();

/* tslint:disable-next-line:variable-name */
export const App = hot(module)(() => (
  <Switch>
    <Route path="/" component={Dashboard} />
  </Switch>
));
