"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

const CargoSchema = new _mongoose.Schema({
  nombre: {
    type: String,
    unique: true,
    required: true
  }
}, {
  timestamps: true,
  versionKey: false
});

var _default = (0, _mongoose.model)("Cargos", CargoSchema);

exports.default = _default;