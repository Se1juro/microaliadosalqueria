import React, { Component } from 'react';
import 'font-awesome/css/font-awesome.min.css';
import { Spinner } from 'react-bootstrap';
import SolicitarSoporte from '../views/SolicitarSoporte';
import BodyTableProducts from './BodyTableProducts';
import AdvancedOptionsProducts from './AdvancedOptionsProducts';
import jwt from 'jsonwebtoken';
import { productsServices } from './services/productsServices';
import { StatePagination } from '../customState/StatePagination';
import Pagination from '../pagination/Pagination';
import SelectPagination from '../pagination/SelectPagination';
import SearchProductForm from './SearchProductForm';

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
    currentPage: 1,
    totalPage: 2,
    rows: [],
    countSelect: 0,
    totalDocs: [],
    limitItem: 10,
  };

  async componentDidMount() {
    if (this.props.support) {
      await this.setState({ showSupport: false });
      await this.setState({ managinginventory: true });
    }
    await this.getProducts();

    const token = jwt.decode(this.state.token);
    if (token.rol === 'admin') {
      this.setState({ isAdmin: true });
    }
    if (token.rol === 'microaliado') {
      this.setState({ isMicroAlly: true });
    }
  }
  generatePagination = async () => {
    const pagination = await StatePagination.generatePagination(
      this.state.totalPage,
      this.state.countSelect
    );
    this.setState({ rows: pagination.rows, totalDocs: pagination.totalItems });
  };
  movePages = async (instruction) => {
    if (instruction === 'next') {
      await this.setState({ currentPage: this.state.currentPage + 1 });
      await this.getProducts(this.state.currentPage, this.state.limitItem);
    } else {
      await this.setState({ currentPage: this.state.currentPage - 1 });
      await this.getProducts(this.state.currentPage, this.state.limitItem);
    }
  };
  changeValueOfProductList = async (param) => {
    await this.setState({ viewAllProducts: param });
    await this.getProducts();
  };

  getProducts = async (currentPage, limitItem) => {
    let data;
    if (currentPage && limitItem) {
      data = await productsServices.getProducts(
        this.state.viewAllProducts,
        currentPage,
        limitItem
      );
    } else {
      data = await productsServices.getProducts(this.state.viewAllProducts);
    }
    await this.setState({ countSelect: data.productos.totalDocs });
    await this.setState({ totalPage: data.productos.totalPages });
    await this.setState({ limitItem: data.productos.limit });
    await this.setState({
      productos: data.productos.docs,
      loading: data.loading,
    });
    await this.generatePagination();
  };
  selectNumPage = async (numPage) => {
    await this.setState({ currentPage: numPage });
    await this.getProducts(numPage, this.state.limitItem);
  };
  onInputChange = async (e) => {
    await this.setState({
      [e.target.name]: e.target.value,
    });
    await this.getProducts(this.state.currentPage, this.state.limitItem);
  };
  getProductByCode = async (product) => {
    if (product === undefined) {
      return await this.getProducts();
    }
    this.setState({ productos: product });
  };

  render() {
    const loading = this.state.loading;
    const rowsPagination = this.state.rows;
    return (
      <div className="row">
        <div
          className={
            this.props.support
              ? this.props.support
              : 'col-md-8 cold-md-offset-3'
          }
        >
          <h6>Cantidad de productos</h6>
          <SelectPagination
            changeInput={this.onInputChange}
            limitItem={this.state.limitItem}
            totalDocs={this.state.totalDocs}
          />
          <SearchProductForm
            getProductByCode={this.getProductByCode}
            searchingProductToList={true}
          ></SearchProductForm>
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
                productsToFilter={this.props.products}
                inventoryId={this.props.inventoryId}
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
        <div
          className={
            this.props.support
              ? this.props.support
              : 'col-md-8 cold-md-offset-3'
          }
        >
          {this.state.productos.length <= 1 ? null : (
            <Pagination
              rows={rowsPagination}
              currentPage={this.state.currentPage}
              totalPage={this.state.totalPage}
              movePages={this.movePages}
              selectNumPage={this.selectNumPage}
            />
          )}
        </div>
      </div>
    );
  }
}
