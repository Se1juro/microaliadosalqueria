import React, { Component } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
export default class CreateProduct extends Component {
  state = {
    codigoReferencia: '',
    descripcion: '',
    aplicaIva: '',
    precioUnitario: 0,
    editing: false,
    token: localStorage.getItem('token'),
  };
  optionsIva = {
    Afirmativo: 'Si',
    Negativo: 'No',
  };
  async componentDidMount() {
    if (this.props.match.params.id) {
      const res = await axios.get(
        'http://localhost:4000/productos/' + this.props.match.params.id,
        {
          headers: {
            Authorization: 'Bearer ' + this.state.token,
          },
        }
      );
      this.setState({
        editing: true,
        codigoReferencia: this.props.match.params.id,
        descripcion: res.data[0].descripcion,
        precioUnitario: res.data[0].precioUnitario,
        aplicaIva: res.data[0].aplicaIva,
        estado: res.data[0].estado,
      });
    }
  }
  onInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
    console.log(e.target.name, e.target.value);
  };
  onSubmit = async (e) => {
    e.preventDefault();
    if (this.state.aplicaIva === 'Si') {
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
    if (this.state.editing) {
      console.log(this.state);
      await axios
        .put(
          'http://localhost:4000/productos/' + this.state.codigoReferencia,
          newProduct,
          {
            headers: {
              Authorization: 'Bearer ' + this.state.token,
            },
          }
        )
        .then((res) => {
          try {
            if (res.status === 200) {
              Swal.fire(
                'Registro exitoso',
                'Producto guardado con exito',
                'success'
              ).then(() => {
                window.location.href = '/productos';
              });
            }
          } catch (error) {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Algo salio mal, comunicate con el administrador',
            });
          }
        });
    } else {
      console.log(this.state);
      try {
        await axios
          .post('http://localhost:4000/productos', newProduct, {
            headers: {
              Authorization: 'Bearer ' + this.state.token,
            },
          })
          .then((res) => {
            if (res.status === 200) {
              Swal.fire(
                'Registro exitoso',
                'Producto guardado con exito',
                'success'
              ).then(() => {
                window.location.href = '/productos';
              });
            }
          });
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Algo salio mal, comunicate con el administrador',
        });
      }
    }
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
                value={this.state.codigoReferencia}
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
                value={this.state.descripcion}
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
                value={this.state.aplicaIva}
              >
                <option>Seleccionar</option>
                <option>{this.optionsIva.Afirmativo}</option>
                <option>{this.optionsIva.Negativo}</option>
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
                value={this.state.precioUnitario}
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
