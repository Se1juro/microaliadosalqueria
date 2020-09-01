import React, { Component } from 'react';
import Bienvenido from '../../img/Gestion_Inventario.svg';
import Gestiona from '../../img/Gestiona_Inventario.svg';
import Distribucion from '../../img/Distribucion.svg';
import Productividad from '../../img/Productividad.svg';
export default class CarouselHome extends Component {
  render() {
    return (
      <div style={{ backgroundColor: '#DCDCDC' }}>
        <div
          id="carouselExampleIndicators"
          className="carousel slide"
          data-ride="carousel"
        >
          <ol className="carousel-indicators">
            <li
              data-target="#carouselExampleIndicators"
              data-slide-to="0"
              className="active"
            ></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="3"></li>
          </ol>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src={Bienvenido}
                className="d-block w-100"
                alt="Bienvenidos a la gestion de tu inventario"
                height="400px"
              />
            </div>
            <div className="carousel-item">
              <img
                src={Gestiona}
                className="d-block w-100"
                alt="Gestiona el inventario"
                height="400px"
              />
            </div>
            <div className="carousel-item">
              <img
                src={Distribucion}
                className="d-block w-100"
                alt="Gestiona tus productos en distribucion"
                height="400px"
              />
            </div>
            <div className="carousel-item">
              <img
                src={Productividad}
                className="d-block w-100"
                alt="Aumenta tu productividad"
                height="400px"
              />
            </div>
          </div>
          <a
            className="carousel-control-prev"
            href="#carouselExampleIndicators"
            role="button"
            data-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
              style={{ backgroundColor: 'black', borderRadius: '200px' }}
            ></span>
            <span className="sr-only">Previous</span>
          </a>
          <a
            className="carousel-control-next"
            href="#carouselExampleIndicators"
            role="button"
            data-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
              style={{ backgroundColor: 'black', borderRadius: '200px' }}
            ></span>
            <span className="sr-only">Next</span>
          </a>
        </div>
      </div>
    );
  }
}
