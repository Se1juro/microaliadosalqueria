import React, { Component } from 'react';
import { userService } from './services/userServices';
import Swal from 'sweetalert2';

class SearchUserForm extends Component {
  state = {
    codigo: '',
    searchingUserToList: this.props.searchingUserToList,
    users: [],
  };
  onChangeForm = async (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
    if (e.target.value === '') {
      this.props.getUserByCode();
    }
  };
  searchUser = async (e) => {
    e.preventDefault();
    if (this.state.codigo) {
      const dataOfUser = await userService.searchByCode(this.state.codigo);
      const newUser = [];
      newUser.push(dataOfUser.resultado);
      if (newUser[0] === null || newUser[0] === undefined) {
        return await Swal.fire({
          icon: 'error',
          title: 'Algo salio mal',
          text: 'No pudimos encontrar el usuario',
          timer: 3000,
        });
      }
      this.setState({ users: newUser });
      if (this.state.searchingUserToList) {
        this.props.getUserByCode(newUser);
      }
    }
  };
  cleanData = (e) => {
    e.preventDefault();
    this.setState({ codigo: '' });
    if (this.state.searchingUserToList) {
      this.props.getUserByCode();
    }
  };

  render() {
    return (
      <div className={'col-md-12'}>
        <form onSubmit={this.searchUser}>
          <div className="form-group row">
            <label htmlFor="codigo" className="col-sm-2 col-form-label">
              Codigo
            </label>
            <div className="col-md-4 ">
              <input
                type="text"
                className="form-control"
                id="codigo"
                name={'codigo'}
                onChange={this.onChangeForm}
                value={this.state.codigo}
              />
            </div>
            <div className="col-md-4 m-auto" style={{ margin: '1rem' }}>
              <button type="submit" className="btn btn-primary mb-2">
                Buscar
              </button>
              <button
                className="btn btn-primary mb-2"
                style={{ marginLeft: '1rem' }}
                onClick={this.cleanData}
              >
                Limpiar
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default SearchUserForm;
