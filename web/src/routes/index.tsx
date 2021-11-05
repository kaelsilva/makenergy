import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import ManageClients from '../pages/ManageClients';
import Chart from '../pages/Chart';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';

const Routes: React.FC = () => (
  <Switch>
    <Route path={`${process.env.PUBLIC_URL}/`} exact component={Login} />
    <Route path={`${process.env.PUBLIC_URL}/signup`} component={SignUp} />
    <Route
      path={`${process.env.PUBLIC_URL}/clients`}
      component={ManageClients}
      isPrivate
    />
    <Route
      path={`${process.env.PUBLIC_URL}/chart`}
      component={Chart}
      isPrivate
    />
  </Switch>
);

export default Routes;
