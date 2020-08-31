import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';

export default class ModalDelivered extends Component {
  state = {
    count: 0,
  };
  openWindow = async () => {
    await this.props.close();
  };
  finishDelivery = async (e) => {
    e.preventDefault();
    await this.props.finishDelivery(this.state.count);
  };
  onInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  render() {
    return (
      <div>
        <Modal show={this.props.open} onHide={this.openWindow}>
          <Modal.Header closeButton>
            <Modal.Title>Ingrese la cantidad entregada</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form className="form-inline" onSubmit={this.finishDelivery}>
              <div className="form-group mx-sm-3 mb-2">
                <label htmlFor="inputCount" className="sr-only">
                  Cantidad
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="count"
                  name="count"
                  placeholder="Cantidad"
                  onChange={this.onInputChange}
                />
              </div>
              <button type="submit" className="btn btn-primary mb-2">
                Enviar
              </button>
            </form>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}
