import { Schema, model } from "mongoose";

const ModuloSchema = new Schema({
    nombre: {
        type: String,
        unique: true,
        required: true
    },
}, {
    versionKey: false
});

export default model("Modulos", ModuloSchema);