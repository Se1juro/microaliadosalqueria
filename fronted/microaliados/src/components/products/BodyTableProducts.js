import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {productsServices} from "./services/productsServices";

class BodyTableProducts extends Component {
  formatProductDescription = (productDescription) => {
    if (productDescription.length > 15) {
      return productDescription.substr(0, 10) + "..."
    }
    return productDescription
  }
  deleteProduct = async (id) => {
    await productsServices.deleteProduct(id,this.props.onChange)
  };

  render() {
    return (
        <tbody>
        {this.props.productos.map((producto) => (
            <tr key={producto._id}>
              <td className={producto.estado ? null : 'text-danger'}>{producto.codigoReferencia}</td>
              <td>{this.formatProductDescription(producto.descripcion)}</td>
              <td>{producto.aplicaIva ? 'Si' : 'No'}</td>
              <td>{producto.precioUnitario}</td>
              <td>
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
              </td>
            </tr>
        ))}
        </tbody>
    );
  }
}

export default BodyTableProducts;