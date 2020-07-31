import React, { Component } from 'react';
import Admin from '../../img/member.svg';
export default class SolicitarSoporte extends Component {
  render() {
    return (
      <div className="col-md-12">
        <p>
          Si tienes problemas recuerda comunicarte con el{' '}
          <strong>administrador</strong>
        </p>
        <center>
          <img
            src={Admin}
            alt="Desarrollador web"
            className="img-fluid"
            width="100px"
            height="100px"
          />
        </center>
        <button
          className="btn btn-primary btn-block"
          style={{ marginTop: '40px' }}
        >
          Solicitar Soporte
        </button>

      </div>

    );
  }
}
