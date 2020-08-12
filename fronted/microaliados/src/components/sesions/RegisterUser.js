import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import LogoProductos from '../../img/product.svg';
import Axios from 'axios';
import { Spinner } from 'react-bootstrap';
import Swal from 'sweetalert2';

export default class RegisterUser extends Component {
  async componentDidMount() {
    await this.getDepartments();
  }
  state = {
    codigo: 0,
    password: '',
    nombre: '',
    municipio: '',
    telefono: 0,
    citiesOfNarino: [],
    citiesOfCauca: [],
    department: '',
    loading: false,
    documento: 0,
  };
  async getDepartments() {
    const res = await Axios.get(
      'https://www.datos.gov.co/resource/xdk5-pm3f.json'
    );
    const data = res.data;
    let dataMunicipioCauca = [];
    let dataMunicipioNarino = [];
    for (const iterator of data) {
      if (iterator.departamento === 'Cauca') {
        dataMunicipioCauca.push(iterator.municipio);
      }
      if (iterator.departamento === 'Nariño') {
        dataMunicipioNarino.push(iterator.municipio);
      }
      this.setState({
        citiesOfNarino: dataMunicipioNarino,
        citiesOfCauca: dataMunicipioCauca,
      });
    }
  }
  createSelectMunicipio = (department) => {
    let municipios = [];
    if (department === 'Cauca') {
      this.state.citiesOfCauca.map((city) =>
        municipios.push(
          <option key={city} value={city}>
            {city}
          </option>
        )
      );
    } else if (department === 'Nariño') {
      this.state.citiesOfNarino.map((city) =>
        municipios.push(
          <option key={city} value={city}>
            {city}
          </option>
        )
      );
    } else {
      municipios.push(<option key="none">Selecciona departamento</option>);
    }
    return municipios;
  };
  onInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  onSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      codigo: this.state.codigo,
      password: this.state.password,
      nombre: this.state.nombre,
      documento: this.state.documento,
      departamento: this.state.department,
      municipio: this.state.municipio,
      telefono: this.state.telefono,
    };
    try {
      const res = await Axios.post('http://localhost:4000/usuarios', newUser);
      localStorage.setItem('token', res.data.token);
      if (res.status === 200) {
        Swal.fire(
          'Registro exitoso',
          'Producto guardado con exito',
          'success'
        ).then(() => {
          window.location.href = '/';
          console.log(res);
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Algo salio mal, comunicate con el administrador',
      });
    }
  };

  render() {
    const loading = this.state.loading;
    const department = this.state.department;
    return (
      <div className="container col-md-6">
        <div>
          <div style={{display:"flex",alignContent:"center"}}>
            <img
              src={LogoProductos}
              alt="Inventario microaliados alqueria"
              width="120px"
              height="120px"
              style={{ marginBottom: '10px' }}
            />
            <h3>Registrarse</h3>
          </div>
        </div>
        <form className="card" onSubmit={this.onSubmit}>
          <div className="card-body">
            <div className="form-group">
              <label htmlFor="codigoReferencia">Codigo usuario</label>
              <input
                type="text"
                className="form-control"
                id="codigo"
                name="codigo"
                onChange={this.onInputChange}
                aria-describedby="emailHelp"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                onChange={this.onInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="nombre">Nombre</label>
              <input
                type="text"
                className="form-control"
                id="nombre"
                name="nombre"
                placeholder="Nombre completo"
                onChange={this.onInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="documento">Documento</label>
              <input
                type="number"
                className="form-control"
                id="documento"
                name="documento"
                placeholder="Documento de identidad"
                onChange={this.onInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="departamento">Departamento</label>
              <select
                className="form-control"
                id="departamento"
                name="department"
                onChange={this.onInputChange}
              >
                <option>Seleccionar</option>
                <option>Cauca</option>
                <option>Nariño</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="municipio">Municipio</label>
              <select
                className="form-control"
                id="municipio"
                name="municipio"
                onChange={this.onInputChange}
                value={this.state.municipio}
              >
                <option>Seleccionar</option>
                {this.createSelectMunicipio(department)}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="telefono">Telefono</label>
              <input
                type="number"
                className="form-control"
                id="telefono"
                name="telefono"
                placeholder="Telefono celular"
                onChange={this.onInputChange}
              />
            </div>
            <button type="submit" className="btn btn-primary btn-block">
              Registrarse
            </button>
            {loading ? (
              <div style={{display:"Flex", justifyContent:"center"}}>
                <Spinner
                  animation="border"
                  variant="primary"
                  style={{ marginTop: '10px' }}
                />
              </div>
            ) : null}
          </div>
        </form>
        <div className="card" style={{ marginTop: '15px' }}>
          <div className="card-body">
            ¿Ya tienes una cuenta? <Link to="/login">Inicia Sesion</Link>
          </div>
        </div>
      </div>
    );
  }
}
