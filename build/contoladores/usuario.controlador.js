"use strict";

require("core-js/modules/es.promise.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.eliminarUsuarioId = exports.editarUsuarioId = exports.mostrarUsuarioId = exports.mostrarUsuarios = exports.crearUsuario = void 0;

var _usuario = _interopRequireDefault(require("../modelos/usuario.modelo"));

var _configuraciones = _interopRequireDefault(require("../configuraciones/configuraciones"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _mongoose = require("mongoose");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const crearUsuario = async (req, res) => {
  try {
    const token = req.headers["x-access-token"];

    const decodificado = _jsonwebtoken.default.verify(token, _configuraciones.default.PRIVATE_KEY);

    const {
      contrasena
    } = req.body;
    const nr = new _usuario.default(req.body);
    nr.idUsuarioCreador = decodificado._id;
    nr.contrasena = await _usuario.default.encriptarContrasena(contrasena);
    nr.save().then(resp => {
      return res.json({
        estado: true,
        mensaje: "Usuario creado correctamente"
      });
    }).catch(er => {
      return res.json({
        estado: false,
        mensaje: "No se ha podido  crear el usuario"
      });
    });
  } catch (error) {
    console.log("error: ", error);
    return res.json({
      estado: false,
      mensaje: "No se ha podido crear el usuario"
    });
  }
};

exports.crearUsuario = crearUsuario;

const mostrarUsuarios = async (req, res) => {
  return res.json("mostrando USUARIOs");
};

exports.mostrarUsuarios = mostrarUsuarios;

const mostrarUsuarioId = async (req, res) => {};

exports.mostrarUsuarioId = mostrarUsuarioId;

const editarUsuarioId = async (req, res) => {
  try {
    //recogiendo el id enviado por la url y asociandolo a una constante
    const idUsuarioRecibido = req.params.idUsuario;
    const objClienteRecibido = req.body;

    if (objClienteRecibido.contrasena) {
      const as = await _usuario.default.encriptarContrasena(objClienteRecibido.contrasena);
      objClienteRecibido.contrasena = as;
    }

    console.log("obj: ", objClienteRecibido);
    console.log("id: ", idUsuarioRecibido); //se verifica si el id proporcionado es un id de objeto de mongo bd

    if ((0, _mongoose.isValidObjectId)(idUsuarioRecibido)) {
      //se busca en la base de datos con el id y se actualiza
      await _usuario.default.findByIdAndUpdate(idUsuarioRecibido, objClienteRecibido, {
        new: true //para que retorne el nuevo objeto actualizado

      }) //cuando el proceso de actualización se lleva satisfactoriamente
      .then(respuesta => {
        //Si se actualiza el cliente, se retorna
        if (respuesta) {
          //cuando se encuenta un cliente en l a base de datos con el id proporcionado y se actualiza
          return res.json({
            estado: true,
            respuesta: "Se actualizó correctamente el usuario"
          });
        } else {
          //cuando no sse encuenta un cliente o no se actualiza el estado null y se muestra la respuesta
          return res.json({
            estado: false,
            respuesta: "No se ha podido actualizar el usuario con id proporcionado."
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
  } catch (er) {
    return res.json({
      estado: "error",
      mensaje: er
    });
  }
};

exports.editarUsuarioId = editarUsuarioId;

const eliminarUsuarioId = async (req, res) => {};

exports.eliminarUsuarioId = eliminarUsuarioId;