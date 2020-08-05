import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import LogoProductos from '../../img/product.svg';
import Axios from 'axios';
import {Spinner} from 'react-bootstrap';
import Swal from 'sweetalert2';

export default class LoginUser extends Component {
  state = {
    codigoReferencia: '',
    password: '',
    logged: false,
    loading: false,
  };
  onInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  onSubmit = async (e) => {
    e.preventDefault();
    const usuario = {
      codigoReferencia: this.state.codigoReferencia,
      password: this.state.password,
    };
    try {
      const res = await Axios.post('http://localhost:4000/login', usuario);
      localStorage.setItem('token', res.data.token);
      this.setState({loading: true, logged: true});
    } catch (error) {
      await Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Algo salio mal, comunicate con el administrador',
      });
    }
    if (this.state.logged) {
      window.location.href = '/productos';
    }
  };

  render() {
    const loading = this.state.loading;
    return (
        <div className="container col-md-6">
          <div style={{display: "flex", justifyContent: 'center'}}>
            <img
                src={LogoProductos}
                alt="Inventario microaliados alqueria"
                width="120px"
                height="120px"
                style={{marginBottom: '10px'}}
            />
            <h3>Iniciar Sesion</h3>
          </div>
          <form className="card" onSubmit={this.onSubmit}>
            <div className="card-body">
              <div className="form-group">
                <label htmlFor="codigoReferencia">Codigo usuario</label>
                <input
                    type="text"
                    className="form-control"
                    id="codigoReferencia"
                    name="codigoReferencia"
                    onChange={this.onInputChange}
                    aria-describedby="emailHelp"
                />
                <small id="emailHelp" className="form-text text-muted">
                  We'll never share your email with anyone else.
                </small>
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Contraseña</label>
                <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    onChange={this.onInputChange}
                />
              </div>
              <button type="submit" className="btn btn-primary btn-block">
                Iniciar Sesion
              </button>
              {loading ? (
                  <div style={{display: "flex", justifyContent: 'center'}}>
                    <Spinner
                        animation="border"
                        variant="primary"
                        style={{
                          marginTop: '10px',
                        }}
                    />
                  </div>
              ) : null}
            </div>
          </form>
          <div className="card" style={{marginTop: '15px'}}>
            <div className="card-body">
              ¿Nuevo en la aplicacion? <Link to="/register">Registrate</Link>
            </div>
          </div>
        </div>
    );
  }
}
