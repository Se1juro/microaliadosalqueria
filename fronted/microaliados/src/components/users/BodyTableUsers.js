import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {userService} from "./services/userServices";

class BodyTableUsers extends Component {
  deleteUser = async (id) => {
    await userService.deleteUser(id, this.props.onChange);
  };

  comprobateRolMicroaliado(rol, microaliado,estado){
    return rol !== 'admin' && rol !== 'microaliado' && !microaliado && estado;
  }

  makeMicroAliado=async(codigo)=>{
    await userService.makeMicroaliado(codigo,this.props.onChange);
  }

  render() {
    return (
        <tbody>
        {this.props.usuarios.map((usuario) => (
            <tr key={usuario._id}>
              <td>{usuario.codigo}</td>
              <td className={usuario.estado ? null : 'text-danger'}>{usuario.nombre}</td>
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
                {
                  usuario.estado ? null : <Link
                      className="btn btn-primary"
                      to={'/activarusario/:id' + usuario.codigo}
                  >
                    Activar
                  </Link>
                }
                {
                  this.comprobateRolMicroaliado(usuario.rol,usuario.codigoMicroaliadoEncargado,usuario.estado) ? <button
                      className="btn btn-primary"
                      onClick={() =>
                          this.makeMicroAliado(usuario.codigo)
                      }
                  >
                    Hacer Microaliado
                  </button> : null
                }
              </td>

            </tr>
        ))}
        </tbody>
    );
  }
}

export default BodyTableUsers;