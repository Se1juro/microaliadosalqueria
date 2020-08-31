import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { inventoryServices } from './services/inventoryServices';
import Swal from 'sweetalert2';

export default class ManageProduct extends Component {
  state = {
    cantidad: undefined,
  };

  openWindow = async () => {
    await this.props.close();
  };
  deleteProductOfInventory = async () => {
    const authDelete = await Swal.fire({
      title: '¿Estas seguro de eliminar este producto?',
      text: 'Esta accion puede no ser irreversible',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminalo',
    });
    if (authDelete.value) {
      const res = await inventoryServices.deleteProductOfInventory(
        this.props.inventarioId._id,
        this.props.product.id
      );
      await this.succesCall(res);
      this.openWindow();
    }
  };
  increaseStock = async () => {
    const res = await inventoryServices.increaseStock(
      this.props.inventarioId._id,
      this.props.userId,
      this.props.product.id,
      this.state.cantidad || this.props.product.cantidad
    );
    await this.succesCall(res);
    this.setState({ cantidad: undefined });
  };
  subtractStock = async () => {
    const res = await inventoryServices.subtractStock(
      this.props.userId,
      this.props.product.id,
      this.state.cantidad || this.props.product.cantidad
    );
    await this.succesCall(res);
    this.setState({ cantidad: undefined });
  };

  succesCall = async (res) => {
    if (res.status === 200) {
      await Swal.fire({
        title: res.data.status,
        text: res.data.message,
        icon: 'success',
        timer: 4000,
      });
      await this.props.getData();
    } else {
      await Swal.fire({
        icon: 'error',
        title: 'Algo salio mal',
        text: 'No pudimos realiazr tu operacion',
        timer: 4000,
      });
    }
  };

  onInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    return (
      <>
        <Modal
          size="lg"
          show={this.props.open}
          onHide={this.openWindow}
          aria-labelledby="example-modal-sizes-title-lg"
        >
          <Modal.Header closeButton>
            <Modal.Title>
              Administrar producto{' '}
              {this.props.open ? this.props.inventarioId._id : null}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div className="form-group row">
                <label
                  htmlFor="codeProduct"
                  className="col-sm-2 col-form-label"
                >
                  Codigo Producto
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    disabled
                    className="form-control"
                    id="codeProduct"
                    defaultValue={
                      this.props.open ? this.props.product.id : null
                    }
                  />
                </div>
              </div>
              <div className="form-group row">
                <label
                  htmlFor="nameProduct"
                  className="col-sm-2 col-form-label"
                >
                  Nombre
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    disabled
                    className="form-control"
                    id="nameProduct"
                    defaultValue={
                      this.props.open ? this.props.product.nomProduct : null
                    }
                  />
                </div>
              </div>
              <div className="form-group row">
                <label
                  htmlFor="cantProduct"
                  className="col-sm-2 col-form-label"
                >
                  Cantidad
                </label>
                <div className="col-sm-10">
                  <input
                    type="number"
                    className="form-control"
                    id="cantidad"
                    name="cantidad"
                    onChange={this.onInputChange}
                    defaultValue={
                      this.props.open ? this.props.product.cantidad : null
                    }
                  />
                </div>
              </div>
              <hr />
              <button
                type="button"
                className="btn btn-primary"
                style={{ marginRight: '10px' }}
                onClick={() => this.increaseStock()}
              >
                <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
              </button>
              <button
                type="button"
                className="btn btn-primary "
                style={{ marginRight: '10px' }}
                onClick={this.subtractStock}
              >
                <FontAwesomeIcon icon={faMinus}></FontAwesomeIcon>
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={this.deleteProductOfInventory}
              >
                <FontAwesomeIcon icon={faTrashAlt}></FontAwesomeIcon>
              </button>
            </form>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}
