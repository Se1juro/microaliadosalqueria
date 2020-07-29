import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserSlash } from '@fortawesome/free-solid-svg-icons';

class AdvanceOptionsUsers extends Component {
  render() {
    return (
      <div className="col-md-6">
        <div className="card">
          <div className="card-header">
            <h5 className="card-title">Opciones avanzadas</h5>
          </div>
          <div className="card-body">
            <button type="button" className="btn btn-primary ">
              <FontAwesomeIcon icon={faUserSlash} /> Usuarios Inactivos
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default AdvanceOptionsUsers;
