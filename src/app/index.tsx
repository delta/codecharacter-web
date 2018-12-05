import * as React from 'react';
import { Route, Switch } from 'react-router';
import { Dashboard } from 'app/components/Dashboard';
import { hot } from 'react-hot-loader';

export const App = hot(module)(() => (
  <Switch>
    <Route path="/dashboard" component={Dashboard} />
  </Switch>
));
