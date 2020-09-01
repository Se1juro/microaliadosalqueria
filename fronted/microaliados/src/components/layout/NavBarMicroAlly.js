import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import { userService } from '../users/services/userServices';
class NavBarMicroAlly extends Component {
  state = {
    token: jwt.decode(localStorage.getItem('token')),
    canViewInventoryAndDelivery: false,
  };
  async componentDidMount() {
    const token = this.state.token;
    if (token.rol === 'vendedor') {
      const seller = await userService.searchByCode(token.codigoReferencia);
      if (seller.resultado.codigoMicroaliadoEncargado) {
        await this.setState({ canViewInventoryAndDelivery: true });
      }
    }
    if (token.rol === 'microaliado') {
      await this.setState({ canViewInventoryAndDelivery: true });
    }
  }
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
        {this.state.canViewInventoryAndDelivery ? (
          <>
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
        ) : null}
      </>
    );
  }
}

export default NavBarMicroAlly;
