import React, {Component} from 'react';

class ButtonNavBar extends Component {
  render() {
    return (
        <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"/>
        </button>
    );
  }
}

export default ButtonNavBar;