const productoModel = require('../models/productoModel');
const productoController = {};

productoController.getAllProducts = async (req, res, next) => {
  try {
    const productos = await productoModel.find();
    return res.status(200).json(productos);
  } catch (error) {
    next(error);
  }
};
productoController.getProductsActive = async (req, res, next) => {
  try {
    const productos = await productoModel.find({ estado: true });
    return res.status(200).json(productos);
  } catch (error) {
    next(error);
  }
};
productoController.getProductByReference = async (req, res, next) => {
  try {
    const codigoReferencia = req.params.id;
    const producto = await productoModel.find({
      codigoReferencia: codigoReferencia,
    });
    if (!producto) {
      return res.status(409).json({
        status: 'Error',
        message: 'El producto no existe, comuniquese con el administrador',
      });
    }
    return res.status(200).json(producto);
  } catch (err) {
    next(err);
  }
};
productoController.crearProducto = async (req, res, next) => {
  try {
    let error = false;
    const data = {
      codigoReferencia: req.body.codigoReferencia,
      descripcion: req.body.descripcion,
      aplicaIva: req.body.aplicaIva,
      precioUnitario: req.body.precioUnitario,
    };
    const valorData = Object.values(data);
    valorData.forEach((e) => {
      if (e === '' || e === undefined) {
        error = true;
      }
    });
    if (error === false) {
      const comparativaProductos = await productoModel.findOne({
        codigoReferencia: data.codigoReferencia,
      });
      if (comparativaProductos) {
        return res.status(409).json({
          status: 'Error',
          mensaje: 'Ya existe un producto con esta referencia',
        });
      }
      const producto = new productoModel(data);
      await producto.save();
      res.status(200).json({
        status: 'Success',
        message: 'Producto insertado correctamente',
      });
    } else if (error === true) {
      return res.status(409).json({
        status: 'Error',
        mensaje: 'Error con el producto',
      });
    }
  } catch (err) {
    next(err);
  }
};
productoController.editarProductoByReference = async (req, res, next) => {
  try {
    const codigoReferencia = req.params.id;
    let contador = 0;
    const data = {
      descripcion: req.body.descripcion,
      aplicaIva: req.body.iva,
      precioUnitario: req.body.precioUnitario,
      aplicaIva: req.body.aplicaIva,
    };
    for (const iterator of Object.values(req.body)) {
      contador++;
    }
    //El numero de campos que debe tener el cuerpo del body para editar un producto debe ser de 5, si es menor a este numero, faltan datos.
    if (contador < 4) {
      return res.status(409).json({
        status: 'Error',
        message: 'Faltan campos para poder edita el producto',
      });
    }
    const producto = await productoModel.findOne({
      codigoReferencia: codigoReferencia,
    });
    if (!producto) {
      return res.status(409).json({
        status: 'Error',
        message: 'No se ha encontrado el producto',
      });
    }
    await productoModel.findOneAndUpdate(
      { codigoReferencia: codigoReferencia },
      { $set: data },
      {
        new: true,
      }
    );
    return res.status(200).json({
      status: 'Success',
      message: 'Producto Actualizado con exito',
    });
  } catch (error) {
    next(error);
  }
};
productoController.eliminarProductoByReference = async (req, res, next) => {
  try {
    const codigoReferencia = req.params.id;
    const producto = await productoModel.findOne({
      codigoReferencia: codigoReferencia,
    });
    if (!producto) {
      return res.status(409).json({
        status: 'Error',
        message: 'El producto que esta intentando eliminar no existe.',
      });
    }
    if (producto.estado === false) {
      return res.status(409).json({
        status: 'Error',
        message: 'El producto que esta intentando eliminar esta deshabilitado.',
      });
    }
    await productoModel.findOneAndUpdate(
      { codigoReferencia: codigoReferencia },
      { estado: false },
      { new: true },
      (err, doc) => {
        if (err) {
          return res.status(409).json({
            status: 'Error',
            message:
              'Hubo un error con la eliminacion del producto, comunique al administrador',
          });
        }
      }
    );
    return res.status(200).json({
      status: 'success',
      message: 'Producto eliminado con exito',
    });
  } catch (error) {
    next(error);
  }
};
module.exports = productoController;
