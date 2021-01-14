import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

const Usuario = new Schema({
    correo: String,
    contrasena: String,
    numeroId: String,
    nombre: String,
    apellido: String,
    telefono: String,
    cargo: {
        type: Schema.ObjectId,
        ref: "Cargos",
    },
    otros: String,
    idUsuarioCreador: String
}, {
    timestamps: true,
    versionKey: false,
});

Usuario.statics.encriptarContrasena = async(contrasena) => {
    const salt = await bcrypt.genSalt(10);

    return await bcrypt.hash(contrasena, salt);
};

Usuario.statics.inicioSesion = async(contrasenaRecibida, contrasena) => {
    return await bcrypt.compare(contrasenaRecibida, contrasena);
};

export default model("Usuarios", Usuario);