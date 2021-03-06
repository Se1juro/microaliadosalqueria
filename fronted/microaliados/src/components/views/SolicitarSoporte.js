import React, { Component } from 'react';
import Admin from '../../img/member.svg';
import { HashLink as Link } from 'react-router-hash-link';
export default class SolicitarSoporte extends Component {
  render() {
    return (
      <div className="col-md-12">
        <p>
          Si tienes problemas recuerda comunicarte con el{' '}
          <strong>administrador</strong>
        </p>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <img
            src={Admin}
            alt="Desarrollador web"
            className="img-fluid"
            width="100px"
            height="100px"
          />
        </div>
        <Link
          className="btn btn-primary btn-block"
          style={{ marginTop: '40px' }}
          to="/#contact"
        >
          Solicitar Soporte
        </Link>
      </div>
    );
  }
}
