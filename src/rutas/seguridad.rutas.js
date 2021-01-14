import { Router } from "express";
import * as Auth from "../contoladores/autenticar.controlador";
const rutas = Router();
rutas.post("/inicio-sesion", Auth.iniciarSesion);




export default rutas;