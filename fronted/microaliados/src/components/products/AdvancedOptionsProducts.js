import React, {Component} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBox} from '@fortawesome/free-solid-svg-icons';

class AdvancedOptionsProducts extends Component {

  state = {
    clicked: false,
    stateOfList: true
  }
  changeValueOfProductList = () => {
    this.setState({clicked: !this.state.clicked, stateOfList: !this.state.stateOfList})
    this.props.changeValueOfProductList(this.state.stateOfList)
  }


  render() {
    return (
        <div className="col-md-12" style={{marginTop:"10px"}}>
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Opciones avanzadas</h5>
            </div>
            <div className="card-body">
              <button type="button" className="btn btn-primary " onClick={this.changeValueOfProductList}>
                <FontAwesomeIcon icon={faBox}/> {this.state.clicked ? "Productos Activos" : "Productos Inactivos"}
              </button>
              <br/>
              {!this.state.stateOfList ?  <b>Los productos marcados en letra roja estan inactivos</b>:null}
            </div>
          </div>
        </div>
    );
  }
}

export default AdvancedOptionsProducts;
