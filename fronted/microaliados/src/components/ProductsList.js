import React, { Component } from 'react';
import axios from 'axios';
import 'font-awesome/css/font-awesome.min.css';
import CreateProduct from './CreateProduct';
import { Link } from 'react-router-dom';
export default class ProductsList extends Component {
  state = {
    productos: [],
  };
  componentDidMount() {
    this.getNotes();
  }
  deleteProduct = async (id) => {
    await axios.delete('http://localhost:4000/productos/' + id);
    this.getNotes();
  };
  async getNotes() {
    const res = await axios.get('http://localhost:4000/productos/disponibles');
    this.setState({ productos: res.data });
  }
  render() {
    return (
      <div className="row">
        <div className="col-md-8">
          <table className="table table-responsive  mx-auto">
            <thead className="thead-dark">
              <tr>
                <th scope="col">Codigo Referencia</th>
                <th scope="col">Descripcion</th>
                <th scope="col">IVA</th>
                <th scope="col">Precio Unitario</th>
                <th scope="col">Opciones</th>
              </tr>
            </thead>
            <tbody>
              {this.state.productos.map((producto) => (
                <tr key={producto._id}>
                  <td>{producto.codigoReferencia}</td>
                  <td>{producto.descripcion}</td>
                  <td>{producto.aplicaIva ? 'Si' : 'No'}</td>
                  <td>{producto.precioUnitario}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() =>
                        this.deleteProduct(producto.codigoReferencia)
                      }
                      style={{ margin: '5px' }}
                    >
                      Delete
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
          </table>
        </div>
        <div className="col-md-4">
          <CreateProduct></CreateProduct>
        </div>
      </div>
    );
  }
}
