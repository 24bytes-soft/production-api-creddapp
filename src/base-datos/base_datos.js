import mongoose from "mongoose";

const url_bd =
    "mongodb+srv://24bytessoft:221022@cluster0.ffvar.mongodb.net/desarrollo_bd?retryWrites=true&w=majority";

//Conexión a la bd.
mongoose
    .connect(url_bd, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    })
    .then((res) => {
        console.log("Bd conectada");
    })
    .catch((error) => {
        console.log("bd no conectada: ", error);
    });