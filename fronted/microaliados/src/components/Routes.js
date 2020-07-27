import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import jwt from 'jsonwebtoken';

//RUTAS//
import ProductList from './products/ProductsList';
import CreateProduct from './products/CreateProduct';
import RegisterUser from './sesions/RegisterUser';
import LoginUser from './sesions/LoginUser';
import NotFound from './404NotFound';
import Home from './Home';
import LogOut from './sesions/Logout';
import AuthLogin from './auth/AuthLogin';
import BackLogin from './auth/backLogin';

const isAdmin = () => {
  const token = jwt.decode(localStorage.getItem('token'));
  if (token.rol === 'admin') {
    return true;
  }
  return false;
};

const MyRoute = (props) =>
  isAdmin() ? <Route {...props}></Route> : <Redirect to="/"></Redirect>;

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Home}></Route>
      <Route
        path="/productos"
        exact
        component={(props) => <AuthLogin {...props} Component={ProductList} />}
      />
      <Route path="/register" component={RegisterUser}></Route>
      <Route
        path="/login"
        exact
        component={(props) => <BackLogin {...props} Component={LoginUser} />}
      ></Route>
      <Route path="/logout" component={LogOut}></Route>
      <MyRoute path="/crearproducto" component={CreateProduct}></MyRoute>
      <MyRoute path="/editarproducto/:id" component={CreateProduct} />
      <Route component={NotFound} />
    </Switch>
  );
}
