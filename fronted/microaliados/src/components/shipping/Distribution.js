import React, { Component } from 'react';
import Inventory from '../inventory/Inventory';
import { distributionService } from './services/DistributionService';
import { Spinner } from 'react-bootstrap';
import ModalCount from './ModalCount';

export default class Distribution extends Component {
  state = {
    userId: this.props.match.params.id,
    inventoryId: undefined,
    productsInShipping: [],
    loading: true,
    openModalCount: false,
    currentProduct: {},
  };
  async componentDidMount() {
    await this.getDistribution();
  }
  openModalAndGetDataOfInventory = async (product, inventoryId) => {
    await this.setState({
      inventoryId,
      openModalCount: !this.state.openModalCount,
      currentProduct: product,
    });
  };
  moveToDistribution = async (count) => {
    await distributionService.moveToDistribution(
      this.state.userId,
      this.state.currentProduct,
      count,
      this.state.inventoryId
    );
  };
  getDistribution = async () => {
    const res = await distributionService.getDistribution(this.state.userId);
    await this.setState({
      productsInShipping: res.data.distribution[0].productos,
      loading: false,
    });
  };
  openModalCount = async () => {
    await this.setState({
      openModalCount: !this.state.openModalCount,
    });
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
            moveToDistribution={this.openModalAndGetDataOfInventory}
          ></Inventory>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">Productos en distribucion</div>
            <div className="card-body">
              <h5 className="card-title">Productos</h5>
              <div className="card-text">
                <ul>
                  {loading ? (
                    <Spinner animation="border" variant="primary" />
                  ) : (
                    products.map((product) => (
                      <li key={product.id}>
                        {product.nomProduct} &nbsp;&nbsp;&nbsp;&nbsp; | Codigo:
                        {product.id}&nbsp;&nbsp;&nbsp;&nbsp;| Cantidad :{' '}
                        {product.cantidad}
                      </li>
                    ))
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <ModalCount
          open={this.state.openModalCount}
          close={this.openModalCount}
          moveToDistribution={this.moveToDistribution}
        ></ModalCount>
      </div>
    );
  }
}
