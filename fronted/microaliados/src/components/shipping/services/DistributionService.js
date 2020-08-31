import Axios from 'axios';

const distributionService = {};
const state = {
  token: localStorage.getItem('token'),
};
distributionService.getDistribution = async (userId) => {
  try {
    const res = await Axios.get(
      `http://localhost:4000/distribucion/${userId}`,
      {
        headers: {
          Authorization: 'Bearer ' + state.token,
        },
      }
    ).catch((err) => {
      return err.response;
    });
    return res;
  } catch (err) {
    return err;
  }
};
distributionService.moveToDistribution = async (
  idUser,
  product,
  count,
  idInventario
) => {
  try {
    let cantidad = parseInt(count);
    const data = {
      codigoUsuario: idUser,
      productos: {
        nomProduct: product.nomProduct,
        id: product.id,
        cantidad: cantidad,
      },
      codigoInventario: idInventario,
    };
    const res = Axios.post('http://localhost:4000/distribucion/', data, {
      headers: { Authorization: 'Bearer ' + state.token },
    }).catch((err) => {
      return err.response;
    });
    return res;
  } catch (error) {
    return error;
  }
};
distributionService.finishDelivery = async (
  idUser,
  product,
  idInventario,
  count
) => {
  try {
    let cantidad = parseInt(count);
    const data = {
      codigoUsuario: idUser,
      codigoInventario: idInventario,
      productos: [
        {
          id: product.id,
          cantidad: cantidad,
        },
      ],
    };
    const res = Axios.put('http://localhost:4000/distribucion/', data, {
      headers: {
        Authorization: 'Bearer ' + state.token,
      },
    }).catch((err) => {
      return err.response;
    });
    return res;
  } catch (error) {
    return error;
  }
};
export { distributionService };
