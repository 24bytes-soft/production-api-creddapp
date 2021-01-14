"use strict";

require("core-js/modules/es.promise.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.iniciarSesion = void 0;

var _usuario = _interopRequireDefault(require("../modelos/usuario.modelo"));

var _configuraciones = _interopRequireDefault(require("../configuraciones/configuraciones"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _express = require("express");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const iniciarSesion = async (req, res) => {
  try {
    const {
      correo,
      contrasena
    } = req.body;
    const usuarioBd = await _usuario.default.findOne({
      correo: correo
    });

    if (usuarioBd) {
      console.log("usuario bd contrasena: ", usuarioBd.contrasena);
      const inicioSesion = await _usuario.default.inicioSesion(contrasena, usuarioBd.contrasena);
      console.log("antes de if: ", inicioSesion);

      if (inicioSesion) {
        console.log("has iniciadom sesion");

        const token = _jsonwebtoken.default.sign({
          usuario: usuarioBd
        }, _configuraciones.default.PRIVATE_KEY, {
          expiresIn: 86400 // son 24 horas en segundos

        });

        return res.json({
          estado: true,
          mensaje: token
        });
      } else {
        return res.json({
          estado: false,
          mensaje: "las credenciales  no son validas"
        });
        console.log("las credenciales de acceso no son validas");
      }
    } else {
      return res.json({
        estado: false,
        mensaje: "El usuario no existe"
      });
    }
  } catch (error) {
    return res.json({
      estado: false,
      mensaje: "No se ha podido inicar sesion"
    });
  }
};

exports.iniciarSesion = iniciarSesion;