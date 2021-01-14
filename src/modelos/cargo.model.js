import { Schema, model } from "mongoose";

const CargoSchema = new Schema({
    nombre: {
        type: String,
        unique: true,
        required: true
    }

}, {
    timestamps: true,
    versionKey: false
});

export default model("Cargos", CargoSchema);