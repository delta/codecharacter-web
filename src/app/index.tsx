import ActivateUser from 'app/containers/Authentication/ActivateUser';
import Login from 'app/containers/Authentication/Login';
import Register from 'app/containers/Authentication/Register';
import Dashboard from 'app/containers/Dashboard';
import LandingPage from 'app/containers/LandingPage';
import Leaderboard from 'app/containers/Leaderboard';
import NotFound from 'app/containers/NotFound';
import SocketHandlerWrapper from 'app/containers/SocketHandlerWrapper';
import UserProfileModal from 'app/containers/UserProfileModal';
import { Routes } from 'app/routes';
// @ts-ignore
import { initializeRendererAssets } from 'code-character-renderer-20';
import * as React from 'react';
import { hot } from 'react-hot-loader';
// @ts-ignore
import { BrowserRouter, Route, Switch } from 'react-router-dom';

initializeRendererAssets();

/* tslint:disable-next-line:variable-name */
export const App = hot(module)(() => (
  <React.Fragment>
    <SocketHandlerWrapper />
    <BrowserRouter>
      <Switch>
        <Route exact path={Routes.ROOT} component={Dashboard} />
        <Route exact path={Routes.LOGIN} component={Login} />
        <Route exact path={Routes.REGISTER} component={Register} />
        <Route exact path={Routes.LEADERBOARD} component={Leaderboard} />
        <Route exact path={Routes.USER_PROFILE_MODEL} component={UserProfileModal} />
        <Route path={Routes.USER_ACTIVATION} component={ActivateUser} />
        <Route exact path={Routes.HOME} component={LandingPage} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  </React.Fragment>
));
