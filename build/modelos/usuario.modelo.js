"use strict";

require("core-js/modules/es.promise.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Usuario = new _mongoose.Schema({
  correo: String,
  contrasena: String,
  numeroId: String,
  nombre: String,
  apellido: String,
  telefono: String,
  cargo: {
    type: _mongoose.Schema.ObjectId,
    ref: "Cargos"
  },
  otros: String,
  idUsuarioCreador: String
}, {
  timestamps: true,
  versionKey: false
});

Usuario.statics.encriptarContrasena = async contrasena => {
  const salt = await _bcryptjs.default.genSalt(10);
  return await _bcryptjs.default.hash(contrasena, salt);
};

Usuario.statics.inicioSesion = async (contrasenaRecibida, contrasena) => {
  return await _bcryptjs.default.compare(contrasenaRecibida, contrasena);
};

var _default = (0, _mongoose.model)("Usuarios", Usuario);

exports.default = _default;