import { Dashboard } from 'app/components/Dashboard';
import * as React from 'react';
import { hot } from 'react-hot-loader';
import { Route, Switch } from 'react-router';

/* tslint:disable-next-line:variable-name */
export const App = hot(module)(() => (
  <Switch>
    <Route path="/" component={Dashboard} />
  </Switch>
));
