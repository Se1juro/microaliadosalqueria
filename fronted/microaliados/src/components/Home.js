import React, { Component } from 'react';
import CarouselHome from './views/CarouselHome';
import Daniel from '../img/Desarrollador.svg';
import SolicitarSoporte from './views/SolicitarSoporte';
import webDeveloper from '../img/webDeveloper.svg';
import FormContact from './views/FormContact';
export default class Home extends Component {
  render() {
    return (
      <>
        <CarouselHome></CarouselHome>
        <div
          className="row"
          style={{
            marginTop: '20px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <div>
            <img
              src={Daniel}
              alt="Daniel Morales Desarrollador web"
              width="600em"
            ></img>
          </div>
          <div>
            <SolicitarSoporte />
          </div>
        </div>
        <div className="row">
          <div>
            <img
              src={webDeveloper}
              alt="desarrollo web a la medida"
              width="500px"
            ></img>
          </div>
          <div
            id="contact"
            name="contact"
            style={{
              display: 'flex',
              alignContent: 'center',
              flexDirection: 'column',
              width: '50%',
              marginLeft: '20px',
              fontFamily: 'Roboto Mono, monospace',
            }}
          >
            <FormContact />
          </div>
        </div>
      </>
    );
  }
}
