import express from "express";
import morgan from "morgan";
import indexRuta from "../rutas/index.rutas";
import clientesRutas from "../rutas/cliente.rutas";
import usuariosRutas from "../rutas/usuario.rutas";
import seguridad from "../rutas/seguridad.rutas";
import * as iniciador from "../librerias/iniciador";

const app = express();

app.use(morgan("dev"));
app.use(express.json());

//Iniciando configuraciones

iniciador.crearTipoPermiso();
iniciador.crearModulo();
iniciador.crearPermisos();
iniciador.crearCargos();
iniciador.crearUsuariosSuperYAdmin();

const preRuta = "/api";

//se importan las rutas
app.use(preRuta, indexRuta);
app.use(preRuta, clientesRutas);
app.use(preRuta, usuariosRutas);
app.use(preRuta, seguridad);

export default app;