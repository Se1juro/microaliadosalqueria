import React, {Component} from 'react';
import {Spinner} from "react-bootstrap";
import AdvanceOptionsUsers from "./AdvanceOptionsUsers";
import TableBodyUsers from "./TableBodyUsers";
import {userService} from "./services/userServices";

class UserList extends Component {
  state = {
    usuarios: [],
    token: localStorage.getItem("token"),
    loading: true,
    viewAllUsers: false,
  }

  async componentDidMount() {
    await this.getUsers();
  }


  changeValueOfUserList = async (param) => {
    await this.setState({viewAllUsers: param})
    await this.getUsers()
  }

   getUsers = async()=> {
    const dataOfState = await userService.getUsers(this.state.viewAllUsers);
    await this.setState({usuarios: dataOfState.usuarios.resultado, loading: dataOfState.loading})
  }


  render() {
    const loading = this.state.loading;
    return (
        <div className="row d-flex justify-content-center">
          <div className="col-md-12 ">
            {loading ? (
                <Spinner
                    animation="border"
                    variant="primary"
                    style={{marginTop: '10px'}}
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
                    <th scope="col" style={{textAlign: "center"}}>Opciones</th>
                  </tr>
                  </thead>
                  <TableBodyUsers usuarios={this.state.usuarios} onChange={this.getUsers}/>
                </table>
            )}
            <div className="row d-flex justify-content-center">
              <AdvanceOptionsUsers changeValueOfUserList={this.changeValueOfUserList}/>
            </div>
          </div>
        </div>
    );
  }
}

export default UserList;