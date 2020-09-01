import axios from 'axios';

const inventoryServices = {};
const state = {
  token: localStorage.getItem('token'),
};

inventoryServices.getInventory = async (
  codigoReferencia,
  numPage,
  limitItems
) => {
  try {
    let res;
    if (numPage && limitItems) {
      res = await axios
        .get(
          'http://localhost:4000/inventario/' +
            codigoReferencia +
            '?page=' +
            numPage +
            '&limit=' +
            limitItems,
          {
            headers: {
              Authorization: 'Bearer ' + state.token,
            },
          }
        )
        .catch((err) => {
          return err.response;
        });
    } else {
      res = await axios
        .get('http://localhost:4000/inventario/' + codigoReferencia, {
          headers: {
            Authorization: 'Bearer ' + state.token,
          },
        })
        .catch((err) => {
          return err.response;
        });
    }

    return res.data;
  } catch (error) {
    return error;
  }
};
inventoryServices.addedProductToInventory = async (userId, product, count) => {
  try {
    let newData;
    let stock;
    if (product) {
      stock = parseInt(count);
      newData = {
        codigoUsuario: userId,
        productos: {
          nomProduct: product.descripcion,
          id: product.codigoReferencia,
          cantidad: stock,
        },
      };
    } else {
      newData = {
        codigoUsuario: userId,
      };
    }

    const res = await axios
      .post('http://localhost:4000/inventario/', newData, {
        headers: {
          Authorization: 'Bearer ' + state.token,
        },
      })
      .catch((err) => {
        return err.response;
      });

    return res;
  } catch (error) {
    return error;
  }
};
inventoryServices.deleteProductOfInventory = async (
  idInventory,
  codeProduct
) => {
  const data = {
    codigoProducto: codeProduct,
  };
  try {
    const res = await axios.put(
      `http://localhost:4000/inventario/${idInventory}`,
      data,
      {
        headers: {
          Authorization: 'Bearer ' + state.token,
        },
      }
    );
    return res;
  } catch (error) {
    return error;
  }
};
inventoryServices.increaseStock = async (
  idInventario,
  idUser,
  codeProduct,
  cant
) => {
  try {
    let stock = parseInt(cant);
    const data = {
      codigoUsuario: idUser,
      productos: [
        {
          id: codeProduct,
          cantidad: stock,
        },
      ],
    };
    const res = await axios
      .put(`http://localhost:4000/inventario/agregar/${idInventario}`, data, {
        headers: {
          Authorization: 'Bearer ' + state.token,
        },
      })
      .catch((err) => {
        return err.response;
      });
    return res;
  } catch (error) {
    return error;
  }
};
inventoryServices.subtractStock = async (idUsario, idProduct, stock) => {
  try {
    const data = {
      codigoProducto: idProduct,
      cantidad: stock,
    };
    const res = await axios.put(
      `http://localhost:4000/inventario/restar/${idUsario}`,
      data,
      {
        headers: {
          Authorization: 'Bearer ' + state.token,
        },
      }
    );
    return res;
  } catch (error) {
    return error;
  }
};
export { inventoryServices };
