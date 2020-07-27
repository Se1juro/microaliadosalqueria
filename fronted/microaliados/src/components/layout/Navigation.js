import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import jwt from 'jsonwebtoken';

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
        this.setState({ isAdmin: true });
      }
      this.setState({ logged: true, nombreUsuario: token.nombre });
    }
  }
  render() {
    const logged = this.state.logged;
    const isAdmin = this.state.isAdmin;
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Microaliados Inventario
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              {logged && isAdmin ? (
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
                    <Link className="dropdown-item" to="/crearproducto">
                      Crear Producto
                    </Link>
                  </div>
                </li>
              ) : null}

              {logged ? (
                <li className="nav-item">
                  <b className="nav-link disabled" style={{ color: 'white' }}>
                    {this.state.nombreUsuario}
                  </b>
                </li>
              ) : null}
              <li></li>
              {logged ? null : (
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Iniciar Sesion
                  </Link>
                </li>
              )}
              {logged ? (
                <li className="nav-item">
                  <Link className="nav-link" to="/logout">
                    Cerrar Sesion
                  </Link>
                </li>
              ) : null}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
