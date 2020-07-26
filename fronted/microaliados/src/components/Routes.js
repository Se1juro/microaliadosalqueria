import React from 'react';
import { Route, Switch } from 'react-router-dom';

//RUTAS//
import ProductList from './ProductsList';
import CreateProduct from './CreateProduct';
import RegisterUser from './RegisterUser';
import Login from './Login';
import NotFound from './404NotFound';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={ProductList}></Route>
      <Route path="/register" component={RegisterUser}></Route>
      <Route path="/login" component={Login}></Route>
      <Route path="/crearproducto" component={CreateProduct}></Route>
      <Route path="/editarproducto/:id" component={CreateProduct}></Route>
      <Route component={NotFound} />
    </Switch>
  );
}
