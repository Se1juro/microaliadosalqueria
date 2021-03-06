import React, { Component } from 'react';
import { inventoryServices } from './services/inventoryServices';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTruck } from '@fortawesome/free-solid-svg-icons';
import ProductsList from '../products/ProductsList';
import Spinner from 'react-bootstrap/Spinner';
import Modal from 'react-bootstrap/Modal';
import { StatePagination } from '../customState/StatePagination';
import Pagination from '../pagination/Pagination';
import SelectPagination from '../pagination/SelectPagination';
import ManageProduct from './ManageProduct';
import jwt from 'jsonwebtoken';
import { userService } from '../users/services/userServices';
import { Redirect } from 'react-router-dom';
class Inventory extends Component {
  state = {
    products: [],
    inventory: [],
    loadingData: true,
    width: window.innerWidth,
    openWindowProducts: false,
    currentPage: 1,
    totalPage: 2,
    rows: [],
    countSelect: 0,
    totalProducts: [],
    limitItem: 5,
    productsToFilter: [],
    openEditProduct: false,
    currentProduct: {},
    userId: this.props.userId || this.props.match.params.id,
    inDistribution: this.props.inDistribution || false,
    token: localStorage.getItem('token'),
  };

  async componentDidMount() {
    const token = await jwt.decode(this.state.token);
    const rol = token.rol;
    if (rol === 'vendedor') {
      const seller = await userService.searchByCode(token.codigoReferencia);
      await this.setState({
        userId: seller.resultado.codigoMicroaliadoEncargado,
      });
    }
    await this.getInventory();
    this.fixCardWidth();
    if (this.props.loadInventoryId) {
      if (this.state.inventory.length > 0) {
        await this.props.loadInventoryId(this.state.inventory[0]._id);
      }
    }
  }
  async componentDidUpdate(prevProps) {
    if (prevProps.reloadData !== this.props.reloadData) {
      await this.getInventory();
    }
  }
  fixCardWidth = () => {
    if (this.state.width < 500) {
      return { width: 500, displayDirection: 'row' };
    } else {
      return { width: 300, displayDirection: 'column' };
    }
  };
  getInventory = async (numPages, limitItems) => {
    if (this.state.userId) {
      let res;

      if (numPages && limitItems) {
        res = await inventoryServices.getInventory(
          this.state.userId,
          numPages,
          limitItems
        );
      } else {
        res = await inventoryServices.getInventory(this.state.userId);
      }
      const token = jwt.decode(this.state.token);
      const rol = token.rol;
      if (rol === 'microaliado') {
        if (res.mensaje === 'No existe el inventario') {
          const res = await inventoryServices.addedProductToInventory(
            this.state.userId
          );
          if (res.status === 200) {
            await this.getInventory();
          }
        }
      }
      if (res.status === 'Error') {
        return <Redirect to="/"></Redirect>;
      } else {
        this.setState({
          productsToFilter: res.inventario[0].productos || [],
          products: res.productsToFront,
          inventory: res.inventario,
          loadingData: false,
          totalPage: res.totalPages,
          countSelect: res.totalDocuments,
        });
      }

      this.generatePagination();
    }
  };

  generatePagination = async () => {
    const pagination = await StatePagination.generatePagination(
      this.state.totalPage,
      this.state.countSelect
    );
    this.setState({
      rows: pagination.rows,
      totalProducts: pagination.totalItems,
    });
  };

  selectNumPage = async (numPage) => {
    await this.setState({ currentPage: numPage });
    await this.getInventory(numPage, this.state.limitItem);
  };
  onInputChange = async (e) => {
    await this.setState({
      [e.target.name]: e.target.value,
    });
    await this.getInventory(this.state.currentPage, this.state.limitItem);
  };
  openWindow = () => {
    this.setState({ openWindowProducts: !this.state.openWindowProducts });
  };
  movePages = async (instruction) => {
    if (instruction === 'next') {
      await this.setState({ currentPage: this.state.currentPage + 1 });
      await this.getInventory(this.state.currentPage, this.state.limitItem);
    } else {
      await this.setState({ currentPage: this.state.currentPage - 1 });
      await this.getInventory(this.state.currentPage, this.state.limitItem);
    }
  };
  openEditProduct = async (product) => {
    await this.setState({
      openEditProduct: !this.state.openEditProduct,
      currentProduct: product,
    });
  };

