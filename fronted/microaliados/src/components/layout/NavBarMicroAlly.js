import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import jwt from 'jsonwebtoken';
class NavBarMicroAlly extends Component {
  state = {
    token: jwt.decode(localStorage.getItem('token')),
  };
  render() {
    return (
      <>
        <li className="nav-item">
          <NavLink
            exact
            className="nav-link"
            to="/productos"
            activeClassName="main-nav-active"
          >
            Productos
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            exact
            className="nav-link"
            to={'/inventario/' + this.state.token.codigoReferencia}
            activeClassName="main-nav-active"
          >
            Mi inventario
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            exact
            className="nav-link"
            to={'/distribucion/' + this.state.token.codigoReferencia}
            activeClassName="main-nav-active"
          >
            Mi Distribucion
          </NavLink>
        </li>
      </>
    );
  }
}

export default NavBarMicroAlly;
