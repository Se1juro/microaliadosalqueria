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
    console.log(data);
  } catch (error) {
    return error;
  }
};
export { distributionService };
