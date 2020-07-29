import React, {Component} from 'react';

import jwt from 'jsonwebtoken';
import NavBarAdmins from "./NavBarAdmins";
import ButtonNavBar from "./ButtonNavBar";
import {NavLink} from "react-router-dom";

export default class Navigation extends Component {
  state = {
    logged: false,
    isAdmin: false,
    nombreUsuario: '',
  };

  componentDidMount() {
    const token = jwt.decode(localStorage.getItem('token'));
    if (localStorage.getItem('token')) {
      if (token.rol === 'admin') {
        this.setState({isAdmin: true});
      }
      this.setState({logged: true, nombreUsuario: token.nombre});
    }
  }

  render() {
    const logged = this.state.logged;
    const isAdmin = this.state.isAdmin;
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container">
            <NavLink exact className="navbar-brand" to="/" activeClassName="main-nav-active">
              Microaliados Inventario
            </NavLink>
            <ButtonNavBar/>

            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <NavLink exact className="nav-link" to="/" activeClassName="main-nav-active">
                    Home
                  </NavLink>
                </li>
                {logged && isAdmin ? (
                    <NavBarAdmins/>
                ) : null}

                {logged ? (
                    <li className="nav-item">
                      <b className="nav-link disabled" style={{color: 'white'}}>
                        {this.state.nombreUsuario}
                      </b>
                    </li>
                ) : null}
                {logged ? null : (
                    <li className="nav-item">
                      <NavLink exact className="nav-link" to="/login" activeClassName="main-nav-active">
                        Iniciar Sesion
                      </NavLink>
                    </li>
                )}
                {logged ? (
                    <li className="nav-item">
                      <NavLink exact className="nav-link" to="/logout" activeClassName="main-nav-active">
                        Cerrar Sesion
                      </NavLink>
                    </li>
                ) : null}
              </ul>
            </div>
          </div>
        </nav>
    );
  }
}
