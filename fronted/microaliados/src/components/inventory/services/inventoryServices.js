import axios from "axios";

const inventoryServices = {}
const state = {
  token: localStorage.getItem("token")
}

inventoryServices.getInventory = async (codigoReferencia)=>{
  const res =await axios.get("http://localhost:4000/inventario/" + codigoReferencia,{headers:{
    Authorization:"Bearer "+state.token
    }});
  return res.data;
}
export {inventoryServices}