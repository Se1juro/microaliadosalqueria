import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery';
import 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './App.css';

import Navigation from './components/Navigation';
import ProductList from './components/ProductsList';
import CreateProduct from './components/CreateProduct';
import RegisterUser from './components/RegisterUser';
import Login from './components/Login';
import UpdateProduct from './components/UpdateProduct';
import NotFound from './components/404NotFound';

function App() {
  return (
    <Router>
      <Navigation></Navigation>
      <div className="container p-4">
        <Route path="/" exact component={ProductList}></Route>
        <Route path="/register" component={RegisterUser}></Route>
        <Route path="/login" component={Login}></Route>
        <Route path="/crearproducto" component={CreateProduct}></Route>
        <Route path="/editarproducto/:id" component={UpdateProduct}></Route>
        <Route path="/editarproducto/:id" component={UpdateProduct}></Route>
      </div>
      <Route path="*" exact={true} component={NotFound} />
    </Router>
  );
}

export default App;
