import React, {Component} from 'react';
import 'font-awesome/css/font-awesome.min.css';
import {Spinner} from 'react-bootstrap';
import SolicitarSoporte from '../views/SolicitarSoporte';
import BodyTableProducts from "./BodyTableProducts";
import AdvancedOptionsProducts from "./AdvancedOptionsProducts";
import jwt from 'jsonwebtoken';
import {productsServices} from "./services/productsServices";

export default class ProductsList extends Component {
  state = {
    productos: [],
    loading: true,
    token: localStorage.getItem('token'),
    isAdmin: false,
    viewAllProducts: false,
  };

  async componentDidMount() {
    await this.getProducts();
    const token = jwt.decode(this.state.token);
    if (token.rol === 'admin') {
      this.setState({isAdmin: true})
    }
  }


  changeValueOfProductList = async (param) => {
    await this.setState({viewAllProducts: param});
    await this.getProducts();
  }


  getProducts = async () => {
    const data = await productsServices.getProducts(this.state.viewAllProducts);
    this.setState({productos: data.productos, loading: data.loading})
  }

  render() {
    const loading = this.state.loading;
    return (
        <div className="row">
          <div className="col-md-8 col-md-offset-3">
            {loading ? (
                <Spinner
                    animation="border"
                    variant="primary"
                    style={{marginTop: '10px'}}
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
                  <BodyTableProducts productos={this.state.productos} onChange={this.getProducts}/>
                </table>
            )}
          </div>
          <div className="col-md-4">
            <SolicitarSoporte/>
            {this.state.isAdmin ?
                <AdvancedOptionsProducts changeValueOfProductList={this.changeValueOfProductList}/> : null}
          </div>

        </div>
    );
  }
}
