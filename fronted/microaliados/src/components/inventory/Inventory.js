import React, { Component } from 'react';
import { inventoryServices } from './services/inventoryServices';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

class Inventory extends Component {
  state = {
    codigoReferencia: '',
    products: [],
    inventory: [],
    loadingData: true,
    width: window.innerWidth,
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
  getInventory = async () => {
    if (this.props.match.params.id) {
      const res = await inventoryServices.getInventory(
        this.props.match.params.id
      );
      this.setState({ products: res.inventario[0].productos });
      this.setState({ inventory: res.inventario });
      this.setState({ loadingData: false });
    }
  };

  render() {
    const inventario = this.state.inventory;
    const loadingData = this.state.loadingData;
    return (
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
              <div className="codeInventory" style={{ paddingBottom: '10px' }}>
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
          <hr />
          <div className="card-text">
            {this.state.products.map((product) => (
              <div key={product.id} style={{ display: 'flex' }}>
                <div style={{ width: '440px' }}>
                  ➽{' '}
                  <label style={{ marginRight: '5px' }}>
                    {product.nomProduct}
                  </label>{' '}
                  - <b style={{ margin: '10px' }}>Codigo:</b> {product.id} -
                  <b style={{ margin: '10px' }}> Cantidad: </b>{' '}
                  {product.cantidad}{' '}
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
        </div>
      </div>
    );
  }
}

export default Inventory;
