import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

//RUTAS//
import ProductList from '../products/ProductsList';
import RegisterUser from '../sesions/RegisterUser';
import LoginUser from '../sesions/LoginUser';
import NotFound from '../404NotFound';
import Home from '../Home';
import LogOut from '../sesions/Logout';
import AdminRoutes from './AdminRoutes';
import Inventory from '../inventory/Inventory';
import Distribution from '../shipping/Distribution';

const isLogged = () => {
  if (!localStorage.getItem('token')) {
    return false;
  }
  return true;
};

const RouteSesions = (props) =>
  isLogged() ? <Redirect to="/" /> : <Route {...props} />;

const SecureRoute = (props) =>
  isLogged() ? <Route {...props} /> : <Redirect to="/" />;

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <SecureRoute path="/productos" exact component={ProductList} />
      <RouteSesions path="/register" exact component={RegisterUser} />
      <RouteSesions path="/login" exact component={LoginUser} />
      <SecureRoute path="/inventario/:id" exact component={Inventory} />
      <SecureRoute path="/distribucion/:id" exact component={Distribution} />
      <SecureRoute path="/logout" component={LogOut} />
      <AdminRoutes />
      <SecureRoute component={NotFound} />
    </Switch>
  );
}
