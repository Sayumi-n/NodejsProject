import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Switch
} from 'react-router-dom';
import 'materialize-css/dist/css/materialize.min.css';

import Users from './user-feature/container/Users';
import NewPlace from './places-feature/container/NewPlace';
import MainHeader from './shared/components/MainHeader';
import UserPlaces from './places-feature/container/UserPlaces'
// import UpdatePlace from './places-feature/container/UpdatePlace';
import UpdatePlaceFormik from './places-feature/container/UpdatePlaceFormik'
import Auth from './user-feature/container/Auth';
import PrivateRoute from './shared/route/PrivateRoute';
import PublicRoute from './shared/route/PublicRoute';

const App = () => {
  return (
    <Router>
      <MainHeader />
      <Switch>
        <PublicRoute restricted={false} path="/" exact component={Users} />
        <PublicRoute restricted={false} path="/:uid/places" component={UserPlaces} />
        <PrivateRoute path="/places/new" exact component={NewPlace} />
        <PrivateRoute path="/places/:pid" component={UpdatePlaceFormik} />
        <PublicRoute restricted={true} path="/auth" component={Auth} />
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};

export default App;
