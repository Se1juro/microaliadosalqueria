import React, { Component } from 'react';
import Inventory from '../inventory/Inventory';
import { distributionService } from './services/DistributionService';
import { Spinner } from 'react-bootstrap';
import ModalCount from './ModalCount';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruckLoading } from '@fortawesome/free-solid-svg-icons';
import ModalDelivered from './ModalDelivered';
import jwt from 'jsonwebtoken';
import { userService } from '../users/services/userServices';
import moment from 'moment-timezone';

export default class Distribution extends Component {
  state = {
    userId: this.props.match.params.id,
    inventoryId: undefined,
    productsInShipping: [],
    loading: true,
    openModalCount: false,
    openModalDelivered: false,
    currentProduct: {},
    reloadData: false,
    currentProductDelivery: {},
    token: localStorage.getItem('token'),
    hourDelivery: undefined,
  };
  async componentDidMount() {
    const token = jwt.decode(this.state.token);
    const rol = token.rol;
    if (rol === 'vendedor') {
      const seller = await userService.searchByCode(token.codigoReferencia);
      await this.setState({
        userId: seller.resultado.codigoMicroaliadoEncargado,
      });
    }
    await this.getDistribution();
    let fecha = this.state.hourDelivery;
    let horaMoment = moment(fecha);
    let horabuena = horaMoment.tz('America/Bogota').format('LLL');
    this.setState({ hourDelivery: horabuena });
  }
  openModalAndGetDataOfInventory = async (product, inventoryId) => {
    await this.setState({
      inventoryId,
      openModalCount: !this.state.openModalCount,
      currentProduct: product,
    });
  };
  moveToDistribution = async (count) => {
    const res = await distributionService.moveToDistribution(
      this.state.userId,
      this.state.currentProduct,
      count,
      this.state.inventoryId
    );
    await this.succesCall(res);
    await this.setState({ reloadData: !this.state.reloadData });
    await this.getDistribution();
  };
  productDelivered = async (count) => {
    const res = await distributionService.finishDelivery(
      this.state.userId,
      this.state.currentProductDelivery,
      this.state.inventoryId,
      count
    );
    await this.succesCall(res);
    await this.setState({ reloadData: !this.state.reloadData });
    await this.getDistribution();
  };

  getDistribution = async () => {
    const res = await distributionService.getDistribution(this.state.userId);

    if (res.data.distribution.length !== 0) {
      await this.setState({
        productsInShipping: res.data.distribution[0].productos,
        loading: false,
        hourDelivery: res.data.distribution[0].horaSalida,
      });
    }
  };
  openModalCount = async () => {
    await this.setState({
      openModalCount: !this.state.openModalCount,
    });
  };
  openModalDelivered = async (product) => {
    await this.setState({
      openModalDelivered: !this.state.openModalDelivered,
      currentProductDelivery: product,
    });
  };

  succesCall = async (res) => {
    if (res.status === 200) {
      await Swal.fire({
        title: res.data.status,
        text: res.data.message,
        icon: 'success',
        timer: 4000,
      });
      await this.getDistribution();
    } else {
      await Swal.fire({
        icon: 'error',
        title: res.data.status,
        text: res.data.message,
        timer: 4000,
      });
    }
  };
  loadInventoryId = async (inventoryId) => {
    await this.setState({ inventoryId });
  };

  render() {
    const products = this.state.productsInShipping;
    const loading = this.state.loading;
    return (
      <div className="row">
        <div className="col-md-6">
          <Inventory
            userId={this.props.match.params.id}
            inDistribution={true}
            reloadData={this.state.reloadData}
            loadInventoryId={this.loadInventoryId}
            moveToDistribution={this.openModalAndGetDataOfInventory}
          ></Inventory>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h3>Productos en distribución</h3>
              <h6>Hora de salida: {this.state.hourDelivery}</h6>
            </div>
            <div className="card-body">
              <h5 className="card-title">Productos</h5>
              <div className="card-text">
                <ul>
                  {loading ? (
                    <Spinner animation="border" variant="primary" />
                  ) : (
                    products.map((product) => (
                      <li key={product.id} style={{ marginBottom: '10px' }}>
                        {product.nomProduct} &nbsp;&nbsp;&nbsp;&nbsp; | Codigo:
                        {product.id}&nbsp;&nbsp;&nbsp;&nbsp;| Cantidad :{' '}
                        {product.cantidad}
                        <button
                          className="btn btn-primary"
                          style={{ marginLeft: '10px' }}
                          onClick={() => this.openModalDelivered(product)}
                        >
                          <FontAwesomeIcon
                            icon={faTruckLoading}
                          ></FontAwesomeIcon>
                        </button>
                      </li>
                    ))
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <ModalDelivered
          open={this.state.openModalDelivered}
          close={this.openModalDelivered}
          finishDelivery={this.productDelivered}
        ></ModalDelivered>
        <ModalCount
          open={this.state.openModalCount}
          close={this.openModalCount}
          moveToDistribution={this.moveToDistribution}
        ></ModalCount>
      </div>
    );
  }
}
