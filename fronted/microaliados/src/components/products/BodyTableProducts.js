import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { productsServices } from './services/productsServices';
import jwt from 'jsonwebtoken';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { inventoryServices } from '../inventory/services/inventoryServices';
import { Modal } from 'react-bootstrap';
import Swal from 'sweetalert2';
class BodyTableProducts extends Component {
  state = {
    isAdmin: false,
    isMicroAlly: false,
    openModal: false,
    productSelected: {},
    countProduct: 0,
  };

  formatProductDescription = (productDescription) => {
    if (productDescription.length > 15) {
      return productDescription.substr(0, 10) + '...';
    }
    return productDescription;
  };
  deleteProduct = async (id) => {
    await productsServices.deleteProduct(id, this.props.onChange);
  };
  addedToInventory = async (e) => {
    e.preventDefault();
    await this.setState({
      openModal: !this.state.openModal,
    });
    let res;
    let addingExistingProduct = false;
    let codeProductSelected = this.state.productSelected.codigoReferencia;
    if (this.props.productsToFilter) {
      this.props.productsToFilter.forEach((product) => {
        if (product.id === codeProductSelected) {
          addingExistingProduct = true;
        }
      });
    }
    if (addingExistingProduct) {
      res = await inventoryServices.increaseStock(
        this.props.inventoryId._id,
        this.props.userId,
        codeProductSelected,
        this.state.countProduct
      );
    } else {
      res = await inventoryServices.addedProductToInventory(
        this.props.userId,
        this.state.productSelected,
        this.state.countProduct
      );
    }
    if (res.status === 200) {
      await Swal.fire({
        title: res.data.status,
        text: res.data.message,
        icon: 'success',
        timer: 5000,
      }).then(() => this.openCountPronduct, this.props.updateData());
    } else {
      await Swal.fire({
        icon: 'error',
        title: res.data.status,
        text: res.data.mensaje,
        timer: 5000,
      });
    }
  };
  onInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  openCountPronduct = (product) => {
    this.setState({
      openModal: !this.state.openModal,
      productSelected: product,
    });
  };

  componentDidMount() {
    console.log(this.props);
    const token = jwt.decode(localStorage.getItem('token'));
    if (token.rol === 'admin') {
      this.setState({ isAdmin: true });
    }
    if (token.rol === 'microaliado') {
      this.setState({ isMicroAlly: true });
    }
  }

  render() {
    return (
      <>
        <tbody>
          {this.props.productos.map((producto) => (
            <tr key={producto._id}>
              <td className={producto.estado ? null : 'text-danger'}>
                {producto.codigoReferencia}
              </td>
              <td>{this.formatProductDescription(producto.descripcion)}</td>
              <td>{producto.aplicaIva ? 'Si' : 'No'}</td>
              <td style={{ display: 'flex', justifyContent: 'center' }}>
                {producto.precioUnitario}
              </td>
              {this.state.isAdmin ? (
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() =>
                      this.deleteProduct(producto.codigoReferencia)
                    }
                    style={{ margin: '5px' }}
                  >
                    Eliminar
                  </button>
                  <Link
                    className="btn btn-primary"
                    to={'/editarproducto/' + producto.codigoReferencia}
                  >
                    Actualizar
                  </Link>
                </td>
              ) : null}
              {this.state.isMicroAlly && this.props.inventoryId ? (
                <td>
                  <button
                    className="btn btn-primary"
                    style={{ margin: '5px' }}
                    onClick={() => this.openCountPronduct(producto)}
                  >
                    <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
                  </button>
                </td>
              ) : null}
            </tr>
          ))}
        </tbody>
        <Modal
          show={this.state.openModal}
          onHide={() => this.setState({ openModal: !this.state.openModal })}
          aria-labelledby="example-modal-sizes-title-sm"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-sm">
              Cantidad del producto
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <form className="form-inline" onSubmit={this.addedToInventory}>
                <div className="form-group mx-sm-3 mb-2">
                  <label htmlFor="countProduct" className="sr-only">
                    Cantidad
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="countProduct"
                    name="countProduct"
                    placeholder="cantidad"
                    onChange={this.onInputChange}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary mb-2"
                  onClick={this.addedToInventory}
                >
                  Aceptar
                </button>
              </form>
            </div>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

export default BodyTableProducts;
