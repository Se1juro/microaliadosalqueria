import React, {Component} from 'react';
class Logout extends Component {
  changeValueOfSession = () => {
    localStorage.removeItem("token");
    this.props.onClick();
    window.location.href="/";
  }
  render() {
    return (
        <div className="nav-link" style={{cursor:"pointer"}} onClick={this.changeValueOfSession} >
          Cerrar Sesion
        </div>
    );
  }
}

export default Logout;