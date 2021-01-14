import { isValidObjectId } from "mongoose";
import Usuario from "../modelos/usuario.modelo";
import Cargos from "../modelos/cargo.model";
import Permisos from "../modelos/permisos.model";
import Modulos from "../modelos/modulo.modelo";
import tPermiso from "../modelos/tipoPermiso.model";
import Config from "../configuraciones/configuraciones";

import jwt from "jsonwebtoken";

export const usuarioRepetido = async(req, res, next) => {
    var correoIngresado = req.body.correo;
    var numeroIdingresado = req.body.numeroId;

    const usuarioRepetidoCorreo = await Usuario.findOne({
        correo: correoIngresado,
    });
    const usuarioRepetidoCc = await Usuario.findOne({
        numeroId: numeroIdingresado,
    });

    if (!usuarioRepetidoCorreo && !usuarioRepetidoCc) {
        next();
        return;
    } else {
        if (usuarioRepetidoCorreo && usuarioRepetidoCc) {
            return res.json({
                estado: false,
                respuesta: "Ya existe un usuario con el correo; " +
                    correoIngresado +
                    " y con el numero id: " +
                    numeroIdingresado,
            });
        }
        if (usuarioRepetidoCorreo) {
            return res.json({
                estado: false,
                respuesta: "Ya existe un usuaraio con el correo; " + correoIngresado,
            });
        }
        if (usuarioRepetidoCc) {
            return res.json({
                estado: false,
                respuesta: "Ya existe un usuario con el numero de id: " + numeroIdingresado,
            });
        }
    }
};
export const verificarPermisos = async(req, res, next) => {
    try {


        const token = req.headers["x-access-token"];
        console.log("token: ", token);

        if (!token) return res.json({
            estado: false,
            mensaje: "No token"
        });


        const decodificado = jwt.verify(token, Config.PRIVATE_KEY);
        console.log("decodificado: ", decodificado);




        await mostrarPermiososIdyModulos(
                decodificado.usuario._id,
                req.body.modulo,
                req.body.tipo
            )
            .then((resp) => {
                if (resp) {
                    next();
                } else {
                    res.json({
                        estado: false,
                        mensaje: "No tienes privilegios suficientes para ésta operación.",
                    });
                }
            })
            .catch((error) => {
                res.json({
                    estado: false,
                    mensaje: "No tienes privilegios suficientes para ésta operación",
                });
            });


    } catch (error) {
        return res.json({
            estado: false,
            mensaje: "Token no valido"

        });

    }

};

async function mostrarPermiososIdyModulos(id, modulo, tipo_permiso) {
    try {
        const idCargo = await Usuario.findOne({ _id: id }, { cargo: 1, _id: 0 });
        console.log("idcargo: ", id);
        const cargoNombre = await Cargos.findOne({ _id: idCargo.cargo }, { nombre: 1, _id: 0 });
        const tipoPermisosModulo = await Permisos.find({
            nombre: cargoNombre.nombre,
        });
        const tipoPermisoBd = await tPermiso.findOne({ nombre: tipo_permiso });
        console.log("tp: ", tipoPermisoBd._id);
        var contador = 0;

        const modulosNombre = await Modulos.findOne({ nombre: modulo });

        for (let index = 0; index < tipoPermisosModulo.length; index++) {
            const moduloID = tipoPermisosModulo[index];

            if (moduloID.modulo.equals(modulosNombre._id)) {
                for (let index_ = 0; index_ < moduloID.tipo_permiso.length; index_++) {
                    const element = moduloID.tipo_permiso[index_];

                    console.log("element: ", element);

                    if (element.equals(tipoPermisoBd._id)) {
                        console.log("Puede crearlo");
                        return true;
                    } else {
                        contador = contador + 1;
                        if (contador == moduloID.tipo_permiso.length) {
                            console.log(
                                "el usuaro no tiene permisos necesarios para  esta operacion"
                            );
                            return false;
                        }
                    }
                }
            }
        }
    } catch (error) {
        return false;
    }
}

export const tok = async(req, res, next) => {
    const token = req.headers["x-access-token"];

    if (!token) return res.json({
        estado: false,
        mensaje: "No token"
    });

    const decodificado = jwt.verify(token, Config.PRIVATE_KEY);

    console.log("token: ", decodificado);
}