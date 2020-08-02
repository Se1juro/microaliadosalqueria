import React from 'react';
import {Route, Switch} from 'react-router-dom';

//RUTAS//
import ProductList from '../products/ProductsList';
import RegisterUser from '../sesions/RegisterUser';
import LoginUser from '../sesions/LoginUser';
import NotFound from '../404NotFound';
import Home from '../Home';
import LogOut from '../sesions/Logout';
import AuthLogin from '../auth/AuthLogin';
import BackLogin from '../auth/backLogin';
import AdminRoutes from "./AdminRoutes";

export default function Routes() {
  return (
      <Switch>
        <Route path="/" exact component={Home}/>
        <Route
            path="/productos"
            exact
            component={(props) => <AuthLogin {...props} Component={ProductList}/>}
        />
        <Route
            path="/register"
            component={(props) => <BackLogin {...props} Component={RegisterUser}/>}
        />
        <Route
            path="/login"
            exact
            component={(props) => <BackLogin {...props} Component={LoginUser}/>}
        />
        <Route path="/logout" component={LogOut}/>
        <AdminRoutes/>
        <Route component={NotFound}/>
      </Switch>
  );
}
