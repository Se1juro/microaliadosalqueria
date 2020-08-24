import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';

export default class ManageProduct extends Component {
  state = {};
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.open !== prevState.openModalManage) {
      this.setState({ openModalManage: this.props.open });
      console.log(this.props.open);
    }
  }
  openWindow = () => {
    this.props.close();
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
            <Modal.Title>Administrar producto</Modal.Title>
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
                    value="1234"
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
                    disabled
                    className="form-control"
                    id="cantProduct"
                  />
                </div>
              </div>
              <hr />
            </form>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}
