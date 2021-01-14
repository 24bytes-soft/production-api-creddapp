"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _index = _interopRequireDefault(require("../rutas/index.rutas"));

var _cliente = _interopRequireDefault(require("../rutas/cliente.rutas"));

var _usuario = _interopRequireDefault(require("../rutas/usuario.rutas"));

var _seguridad = _interopRequireDefault(require("../rutas/seguridad.rutas"));

var iniciador = _interopRequireWildcard(require("../librerias/iniciador"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();
app.use((0, _morgan.default)("dev"));
app.use(_express.default.json()); //Iniciando configuraciones

iniciador.crearTipoPermiso();
iniciador.crearModulo();
iniciador.crearPermisos();
iniciador.crearCargos();
iniciador.crearUsuariosSuperYAdmin();
const preRuta = "/api"; //se importan las rutas

app.use(preRuta, _index.default);
app.use(preRuta, _cliente.default);
app.use(preRuta, _usuario.default);
app.use(preRuta, _seguridad.default);
var _default = app;
exports.default = _default;