import axios from 'axios';
import Swal from 'sweetalert2';

const productsServices = {};
const state = {
  token: localStorage.getItem('token'),
};
productsServices.getProducts = async (viewAllProducts, numPage, limit) => {
  let res;
  if (!viewAllProducts) {
    if (numPage && limit) {
      res = await axios.get(
        'http://localhost:4000/productos/disponibles?page=' +
          numPage +
          '&limit=' +
          limit,
        {
          headers: {
            Authorization: 'Bearer ' + state.token,
          },
        }
      );
    } else {
      res = await axios.get('http://localhost:4000/productos/disponibles', {
        headers: {
          Authorization: 'Bearer ' + state.token,
        },
      });
    }
  } else {
    if (numPage || limit) {
      res = await axios.get(
        'http://localhost:4000/productos?page=' + numPage + '&limit=' + limit,
        {
          headers: {
            Authorization: 'Bearer ' + state.token,
          },
        }
      );
    } else {
      res = await axios.get('http://localhost:4000/productos', {
        headers: {
          Authorization: 'Bearer ' + state.token,
        },
      });
    }
  }
  return { productos: res.data, loading: false };
};
productsServices.deleteProduct = async (id, fn) => {
  Swal.fire({
    title: '¿Estas seguro de eliminar este producto?',
    text: 'Esta accion puede no ser irreversible',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, eliminalo',
  }).then(async (result) => {
    if (result.value) {
      try {
        const res = await axios.delete(
          'http://localhost:4000/productos/' + id,
          {
            headers: {
              Authorization: 'Bearer ' + state.token,
            },
          }
        );
        if (res.status === 200) {
          await Swal.fire({
            title: 'Eliminado',
            icon: 'success',
            text: 'Tu producto ha sido eliminado',
            timer: 2000,
          }).then(fn());
        } else {
          await Swal.fire({
            icon: 'error',
            title: 'Algo salio mal',
            text: 'No pudimos eliminar tu producto',
            timer: 2000,
          });
        }
      } catch (error) {
        await Swal.fire({
          icon: 'error',
          title: 'Algo salio mal',
          text: 'No pudimos eliminar tu producto',
          timer: 2000,
        });
      }
    }
  });
};
productsServices.updateProduct = async (codigoReferencia, newProduct) => {
  try {
    await axios
      .put('http://localhost:4000/productos/' + codigoReferencia, newProduct, {
        headers: {
          Authorization: 'Bearer ' + state.token,
        },
      })
      .then((res) => {
        try {
          if (res.status === 200) {
            Swal.fire({
              title: 'Registro exitoso',
              text: 'Producto guardado con exito',
              icon: 'success',
              timer: 2000,
            }).then(() => {
              return (window.location.href = '/productos');
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Algo salio mal, comunicate con el administrador',
              timer: 2000,
            });
          }
        } catch (error) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Algo salio mal, comunicate con el administrador',
            timer: 2000,
          });
        }
      });
  } catch (e) {
    console.log(e);
  }
};
productsServices.createProduct = async (newProduct) => {
  try {
    await axios
      .post('http://localhost:4000/productos', newProduct, {
        headers: {
          Authorization: 'Bearer ' + state.token,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          Swal.fire({
            title: 'Registro exitoso',
            text: 'Producto guardado con exito',
            icon: 'success',
            timer: 2000,
          }).then(() => {
            return (window.location.href = '/productos');
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Algo salio mal, comunicate con el administrador',
            timer: 2000,
          });
        }
      });
  } catch (error) {
    return error;
  }
};
productsServices.getProductByCode = async (productId) => {
  try {
    const res = await axios.get(
      `http://localhost:4000/productos/${productId}`,
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
export { productsServices };
