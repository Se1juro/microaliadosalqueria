import React, { Component } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
export default class CreateProduct extends Component {
  state = {
    codigoReferencia: '',
    descripcion: '',
    aplicaIva: '',
    precioUnitario: 0,
  };
  onInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  onSubmit = async (e) => {
    e.preventDefault();
    if (this.state.aplicaIva === 'si') {
      this.state.aplicaIva = true;
    } else {
      this.state.aplicaIva = false;
    }
    const newProduct = {
      codigoReferencia: this.state.codigoReferencia,
      descripcion: this.state.descripcion,
      aplicaIva: this.state.aplicaIva,
      precioUnitario: this.state.precioUnitario,
    };
    await axios
      .post('http://localhost:4000/productos', newProduct)
      .then((res) => {
        if (res.status === 200) {
          Swal.fire(
            'Registro exitoso',
            'Producto guardado con exito',
            'success'
          ).then(() => {
            window.location.href = '/';
          });
        }
      });
  };
  render() {
    return (
      <div className="card  mx-auto">
        <form onSubmit={this.onSubmit}>
          <h3 className="card-header">CREAR PRODUCTO</h3>
          <div className="card-body">
            <div className="form-group">
              <label htmlFor="codigoReferencia">Codigo Referencia</label>
              <input
                type="text"
                className="form-control"
                id="codigoReferencia"
                name="codigoReferencia"
                onChange={this.onInputChange}
                placeholder="Ingresa el codigo de referencia"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="descripcion">Descripcion</label>
              <input
                type="text"
                className="form-control"
                id="descripcion"
                name="descripcion"
                onChange={this.onInputChange}
                placeholder="Ingresa el nombre del producto"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="aplicaIva">Aplica IVA</label>
              <select
                className="form-control"
                id="aplicaIva"
                name="aplicaIva"
                onChange={this.onInputChange}
                defaultValue="Seleccionar"
              >
                <option>Seleccionar</option>
                <option>Si</option>
                <option>No</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="precioUnitario">Precio unitario</label>
              <input
                type="number"
                className="form-control"
                id="precioUnitario"
                name="precioUnitario"
                onChange={this.onInputChange}
                placeholder="Ingresa el precio del producto"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Crear Producto
            </button>
          </div>
        </form>
      </div>
    );
  }
}
