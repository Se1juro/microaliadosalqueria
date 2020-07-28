import React, { Component } from 'react';
import axios from 'axios';
import 'font-awesome/css/font-awesome.min.css';
import { Link } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import Swal from 'sweetalert2';
import SolicitarSoporte from '../views/SolicitarSoporte';
export default class ProductsList extends Component {
  state = {
    productos: [],
    loading: true,
    token: localStorage.getItem('token'),
  };
  componentDidMount() {
    this.getProducts();
  }
  deleteProduct = async (id) => {
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
        Swal.fire('Eliminado', 'Tu producto ha sido eliminado', 'success');
        try {
          await axios.delete('http://localhost:4000/productos/' + id, {
            headers: {
              Authorization: 'Bearer ' + this.state.token,
            },
          });
          this.getProducts();
        } catch (error) {
          Swal.fire({
            icon: 'error',
            title: 'Algo salio mal',
            text: 'No pudimos eliminar tu producto',
          });
        }
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Algo salio mal',
          text: 'No pudimos eliminar tu producto',
        });
      }
    });
  };
  async getProducts() {
    const res = await axios.get('http://localhost:4000/productos/disponibles', {
      headers: {
        Authorization: 'Bearer ' + this.state.token,
      },
    });
    this.setState({ productos: res.data, loading: false });
  }
  render() {
    const loading = this.state.loading;
    return (
      <div className="row">
        <div className="col-md-8">
          <center>
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
              </table>
            )}
          </center>
        </div>
        <SolicitarSoporte></SolicitarSoporte>
      </div>
    );
  }
}
