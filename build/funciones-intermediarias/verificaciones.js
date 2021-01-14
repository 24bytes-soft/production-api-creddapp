"use strict";

require("core-js/modules/es.promise.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tok = exports.verificarPermisos = exports.usuarioRepetido = void 0;

var _mongoose = require("mongoose");

var _usuario = _interopRequireDefault(require("../modelos/usuario.modelo"));

var _cargo = _interopRequireDefault(require("../modelos/cargo.model"));

var _permisos = _interopRequireDefault(require("../modelos/permisos.model"));

var _modulo = _interopRequireDefault(require("../modelos/modulo.modelo"));

var _tipoPermiso = _interopRequireDefault(require("../modelos/tipoPermiso.model"));

var _configuraciones = _interopRequireDefault(require("../configuraciones/configuraciones"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const usuarioRepetido = async (req, res, next) => {
  var correoIngresado = req.body.correo;
  var numeroIdingresado = req.body.numeroId;
  const usuarioRepetidoCorreo = await _usuario.default.findOne({
    correo: correoIngresado
  });
  const usuarioRepetidoCc = await _usuario.default.findOne({
    numeroId: numeroIdingresado
  });

  if (!usuarioRepetidoCorreo && !usuarioRepetidoCc) {
    next();
    return;
  } else {
    if (usuarioRepetidoCorreo && usuarioRepetidoCc) {
      return res.json({
        estado: false,
        respuesta: "Ya existe un usuario con el correo; " + correoIngresado + " y con el numero id: " + numeroIdingresado
      });
    }

    if (usuarioRepetidoCorreo) {
      return res.json({
        estado: false,
        respuesta: "Ya existe un usuaraio con el correo; " + correoIngresado
      });
    }

    if (usuarioRepetidoCc) {
      return res.json({
        estado: false,
        respuesta: "Ya existe un usuario con el numero de id: " + numeroIdingresado
      });
    }
  }
};

exports.usuarioRepetido = usuarioRepetido;

const verificarPermisos = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    console.log("token: ", token);
    if (!token) return res.json({
      estado: false,
      mensaje: "No token"
    });

    const decodificado = _jsonwebtoken.default.verify(token, _configuraciones.default.PRIVATE_KEY);

    console.log("decodificado: ", decodificado);
    await mostrarPermiososIdyModulos(decodificado.usuario._id, req.body.modulo, req.body.tipo).then(resp => {
      if (resp) {
        next();
      } else {
        res.json({
          estado: false,
          mensaje: "No tienes privilegios suficientes para ésta operación."
        });
      }
    }).catch(error => {
      res.json({
        estado: false,
        mensaje: "No tienes privilegios suficientes para ésta operación"
      });
    });
  } catch (error) {
    return res.json({
      estado: false,
      mensaje: "Token no valido"
    });
  }
};

exports.verificarPermisos = verificarPermisos;

async function mostrarPermiososIdyModulos(id, modulo, tipo_permiso) {
  try {
    const idCargo = await _usuario.default.findOne({
      _id: id
    }, {
      cargo: 1,
      _id: 0
    });
    console.log("idcargo: ", id);
    const cargoNombre = await _cargo.default.findOne({
      _id: idCargo.cargo
    }, {
      nombre: 1,
      _id: 0
    });
    const tipoPermisosModulo = await _permisos.default.find({
      nombre: cargoNombre.nombre
    });
    const tipoPermisoBd = await _tipoPermiso.default.findOne({
      nombre: tipo_permiso
    });
    console.log("tp: ", tipoPermisoBd._id);
    var contador = 0;
    const modulosNombre = await _modulo.default.findOne({
      nombre: modulo
    });

    for (let index = 0; index < tipoPermisosModulo.length; index++) {
      const moduloID = tipoPermisosModulo[index];

      if (moduloID.modulo.equals(modulosNombre._id)) {
        for (let index_ = 0; index_ < moduloID.tipo_permiso.length; index_++) {
          const element = moduloID.tipo_permiso[index_];
          console.log("element: ", element);

          if (element.equals(tipoPermisoBd._id)) {
            console.log("Puede crearlo");
            return true;
          } else {
            contador = contador + 1;

            if (contador == moduloID.tipo_permiso.length) {
              console.log("el usuaro no tiene permisos necesarios para  esta operacion");
              return false;
            }
          }
        }
      }
    }
  } catch (error) {
    return false;
  }
}

const tok = async (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) return res.json({
    estado: false,
    mensaje: "No token"
  });

  const decodificado = _jsonwebtoken.default.verify(token, _configuraciones.default.PRIVATE_KEY);

  console.log("token: ", decodificado);
};

exports.tok = tok;