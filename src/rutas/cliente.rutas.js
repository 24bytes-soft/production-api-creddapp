//importanto las dependencias
import { Router } from "express";
import * as clienteCtr from "../contoladores/cliente.controlador";

const rutas = Router();

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

export default rutas;