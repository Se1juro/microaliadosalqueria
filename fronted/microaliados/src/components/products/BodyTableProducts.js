import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {productsServices} from "./services/productsServices";
import jwt from 'jsonwebtoken'
class BodyTableProducts extends Component {
  state={
    isAdmin:false,
  }
  formatProductDescription = (productDescription) => {
    if (productDescription.length > 15) {
      return productDescription.substr(0, 10) + "..."
    }
    return productDescription
  }
  deleteProduct = async (id) => {
    await productsServices.deleteProduct(id,this.props.onChange)
  };
  componentDidMount() {
    const token = jwt.decode(localStorage.getItem("token"))
    if (token.rol==='admin'){
      this.setState({isAdmin:true})
    }
  }

  render() {
    return (
        <tbody>
        {this.props.productos.map((producto) => (
            <tr key={producto._id}>
              <td className={producto.estado ? null : 'text-danger'}>{producto.codigoReferencia}</td>
              <td>{this.formatProductDescription(producto.descripcion)}</td>
              <td>{producto.aplicaIva ? 'Si' : 'No'}</td>
              <td style={{display:"flex",justifyContent:"center"}}>{producto.precioUnitario}</td>
              {this.state.isAdmin ? <td>
                <button
                    className="btn btn-danger"
                    onClick={() => this.deleteProduct(producto.codigoReferencia)}
                    style={{margin: '5px'}}
                >
                  Eliminar
                </button>
                <Link
                    className="btn btn-primary"
                    to={'/editarproducto/' + producto.codigoReferencia}
                >
                  Actualizar
                </Link>
              </td>:null}

            </tr>
        ))}
        </tbody>
    );
  }
}

export default BodyTableProducts;