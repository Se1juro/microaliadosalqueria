import React, {Component} from 'react';
import CreateProduct from "../products/CreateProduct";
import {Redirect, Route} from "react-router-dom";
import jwt from "jsonwebtoken";
import UserList from "../users/UserList.";

const isAdmin = () => {
  const token = jwt.decode(localStorage.getItem('token'));
  return token.rol === 'admin';

};

const MyRoute = (props) =>
    isAdmin() ? <Route {...props}/> : <Redirect to="/"/>;

class AdminRoutes extends Component {

  render() {
    return (
        <>
          <MyRoute path="/crearproducto" component={CreateProduct}/>
          <MyRoute path="/editarproducto/:id" component={CreateProduct}/>
          <MyRoute path={"/usuarios/"} component={UserList}/>
        </>
    );
  }
}

export default AdminRoutes;