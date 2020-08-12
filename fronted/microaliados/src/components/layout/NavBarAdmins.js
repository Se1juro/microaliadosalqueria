import React, {Component} from 'react';
import {NavLink} from "react-router-dom";

class NavBarAdmins extends Component {
  render() {
    return (
        <li className="nav-item dropdown">
          <div
              className="nav-link dropdown-toggle"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
          >
            Herramientas Administrativas
          </div>
          <div
              className="dropdown-menu"
              aria-labelledby="navbarDropdown"
          >
            <NavLink className="dropdown-item" exact to="/crearproducto" activeClassName="main-nav-active">
              Crear Producto
            </NavLink>
            <NavLink className="dropdown-item" exact to="/usuarios" activeClassName="main-nav-active">
              Usuarios
            </NavLink>
            <NavLink className="dropdown-item" exact to="/productos" activeClassName="main-nav-active">
              Productos
            </NavLink>
          </div>
        </li>
    );
  }
}

export default NavBarAdmins;