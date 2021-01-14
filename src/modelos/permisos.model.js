import { Schema, model } from "mongoose";

const PermososSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },

    modulo: {
        type: Schema.ObjectId,
        ref: "Modulos",
    },
    tipo_permiso: [{
        type: Schema.ObjectId,
        ref: "Tipo_Permiso",
    }],

}, {
    timestamps: true,
    versionKey: false
});

export default model("Permisos", PermososSchema);