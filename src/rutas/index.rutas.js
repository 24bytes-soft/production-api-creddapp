import { Router } from "express";
import * as indexCtr from "../contoladores/index.controlador";
import * as veri from "../funciones-intermediarias/verificaciones";
const rutas = Router();

rutas.get("/", veri.tok, indexCtr.index);


export default rutas;