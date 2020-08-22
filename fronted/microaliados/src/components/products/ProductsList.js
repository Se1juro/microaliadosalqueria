import React, { Component } from 'react';
import 'font-awesome/css/font-awesome.min.css';
import { Spinner } from 'react-bootstrap';
import SolicitarSoporte from '../views/SolicitarSoporte';
import BodyTableProducts from './BodyTableProducts';
import AdvancedOptionsProducts from './AdvancedOptionsProducts';
import jwt from 'jsonwebtoken';
import { productsServices } from './services/productsServices';

export default class ProductsList extends Component {
  state = {
    productos: [],
    loading: true,
    token: localStorage.getItem('token'),
    isAdmin: false,
    isMicroAlly: false,
    viewAllProducts: false,
    showSupport: true,
    managinginventory: false,
    colums: [],
  };

  async componentDidMount() {
    await this.getProducts();
    const token = jwt.decode(this.state.token);
    if (token.rol === 'admin') {
      this.setState({ isAdmin: true });
    }
    if (token.rol === 'microaliado') {
      this.setState({ isMicroAlly: true });
    }
    if (this.props.support) {
      this.setState({ showSupport: false });
      this.setState({ managinginventory: true });
    }
    let productsInventory = this.props.products;
    let productsAlqueria = this.state.productos;
    if (this.state.managinginventory) {
      for (let x = 0; x < productsInventory.length; x++) {
        for (let i = 0; i < productsAlqueria.length; i++) {
          if (
            productsInventory[x].id === productsAlqueria[i].codigoReferencia
          ) {
            productsAlqueria.splice(i, 1);
          }
        }
      }
      this.setState({ productos: productsAlqueria });
    }
    this.addColumns();
  }

  addColumns = async () => {
    let colums = [
      { dataField: 'codigoReferencia', text: 'Codigo Referencia' },
      { dataField: 'descripcion', text: 'Descripcion' },
      { dataField: 'aplicaIVA', text: 'IVA' },
      { dataField: 'precioUnitario', text: 'Precio Unitario' },
    ];
    if (this.state.isAdmin) {
      colums.push({ dataField: 'opciones', text: 'Opciones' });
    }
    if (this.state.isMicroAlly && this.state.managinginventory) {
      colums.push({ dataField: 'opciones', text: 'Opciones' });
    }
  };

  changeValueOfProductList = async (param) => {
    await this.setState({ viewAllProducts: param });
    await this.getProducts();
  };

  getProducts = async () => {
    const data = await productsServices.getProducts(this.state.viewAllProducts);
    this.setState({ productos: data.productos, loading: data.loading });
    console.log(this.state.loading);
    console.log(this.state.productos);
  };

  render() {
    const loading = this.state.loading;
    return (
      <div className="row">
        <div
          className={
            this.props.support
              ? this.props.support
              : 'col-md-8 cold-md-offset-3'
          }
        >
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
                  {this.state.isAdmin ? <th scope="col">Opciones</th> : null}
                  {this.state.isMicroAlly ? (
                    <th scope="col">Opciones</th>
                  ) : null}
                </tr>
              </thead>
              <BodyTableProducts
                productos={this.state.productos}
                onChange={this.getProducts}
                userId={this.props.userId}
                updateData={this.props.updateData}
              />
            </table>
          )}
        </div>
        {this.state.showSupport && !loading ? (
          <div className="col-md-4">
            <SolicitarSoporte />
            {this.state.isAdmin ? (
              <AdvancedOptionsProducts
                changeValueOfProductList={this.changeValueOfProductList}
              />
            ) : null}
          </div>
        ) : null}
      </div>
    );
  }
}
