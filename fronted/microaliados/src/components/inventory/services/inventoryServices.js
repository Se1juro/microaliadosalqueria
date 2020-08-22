import axios from 'axios';

const inventoryServices = {};
const state = {
  token: localStorage.getItem('token'),
};

inventoryServices.getInventory = async (codigoReferencia) => {
  const res = await axios.get(
    'http://localhost:4000/inventario/' + codigoReferencia,
    {
      headers: {
        Authorization: 'Bearer ' + state.token,
      },
    }
  );
  return res.data;
};
inventoryServices.addedProductToInventory = async (userId, product, count) => {
  const newData = {
    codigoUsuario: userId,
    productos: {
      nomProduct: product.descripcion,
      id: product.codigoReferencia,
      cantidad: count,
    },
  };
  const res = await axios.post('http://localhost:4000/inventario/', newData, {
    headers: {
      Authorization: 'Bearer ' + state.token,
    },
  });
  return res;
};
export { inventoryServices };
