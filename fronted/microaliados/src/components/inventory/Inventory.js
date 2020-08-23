import React, { Component } from 'react';
import { inventoryServices } from './services/inventoryServices';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import ProductsList from '../products/ProductsList';
import Spinner from 'react-bootstrap/Spinner';
import Modal from 'react-bootstrap/Modal';
class Inventory extends Component {
  state = {
    codigoReferencia: '',
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
  };

  async componentDidMount() {
    await this.getInventory();
    this.fixCardWidth();
  }
  fixCardWidth = () => {
    if (this.state.width < 500) {
      return { width: 500, displayDirection: 'row' };
    } else {
      return { width: 300, displayDirection: 'column' };
    }
  };
  getInventory = async (numPages, limitItems) => {
    if (this.props.match.params.id) {
      let res;
      if (numPages && limitItems) {
        res = await inventoryServices.getInventory(
          this.props.match.params.id,
          numPages,
          limitItems
        );
      } else {
        res = await inventoryServices.getInventory(this.props.match.params.id);
      }

      this.setState({ products: res.productsToFront });
      this.setState({ inventory: res.inventario });
      this.setState({ loadingData: false });
      this.setState({ totalPage: res.totalPages });
      this.setState({ countSelect: res.totalDocuments });
      this.generatePagination();
    }
  };

  generatePagination = () => {
    let rows = [];
    for (let i = 1; i <= this.state.totalPage; i++) {
      rows.push(i);
    }
    let totalProducts = [];
    for (let x = 1; x <= this.state.countSelect; x++) {
      totalProducts.push(x);
    }
    this.setState({ totalProducts });
    this.setState({ rows });
  };

  selectNumPage = async (numPage) => {
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

  render() {
    const inventario = this.state.inventory;
    const loadingData = this.state.loadingData;
    const rowsPagination = this.state.rows;
    return (
      <div className="row">
        <div className="card col-md-6" style={{ width: this.fixCardWidth }}>
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
            <select
              id="limitItem"
              className="form-control col-md-3"
              name="limitItem"
              onChange={this.onInputChange}
            >
              {this.state.totalProducts.map((product) => (
                <option key={product} value={product}>
                  {product}
                </option>
              ))}
            </select>
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
                    <button
                      className="btn btn-primary"
                      style={{
                        height: '30px',
                      }}
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
                  </div>
                  <hr></hr>
                </div>
              ))}
            </div>
            <nav aria-label="Page navigation example">
              <ul className="pagination">
                <li className="page-item">
                  <button className="page-link" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                    <span className="sr-only">Previous</span>
                  </button>
                </li>
                {rowsPagination.map((row) => (
                  <li className="page-item" key={row}>
                    <button
                      className="page-link"
                      onClick={() => this.selectNumPage(row)}
                    >
                      {row}
                    </button>
                  </li>
                ))}
                <li className="page-item">
                  <button className="page-link" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                    <span className="sr-only">Next</span>
                  </button>
                </li>
              </ul>
            </nav>
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
                    products={this.state.products}
                    userId={this.props.match.params.id}
                    updateData={this.getInventory}
                  />
                )}
              </Modal.Body>
            </Modal>
          </div>
        </div>
      </div>
    );
  }
}

export default Inventory;
