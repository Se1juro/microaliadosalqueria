import React, { Component } from 'react';
import { contactService } from './services/ContactService';
import Swal from 'sweetalert2';

export default class FormContact extends Component {
  state = {
    nombre: '',
    email: '',
    mensaje: '',
  };

  onInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  sendEmail = async (e) => {
    e.preventDefault();
    const res = await contactService.sendEmail(
      this.state.nombre,
      this.state.email,
      this.state.mensaje
    );
    await this.successCal(res);
  };
  successCal = async (res) => {
    if (res.status === 200) {
      await Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: res.data.message,
        showConfirmButton: false,
        timer: 1500,
      });
      await this.setState({ nombre: '', email: '', mensaje: '' });
    }
  };
  render() {
    return (
      <>
        <h3>CONTACTO</h3>
        <div>
          <div>
            <form onSubmit={this.sendEmail}>
              <div className="row">
                <div className="col">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nombre Completo"
                    value={this.state.nombre}
                    onChange={this.onInputChange}
                    name="nombre"
                    id="nombre"
                  />
                </div>
                <div className="col">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="email"
                    name="email"
                    value={this.state.email}
                    onChange={this.onInputChange}
                    id="email"
                  />
                </div>
              </div>
              <div style={{ marginTop: '10px' }}>
                <label htmlFor="mensaje">Mensaje</label>
                <textarea
                  className="form-control"
                  name="mensaje"
                  id="mensaje"
                  value={this.state.mensaje}
                  onChange={this.onInputChange}
                  rows="3"
                ></textarea>
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                style={{ marginTop: '50px' }}
              >
                Enviar
              </button>
            </form>
          </div>
        </div>
      </>
    );
  }
}
