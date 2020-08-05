import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserSlash, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
export default class AdvancedOptionsUsers extends Component {
  state = {
    clicked: false,
    stateOfList: true,
  };
  changeValueOfListUsers = async () => {
    this.setState({
      clicked: !this.state.clicked,
      stateOfList: !this.state.stateOfList,
    });
    await this.props.changeValueOfUserList(this.state.stateOfList);
  };

  showInputToSearchUser = async () => {
    await this.props.searchUser();
  };
  render() {
    return (
      <div className="col-md-12">
        <div className="card">
          <div className="card-header">
            <h5 className="card-title">Opciones avanzadas</h5>
          </div>
          <div className="card-body">
            <button
              type="button"
              className="btn btn-primary "
              onClick={this.changeValueOfListUsers}
            >
              <FontAwesomeIcon icon={faUserSlash} />{' '}
              {this.state.clicked ? 'Usuarios Activos' : 'Usuarios Inactivos'}
            </button>
            <button
              type="button"
              className="btn btn-primary "
              onClick={this.showInputToSearchUser}
              style={{ marginLeft: '10px' }}
            >
              <FontAwesomeIcon icon={faUser} /> Buscar usuario
            </button>
            <Link
              to="/asignmicro"
              className="btn btn-primary "
              style={{ marginLeft: '10px' }}
            >
              Asignar microaliado a vendedor
            </Link>
            <br />
            {!this.state.stateOfList ? (
              <b>Los usuarios marcados en letra roja estan inactivos</b>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}
