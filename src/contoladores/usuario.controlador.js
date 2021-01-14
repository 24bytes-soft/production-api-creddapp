import Usuario from "../modelos/usuario.modelo";
import Config from "../configuraciones/configuraciones";

import jwt from "jsonwebtoken";
import { isValidObjectId } from "mongoose";

export const crearUsuario = async(req, res) => {
    try {
        const token = req.headers["x-access-token"];

        const decodificado = jwt.verify(token, Config.PRIVATE_KEY);

        const { contrasena } = req.body;

        const nr = new Usuario(req.body);
        nr.idUsuarioCreador = decodificado._id;
        nr.contrasena = await Usuario.encriptarContrasena(contrasena);
        nr.save()
            .then((resp) => {
                return res.json({
                    estado: true,
                    mensaje: "Usuario creado correctamente",
                });
            })
            .catch((er) => {
                return res.json({
                    estado: false,
                    mensaje: "No se ha podido  crear el usuario",
                });
            });
    } catch (error) {
        console.log("error: ", error);
        return res.json({
            estado: false,
            mensaje: "No se ha podido crear el usuario",
        });
    }
};
export const mostrarUsuarios = async(req, res) => {
    return res.json("mostrando USUARIOs");
};
export const mostrarUsuarioId = async(req, res) => {};
export const editarUsuarioId = async(req, res) => {
    try {
        //recogiendo el id enviado por la url y asociandolo a una constante
        const idUsuarioRecibido = req.params.idUsuario;
        const objClienteRecibido = req.body;

        if (objClienteRecibido.contrasena) {
            const as = await Usuario.encriptarContrasena(objClienteRecibido.contrasena);
            objClienteRecibido.contrasena = as;
        }
        console.log("obj: ", objClienteRecibido);
        console.log("id: ", idUsuarioRecibido);
        //se verifica si el id proporcionado es un id de objeto de mongo bd
        if (isValidObjectId(idUsuarioRecibido)) {
            //se busca en la base de datos con el id y se actualiza
            await Usuario
                .findByIdAndUpdate(idUsuarioRecibido, objClienteRecibido, {
                    new: true, //para que retorne el nuevo objeto actualizado
                })
                //cuando el proceso de actualización se lleva satisfactoriamente
                .then((respuesta) => {
                    //Si se actualiza el cliente, se retorna
                    if (respuesta) {
                        //cuando se encuenta un cliente en l a base de datos con el id proporcionado y se actualiza
                        return res.json({
                            estado: true,
                            respuesta: "Se actualizó correctamente el usuario",
                        });
                    } else {

                        //cuando no sse encuenta un cliente o no se actualiza el estado null y se muestra la respuesta
                        return res.json({
                            estado: false,
                            respuesta: "No se ha podido actualizar el usuario con id proporcionado.",
                        });
                    }
                })
                //cuando existe un error en proceso de busqueda
                .catch((error) => {

                    //se retorna el error recogido del cacht
                    return res.json({
                        estado: "error",
                        respuesta: error,
                    });
                });
        } else {

            //cuenado el id proporcionado NO es un id de objeto de mongo bd
            res.json({
                estado: "error",
                respuesta: "El id proporcionado no es un id de objeto válido",
            });
        }
    } catch (er) {

        return res.json({
            estado: "error",
            mensaje: er
        });
    }



};
export const eliminarUsuarioId = async(req, res) => {};