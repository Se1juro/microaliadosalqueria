import React, {Component} from 'react';
import {inventoryServices} from "./services/inventoryServices";

class Inventory extends Component {
  state = {
    codigoReferencia: '',
    products:[]
  }

  async componentDidMount() {
    await this.getInventory()
  }

  getInventory = async () => {
    if (this.props.match.params.id) {
      const res =await inventoryServices.getInventory(this.props.match.params.id);
      this.setState({products:res.productsInInventory})
      console.log(res)
    }
  }

  render() {
    return (
        <div>
          {this.state.products.map((product)=>(<h1 key={product._id}>{product.descripcion}</h1>))}
        </div>
    );
  }
}

export default Inventory;