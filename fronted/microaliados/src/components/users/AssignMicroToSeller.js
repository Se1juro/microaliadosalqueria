import React, {Component} from 'react';
import SearchUserForm from "./SearchUserForm";
import seller from '../../img/seller.svg'
import arrowRight from '../../img/arrowRight.svg'
import boss from '../../img/boss.svg'
import Swal from "sweetalert2";
import 'animate.css'
import lock from '../../img/look.svg'
import {userService} from "./services/userServices";

class AssignMicroToSeller extends Component {
  state = {
    seller: [],
    microally: [],
    listSellers: [],
    listMicroAlly: []
  }

  async componentDidMount() {
    await this.getUsers();
    if (!localStorage.getItem("ALERT_MICRO")) {
      await Swal.fire({
        title: 'Instrucciones',
        imageUrl: lock,
        imageWidth: 200,
        imageHeight: 200,
        imageAlt: 'Recuerda',
        input: 'checkbox',
        inputValue: 0,
        inputPlaceholder:
            'No quiero ver mas esta alerta',
        showClass: {
          popup: 'animate__animated animate__backInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__backOutDown'
        },
        html: `<h3>Recuerda</h3> 
              <p><b>1.</b> Ingresa primero el codigo del microaliado</p>
              <p><b>2.</b> El segundo codigo es el del vendedor</p>`,
        inputValidator: (result) => {
          if (result === 1) {
            localStorage.setItem("ALERT_MICRO", "NO_MORE")
          }
        }
      })
    }

  }

  getUsers = async () => {
    const data = await userService.getUsers();
    let listSeller = [];
    let listMicroAlly = [];
    for (const usuario of data.usuarios.resultado) {
      if (usuario.rol === 'vendedor') {
        await listSeller.push(usuario)
      } else if (usuario.rol === 'microaliado') {
        await listMicroAlly.push(usuario)
      }
    }
    await this.setState({listSellers: listSeller, listMicroAlly: listMicroAlly})
  }

  getUserByCode = (user) => {
    if (user) {
      user.map((user) => {
        if (user.rol === 'microaliado') {
          return this.setState({microally: user})
        } else {
          return this.setState({seller: user})
        }
      })
    } else {
      this.setState({seller: [], microally: []})
    }
  }

  addSeller = (seller) => {
    if (seller._id === this.state.seller._id) {
      return this.setState({seller: []})
    }
    this.setState({seller: seller})
  }
  addMicro = (microally) => {
    if (microally._id === this.state.microally._id) {
      return this.setState({microally: []})
    }
    this.setState({microally: microally})
  }

  asignMicro = async () => {
    await userService.asignMicroToSeller(this.state.seller.codigo, this.state.microally.codigo, this.cleanData)
    await this.getUsers();
  }

  cleanData = () => {
    this.setState({seller: [], microally: []})
  }

  render() {
    return (
        <>
          <SearchUserForm getUserByCode={this.getUserByCode} searchingUserToList={true}/>
          <div className="row">
            <div className="card" style={{width: "20rem", marginRight: "2rem"}}>
              <div style={{display: 'flex', justifyContent: 'center'}}>
                <img src={boss} className="card-img-top" alt="vendedor productos lacteos"
                     style={{width: "8rem", padding: "1rem"}}/>
              </div>
              <div className="card-body">
                <b className="card-text" style={{fontSize: "20px"}}>Microaliado</b>
                <p>Nombre: {this.state.microally.nombre}</p>
                <p>Codigo: {this.state.microally.codigo}</p>
                <p>Cedula: {this.state.microally.documentoIdentidad}</p>
              </div>
            </div>
            <div style={{width: "8rem", margin: "2rem", paddingTop: "2.5rem"}}>
              <img src={arrowRight} alt={"Flecha derecha asignando un microaliado a un vendedor de productos lacteos"}/>
            </div>
            <div className="card" style={{width: "20rem", marginRight: "2rem"}}>
              <div style={{display: 'flex', justifyContent: 'center'}}>
                <img src={seller} className="card-img-top" alt="vendedor productos lacteos"
                     style={{width: "8rem", padding: "1rem"}}/>
              </div>
              <div className="card-body">
                <b className="card-text" style={{fontSize: "20px"}}>Vendedor</b>
                <p>Nombre: {this.state.seller.nombre}</p>
                <p>Codigo: {this.state.seller.codigo}</p>
                <p>Cedula: {this.state.seller.documentoIdentidad}</p>
              </div>
            </div>
            <div style={{display: "flex", alignItems: "center"}}>
              {this.state.seller.length !== 0 && this.state.microally.length !== 0 ?
                  <button type="button" className="btn btn-primary btn-lg h-10 animate__animated animate__bounceInRight"
                          onClick={this.asignMicro}>Confirmar</button> : null}
            </div>

            <div className="card" style={{width: "18rem", marginTop: "2rem", marginRight: "11.2rem"}}>
              <div className="card-header">
                Vendedores
              </div>
              <ul className="list-group list-group-flush">
                {this.state.listSellers.map(seller => (
                    seller.codigoMicroaliadoEncargado ? null :
                        <li className="list-group-item" key={seller._id}
                            style={{display: "flex", justifyContent: "space-between"}}>{seller.nombre}
                          <button type="button"
                                  className={seller._id === this.state.seller._id ? "btn btn-danger" : "btn btn-primary"}
                                  onClick={() => this.addSeller(seller)}>{seller._id === this.state.seller._id ? "Limpiar" : "Seleccionar"}
                          </button>
                        </li>
                ))}
              </ul>
            </div>

            <div className="card" style={{width: "18rem", marginTop: "2rem", marginLeft: "5rem"}}>
              <div className="card-header">
                Microaliados
              </div>
              <ul className="list-group list-group-flush">
                {this.state.listMicroAlly.map(micro => (
                    <li className="list-group-item" key={micro._id}
                        style={{display: "flex", justifyContent: "space-between"}}>{micro.nombre}
                      <button type="button"
                              className={micro._id === this.state.microally._id ? "btn btn-danger" : "btn btn-primary"}
                              onClick={() => this.addMicro(micro)}>{micro._id === this.state.microally._id ? "Limpiar" : "Seleccionar"}
                      </button>
                    </li>
                ))}
              </ul>
            </div>
          </div>
        </>
    );
  }
}

export default AssignMicroToSeller;