import React, { Component } from 'react';
import { Spinner } from 'react-bootstrap';
import BodyTableUsers from './BodyTableUsers';
import { userService } from './services/userServices';
import SearchUserForm from './SearchUserForm';
import AdvanceOptionsUsers from './AdvancedOptionsUsers';

class UserList extends Component {
  state = {
    usuarios: [],
    token: localStorage.getItem('token'),
    loading: true,
    viewAllUsers: false,
    searchingUser: false,
  };

  async componentDidMount() {
    await this.getUsers();
  }

  changeValueOfUserList = async (param) => {
    await this.setState({ viewAllUsers: param });
    await this.getUsers();
  };

  searchUser = async () => {
    if (this.state.searchingUser) {
      await this.getUsers();
      return this.setState({ searchingUser: false });
    }
    this.setState({ searchingUser: true });
  };

  getUserByCode = async (user) => {
    if (user===undefined){
      return await this.getUsers();
    }
    this.setState({usuarios:user})
  };

  getUsers = async () => {
    const dataOfState = await userService.getUsers(this.state.viewAllUsers);
    await this.setState({
      usuarios: dataOfState.usuarios.resultado,
      loading: dataOfState.loading,
    });
  };

  render() {
    const loading = this.state.loading;
    const searchingUser = this.state.searchingUser;
    return (
      <div className="row d-flex justify-content-center">
        {searchingUser ? (
          <SearchUserForm getUserByCode={this.getUserByCode} searchingUserToList={true}/>
        ) : null}
        <div className="col-md-12 ">
          {loading ? (
            <Spinner
              animation="border"
              variant="primary"
              style={{ marginTop: '10px' }}
            />
          ) : (
            <table className="table table-responsive  mx-auto">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">Codigo</th>
                  <th scope="col">Nombre</th>
                  <th scope="col">Rol</th>
                  <th scope="col">Documento</th>
                  <th scope="col">Departamento</th>
                  <th scope="col">Municipio</th>
                  <th scope="col">Telefono</th>
                  <th scope="col" style={{ textAlign: 'center' }}>
                    Opciones
                  </th>
                </tr>
              </thead>
              <BodyTableUsers
                usuarios={this.state.usuarios}
                onChange={this.getUsers}
              />
            </table>
          )}
          <div className="row d-flex justify-content-center">
            <AdvanceOptionsUsers
              changeValueOfUserList={this.changeValueOfUserList}
              searchUser={this.searchUser}
              getUserByCode={this.getUserByCode}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default UserList;
