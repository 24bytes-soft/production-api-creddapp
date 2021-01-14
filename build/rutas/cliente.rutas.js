"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var clienteCtr = _interopRequireWildcard(require("../contoladores/cliente.controlador"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

//importanto las dependencias
const rutas = (0, _express.Router)();
/** comentario general
 * las siguientes rutas crud y otras si las hay,
 * llamandon las funciones desde controladores para su funcionamiento
 **/
//creando un usuario.

rutas.get("/clientes", clienteCtr.mostrarClientes);
rutas.get("/clientes/perfil/:idCliente", clienteCtr.mostrarClienteId);
rutas.post("/clientes/crear", clienteCtr.crearCliente);
rutas.put("/clientes/perfil/editar/:idCliente", clienteCtr.editarClienteId);
rutas.delete("/clientes/perfil/eliminar/:idCliente", clienteCtr.eliminarClienteId);
var _default = rutas;
exports.default = _default;