import React, {Component} from 'react';
import SearchUserForm from "./SearchUserForm";
import seller from '../../img/seller.svg'
import arrowRight from '../../img/arrowRight.svg'
import boss from '../../img/boss.svg'
import Swal from "sweetalert2";
import 'animate.css'
import lock from '../../img/look.svg'

class AssignMicroToSeller extends Component {
  state = {
    seller: [],
    microally: []
  }

  componentDidMount() {
    if (!localStorage.getItem("ALERT_MICRO")){
      Swal.fire({
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
          if(result===1){
            localStorage.setItem("ALERT_MICRO","NO_MORE")
          }
        }
      })
    }

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

  render() {
    return (
        <>
          <SearchUserForm getUserByCode={this.getUserByCode} searchingUserToList={true}/>
          <div className="row">
            <div className="card" style={{width: "400px", marginRight: "20px"}}>
              <center><img src={boss} className="card-img-top" alt="vendedor productos lacteos"
                           style={{width: "130px", padding: "10px"}}/></center>
              <div className="card-body">
                <b className="card-text" style={{fontSize: "20px"}}>Microaliado</b>
                <p>{this.state.microally.nombre}</p>
              </div>
            </div>
            <div style={{width: "130px", margin: "30px"}}>
              <img src={arrowRight} alt={"Flecha derecha asignando un microaliado a un vendedor de productos lacteos"}/>
            </div>
            <div className="card" style={{width: "400px", marginRight: "20px"}}>
              <center><img src={seller} className="card-img-top" alt="vendedor productos lacteos"
                           style={{width: "130px", padding: "10px"}}/></center>
              <div className="card-body">
                <b className="card-text" style={{fontSize: "20px"}}>Vendedor</b>
                <p>{this.state.seller.nombre}</p>
              </div>
            </div>
          </div>
        </>
    );
  }
}

export default AssignMicroToSeller;