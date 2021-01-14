"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

const Clientes = new _mongoose.Schema({
  nombre: String,
  apellido: String
}, {
  timestamps: true,
  versionKey: false
});

var _default = (0, _mongoose.model)("Clientes", Clientes);

exports.default = _default;