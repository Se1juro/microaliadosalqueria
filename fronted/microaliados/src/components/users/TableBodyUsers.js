import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {userService} from "./services/userServices";
class TableBodyUsers extends Component {
  deleteUser = async (id) => {
    await userService.deleteUser(id,this.props.onChange);
  };

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
    );
  }
}

export default TableBodyUsers;