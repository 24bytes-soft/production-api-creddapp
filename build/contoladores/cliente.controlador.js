"use strict";

require("core-js/modules/es.promise.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.eliminarClienteId = exports.editarClienteId = exports.crearCliente = exports.mostrarClienteId = exports.mostrarClientes = void 0;

var _mongoose = require("mongoose");

var _cliente = _interopRequireDefault(require("../modelos/cliente.modelo"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const mostrarClientes = async (req, res) => {
  try {
    const clienteNuevo = await _cliente.default.find();
    console.log("respuesta: ", clienteNuevo);
    res.json(clienteNuevo);
  } catch (error) {
    res.json(error);
  }
}; //se busca en la base  de datos con un id proporcionado


exports.mostrarClientes = mostrarClientes;

const mostrarClienteId = async (req, res) => {
  try {
    //recogiendo el id enviado por la url y asociandolo a una constante
    const idCliente = req.params.idCliente; //se verifica si el id proporcionado es un id de objeto de mongo bd

    if ((0, _mongoose.isValidObjectId)(idCliente)) {
      //se busca en la base de datos con el id
      await _cliente.default.findById(idCliente) //cuando el proceso de busqueda se lleva satisfactoriamente
      .then(respuesta => {
        //Si se encuenta in cliente, se retorna
        if (respuesta) {
          //cuando se encuenta un cliente en l a base de datos con el id proporcionado
          return res.json({
            estado: "ok",
            respuesta: respuesta
          });
        } else {
          //cuando no sse encuenta un cliente el estado null y se muestra la respuesta
          return res.json({
            estado: null,
            respuesta: "No se ha encontrado un cliente con id proporcionado."
          });
        }
      }) //cuando existe un error en proceso de busqueda
      .catch(error => {
        //se retorna el error recogido del cacht
        return res.json({
          estado: "error",
          respuesta: error
        });
      });
    } else {
      //cuenado el id proporcionado NO es un id de objeto de mongo bd
      res.json({
        estado: "error",
        respuesta: "El id proporcionado no es un id de objeto válido"
      });
    }
  } catch (error) {
    res.json(error);
  }
};

exports.mostrarClienteId = mostrarClienteId;

const crearCliente = async (req, res) => {
  try {
    //se crea una instancia de cliente y se le asocian los datos enviados via post
    const nuevoCliente = new _cliente.default({
      nombre: req.body.nombre,
      apellido: req.body.apellido
    });
    await nuevoCliente.save().then(rest => {
      console.log("cliente guardado", rest);
      return res.json({
        mensaje: "Cliente creado"
      });
    }).catch(error => {
      console.error("error", error);
    });
  } catch (error) {
    res.json(error);
  }
};

exports.crearCliente = crearCliente;

const editarClienteId = async (req, res) => {
  try {
    //recogiendo el id enviado por la url y asociandolo a una constante
    const idCliente = req.params.idCliente;
    const objClienteRecibido = req.body; //se verifica si el id proporcionado es un id de objeto de mongo bd

    if ((0, _mongoose.isValidObjectId)(idCliente)) {
      //se busca en la base de datos con el id y se actualiza
      await _cliente.default.findByIdAndUpdate(idCliente, objClienteRecibido, {
        new: true //para que retorne el nuevo objeto actualizado

      }) //cuando el proceso de actualización se lleva satisfactoriamente
      .then(respuesta => {
        //Si se actualiza el cliente, se retorna
        if (respuesta) {
          //cuando se encuenta un cliente en l a base de datos con el id proporcionado y se actualiza
          return res.json({
            estado: "ok",
            respuesta: respuesta
          });
        } else {
          //cuando no sse encuenta un cliente o no se actualiza el estado null y se muestra la respuesta
          return res.json({
            estado: null,
            respuesta: "No se ha popido actualizar el Cliente con id proporcionado."
          });
        }
      }) //cuando existe un error en proceso de busqueda
      .catch(error => {
        //se retorna el error recogido del cacht
        return res.json({
          estado: "error",
          respuesta: error
        });
      });
    } else {
      //cuenado el id proporcionado NO es un id de objeto de mongo bd
      res.json({
        estado: "error",
        respuesta: "El id proporcionado no es un id de objeto válido"
      });
    }
  } catch (error) {
    res.json(error);
  }
};

exports.editarClienteId = editarClienteId;

const eliminarClienteId = async (req, res) => {
  try {
    //recogiendo el id enviado por la url y asociandolo a una constante
    const idCliente = req.params.idCliente; //se verifica si el id proporcionado es un id de objeto de mongo bd

    if ((0, _mongoose.isValidObjectId)(idCliente)) {
      //se busca en la base de datos con el id y se elimina
      await _cliente.default.findByIdAndDelete(idCliente) //cuando el proceso de eliminar se lleva satisfactoriamente
      .then(respuesta => {
        //Si se elimina el cliente, se retorna
        if (respuesta) {
          //cuando se encuenta un cliente en l a base de datos con el id proporcionado y se elimina
          return res.json({
            estado: "ok",
            respuesta: respuesta
          });
        } else {
          //cuando no sse encuenta un cliente o no se elimina el estado null y se muestra la respuesta
          return res.json({
            estado: null,
            respuesta: "No se ha popido eliminar el Cliente con id proporcionado porque no existe."
          });
        }
      }) //cuando existe un error en proceso de busqueda
      .catch(error => {
        //se retorna el error recogido del cacht
        return res.json({
          estado: "error",
          respuesta: error
        });
      });
    } else {
      //cuenado el id proporcionado NO es un id de objeto de mongo bd
      res.json({
        estado: "error",
        respuesta: "El id proporcionado no es un id de objeto válido"
      });
    }
  } catch (error) {
    res.json(error);
  }
};

exports.eliminarClienteId = eliminarClienteId;