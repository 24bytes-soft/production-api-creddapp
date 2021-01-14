import { Schema, model } from "mongoose";

const tipoPermisosSchema = new Schema({
    nombre: {
        type: String,
        unique: true,
        required: true
    },
}, {
    timestamps: true,
    versionKey: false
});

export default model("tipo_permisos", tipoPermisosSchema);