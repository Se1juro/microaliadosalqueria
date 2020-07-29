import React, {Component} from 'react';
import {Spinner} from "react-bootstrap";
import {Link} from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import AdvanceOptionsUsers from "./AdvanceOptionsUsers";

class UserList extends Component {
  state = {
    usuarios: [],
    token: localStorage.getItem("token"),
    loading: true
  }

  async componentDidMount() {
    await this.getUsers();
    console.log(this.state.usuarios)
  }

  async getUsers() {
    const res = await axios.get("http://localhost:4000/usuarios/disponibles", {
      headers: {
        Authorization: 'Bearer ' + this.state.token
      }
    })
    this.setState({usuarios: res.data.resultado, loading: false})
  }


  deleteUser = async (id) => {
    console.log(this.state)
    Swal.fire({
      title: '¿Estas seguro de eliminar este producto?',
      text: 'Esta accion puede no ser irreversible',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminalo',
    }).then(async (result) => {
      if (result.value) {
        try {
          const res = await axios.put('http://localhost:4000/usuarios/delete/' + id, "", {
            headers: {
              Authorization: 'Bearer ' + this.state.token,
            },
          });
          if (res.status === 200) {
            await Swal.fire('Eliminado', 'El usuario ha sido eliminado', 'success');
          }
          await this.getUsers();
        } catch (error) {
          console.log(error)
          await Swal.fire({
            icon: 'error',
            title: 'Algo salio mal',
            text: 'No pudimos eliminar el usuario',
          });
        }
      } else {
        await Swal.fire({
          icon: 'error',
          title: 'Algo salio mal',
          text: 'No pudimos eliminar el usuario',
        });
      }
    });
  };

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
                  <tbody>
                  {this.state.usuarios.map((usuario) => (
                      <tr key={usuario._id}>
                        <td>{usuario.codigo}</td>
                        <td>{usuario.nombre}</td>
                        <td>{usuario.rol}</td>
                        <td>{usuario.documentoIdentidad}</td>
                        <td>{usuario.departamento}</td>
                        <td>{usuario.municipio}</td>
                        <td>{usuario.telefono}</td>
                        <td>
                          <button
                              className="btn btn-danger"
                              onClick={() =>
                                  this.deleteUser(usuario._id)
                              }
                              style={{margin: '5px'}}
                          >
                            Eliminar
                          </button>
                          <Link
                              className="btn btn-primary"
                              to={'/editarproducto/' + usuario.codigo}
                          >
                            Actualizar
                          </Link>

                        </td>
                      </tr>
                  ))}
                  </tbody>
                </table>
            )}
            <div className="row d-flex justify-content-center">
              <AdvanceOptionsUsers/>
            </div>
          </div>
        </div>
    );
  }
}

export default UserList;