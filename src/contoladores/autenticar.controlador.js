import Usuario from "../modelos/usuario.modelo";
import Config from "../configuraciones/configuraciones";

import jwt from "jsonwebtoken";
import { json } from "express";

export const iniciarSesion = async(req, res) => {
    try {

        const { correo, contrasena } = req.body;

        const usuarioBd = await Usuario.findOne({ correo: correo });
        if (usuarioBd) {
            console.log("usuario bd contrasena: ", usuarioBd.contrasena);
            const inicioSesion = await Usuario.inicioSesion(contrasena, usuarioBd.contrasena);
            console.log("antes de if: ", inicioSesion);
            if (inicioSesion) {
                console.log("has iniciadom sesion");
                const token = jwt.sign({ usuario: usuarioBd }, Config.PRIVATE_KEY, {
                    expiresIn: 86400 // son 24 horas en segundos
                });
                return res.json({
                    estado: true,
                    mensaje: token
                });
            } else {
                return res.json({
                    estado: false,
                    mensaje: "las credenciales  no son validas"
                });
                console.log("las credenciales de acceso no son validas");
            }

        } else {
            return res.json({
                estado: false,
                mensaje: "El usuario no existe"
            });

        }

    } catch (error) {
        return res.json({
            estado: false,
            mensaje: "No se ha podido inicar sesion"
        });
    }


}