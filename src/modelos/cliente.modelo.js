import { Schema, model } from "mongoose";

const Clientes = new Schema({
    nombre: String,
    apellido: String
}, {
    timestamps: true,
    versionKey: false
});

export default model("Clientes", Clientes);