  moveToDistribution = async (product) => {
    await this.props.moveToDistribution(product, this.state.inventory[0]._id);
  };

  render() {
    const inventario = this.state.inventory;
    const loadingData = this.state.loadingData;
    const rowsPagination = this.state.rows;
    return (
      <div className="row">
        <div
          className={
            this.state.inDistribution ? 'card col-md-12' : 'card col-md-6'
          }
          style={{ width: this.fixCardWidth }}
        >
          <div className="card-body">
            <div
              className="card-title"
              style={{
                display: 'flex',
                flexDirection: 'column',
                height: '60px',
              }}
            >
              <div
                className="titleCard"
                style={{
                  width: '100%',
                }}
              >
                <h5>Inventario N°</h5>
              </div>
              {!loadingData ? (
                <div
                  className="codeInventory"
                  style={{ paddingBottom: '10px' }}
                >
                  <label
                    style={{
                      fontSize: '16px',
                    }}
                  >
                    {inventario[0]._id}
                  </label>
                </div>
              ) : (
                'Loading...'
              )}
              <hr />
            </div>
            <h6 className="card-subtitle mb-2 ">
              Cantidad de productos:{' '}
              {!loadingData ? inventario[0].productos.length : 'Loading...'}
            </h6>
            <h6>Numero de items</h6>
            <SelectPagination
              changeInput={this.onInputChange}
              limitItem={this.state.limitItem}
              totalDocs={this.state.totalProducts}
            />

            <hr />
            <div className="card-text">
              {this.state.products.map((product) => (
                <div key={product.id} style={{ display: 'flex' }}>
                  <div style={{ width: '440px' }}>
                    •{' '}
                    <label style={{ marginRight: '5px' }}>
                      {product.nomProduct}
                    </label>{' '}
                    - <b style={{ margin: '10px' }}>Cod N°:</b> {product.id} -
                    <b style={{ margin: '10px' }}> Cant: </b> {product.cantidad}{' '}
                  </div>
                  <div>
                    {this.state.inDistribution ? (
                      <button
                        className="btn btn-primary"
                        style={{
                          height: '30px',
                        }}
                        onClick={() => this.moveToDistribution(product)}
                      >
                        {' '}
                        <FontAwesomeIcon
                          icon={faTruck}
                          style={{
                            cursor: 'pointer',
                            display: 'flex',
                            alignContent: 'center',
                          }}
                        />
                      </button>
                    ) : (
                      <button
                        className="btn btn-primary"
                        style={{
                          height: '30px',
                        }}
                        onClick={() => this.openEditProduct(product)}
                      >
                        {' '}
                        <FontAwesomeIcon
                          icon={faEdit}
                          style={{
                            cursor: 'pointer',
                            display: 'flex',
                            alignContent: 'center',
                          }}
                        />
                      </button>
                    )}
                  </div>
                  <hr></hr>
                </div>
              ))}
            </div>
            <Pagination
              rows={rowsPagination}
              currentPage={this.state.currentPage}
              totalPage={this.state.totalPage}
              movePages={this.movePages}
              selectNumPage={this.selectNumPage}
            />
          </div>
        </div>
        <div>
          <div
            className="col-md-12"
            style={{
              display: 'flex',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {this.state.inDistribution ? null : (
              <>
                <button
                  type="button"
                  className="btn btn-info"
                  onClick={this.openWindow}
                >
                  Ver productos
                </button>
                <Modal
                  size="lg"
                  show={this.state.openWindowProducts}
                  onHide={this.openWindow}
                  aria-labelledby="example-modal-sizes-title-lg"
                >
                  <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                      Productos
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    {this.state.loadingData ? (
                      <Spinner animation="border" variant="primary" />
                    ) : (
                      <ProductsList
                        support="col-md-12 cold-md-offset-3 modal-lg"
                        products={this.state.productsToFilter}
                        userId={this.state.userId}
                        updateData={this.getInventory}
                        inventoryId={inventario[0]}
                      />
                    )}
                  </Modal.Body>
                </Modal>
              </>
            )}
            <ManageProduct
              open={this.state.openEditProduct}
              close={this.openEditProduct}
              product={this.state.currentProduct}
              inventarioId={inventario[0]}
              getData={this.getInventory}
              userId={this.state.userId}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Inventory;
