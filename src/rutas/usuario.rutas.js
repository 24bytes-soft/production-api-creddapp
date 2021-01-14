import { Router } from "express";
import * as usuariosCtr from "../contoladores/usuario.controlador";
import * as verificando from "../funciones-intermediarias/verificaciones";

const rutas = Router();

rutas.get("/usuarios", usuariosCtr.mostrarUsuarios);
rutas.get("/usuarios/perfil/:idUsuario", usuariosCtr.mostrarUsuarioId);
rutas.post("/usuarios/crear", [verificando.verificarPermisos, verificando.usuarioRepetido], usuariosCtr.crearUsuario);
rutas.put("/usuarios/perfil/editar/:idUsuario", usuariosCtr.editarUsuarioId);
rutas.delete("/usuarios/perfil/eliminar/:idUsuario", usuariosCtr.eliminarUsuarioId);

export default rutas;