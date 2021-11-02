import React from 'react';
import { Switch, Route } from 'react-router-dom';

import ManageClients from '../pages/ManageClients';
import Chart from '../pages/Chart';

const Routes: React.FC = () => (
  <Switch>
    <Route
      path={`${process.env.PUBLIC_URL}/`}
      exact
      component={ManageClients}
    />
    <Route path={`${process.env.PUBLIC_URL}/chart`} exact component={Chart} />
  </Switch>
);

export default Routes;
