"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

const tipoPermisosSchema = new _mongoose.Schema({
  nombre: {
    type: String,
    unique: true,
    required: true
  }
}, {
  timestamps: true,
  versionKey: false
});

var _default = (0, _mongoose.model)("tipo_permisos", tipoPermisosSchema);

exports.default = _default;