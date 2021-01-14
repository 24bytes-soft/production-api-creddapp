"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

const PermososSchema = new _mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  modulo: {
    type: _mongoose.Schema.ObjectId,
    ref: "Modulos"
  },
  tipo_permiso: [{
    type: _mongoose.Schema.ObjectId,
    ref: "Tipo_Permiso"
  }]
}, {
  timestamps: true,
  versionKey: false
});

var _default = (0, _mongoose.model)("Permisos", PermososSchema);

exports.default = _default;