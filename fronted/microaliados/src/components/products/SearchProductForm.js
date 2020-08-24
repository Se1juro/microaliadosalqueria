import React, { Component } from 'react';
import { productsServices } from './services/productsServices';
import Swal from 'sweetalert2';
export default class SearchProductForm extends Component {
  state = {
    codigo: '',
    searchingProductToList: this.props.searchingProductToList,
    products: [],
  };
  onChangeForm = async (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
    if (e.target.value === '') {
      this.props.getProductByCode();
    }
  };
  cleanData = (e) => {
    e.preventDefault();
    this.setState({ codigo: '' });
    if (this.state.searchingProductToList) {
      this.props.getProductByCode();
    }
  };
  searchUser = async (e) => {
    e.preventDefault();
    if (this.state.codigo) {
      const dataOfProduct = await productsServices.searchByCode(
        this.state.codigo
      );
      const newProduct = [];
      newProduct.push(dataOfProduct.resultado);
      if (newProduct[0] === null || newProduct[0] === undefined) {
        return await Swal.fire({
          icon: 'error',
          title: 'Algo salio mal',
          text: 'No pudimos encontrar el usuario',
          timer: 2000,
        });
      }
      this.setState({ products: newProduct });
      if (this.state.searchingUserToList) {
        this.props.getProductByCode(newProduct);
      }
    }
  };
  render() {
    return (
      <div className={'col-md-12'}>
        <form onSubmit={this.searchProduct}>
          <div className="form-group row">
            <label htmlFor="codigo" className="col-sm-2 col-form-label">
              Codigo
            </label>
            <div className="col-md-4 ">
              <input
                type="text"
                className="form-control"
                id="codigo"
                name={'codigo'}
                onChange={this.onChangeForm}
                value={this.state.codigo}
              />
            </div>
            <div className="col-md-4 m-auto" style={{ margin: '1rem' }}>
              <button type="submit" className="btn btn-primary mb-2">
                Buscar
              </button>
              <button
                className="btn btn-primary mb-2"
                style={{ marginLeft: '1rem' }}
                onClick={this.cleanData}
              >
                Limpiar
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
