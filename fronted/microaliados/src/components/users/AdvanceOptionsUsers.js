import React, {Component} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUserSlash} from '@fortawesome/free-solid-svg-icons';

class AdvanceOptionsUsers extends Component {

  state = {
    clicked: false,
    stateOfList: true
  }
  changeValueOfListUsers = () => {
    this.setState({clicked: !this.state.clicked, stateOfList: !this.state.stateOfList})
    this.props.changeValueOfUserList(this.state.stateOfList)
  }


  render() {
    return (
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Opciones avanzadas</h5>
            </div>
            <div className="card-body">
              <button type="button" className="btn btn-primary " onClick={this.changeValueOfListUsers}>
                <FontAwesomeIcon icon={faUserSlash}/> {this.state.clicked ? "Usuarios Activos" : "Usuarios Inactivos"}
              </button>
              <br/>
              {!this.state.stateOfList ?  <b>Los usuarios marcados en letra roja estan inactivos</b>:null}
            </div>
          </div>
        </div>
    );
  }
}

export default AdvanceOptionsUsers;
