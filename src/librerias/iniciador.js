import tipoPermiso from "../modelos/tipoPermiso.model";
import modulo from "../modelos/modulo.modelo";
import permisos from "../modelos/permisos.model";
import cargosM from "../modelos/cargo.model";
import usuarioM from "../modelos/usuario.modelo";

export const crearTipoPermiso = async() => {
    try {
        const numeroTipoPermisos = await tipoPermiso.countDocuments();
        console.log("Total de tipo permisos: ", numeroTipoPermisos);
        if (numeroTipoPermisos > 0) {
            return;
        } else {
            await Promise.all([
                new tipoPermiso({ nombre: "aprobar" }).save(),
                new tipoPermiso({ nombre: "crear" }).save(),
                new tipoPermiso({ nombre: "crear_solicitar" }).save(),
                new tipoPermiso({ nombre: "editar" }).save(),
                new tipoPermiso({ nombre: "editar_solicitar" }).save(),
                new tipoPermiso({ nombre: "editar_propio" }).save(),
                new tipoPermiso({ nombre: "borrar" }).save(),
                new tipoPermiso({ nombre: "borrar_solicitar" }).save(),
                new tipoPermiso({ nombre: "borrar_propio" }).save(),
                new tipoPermiso({ nombre: "ver" }).save(),
                new tipoPermiso({ nombre: "ver_propio" }).save(),
            ]).then((res) => {
                console.log("Tipos permisos creados correctamente: ", res);
            });
        }
    } catch (error) {
        return console.error(error);
    }
};

export const crearModulo = async() => {
    try {
        const numeroModulos = await modulo.countDocuments();
        console.log("Total de modulos: ", numeroModulos);
        if (numeroModulos > 0) {
            return;
        } else {
            await Promise.all([
                new modulo({ nombre: "creditos" }).save(),
                new modulo({ nombre: "reportes" }).save(),
                new modulo({ nombre: "clientes" }).save(),
                new modulo({ nombre: "gastos" }).save(),
                new modulo({ nombre: "cobros" }).save(),
                new modulo({ nombre: "ingresos" }).save(),
                new modulo({ nombre: "usuarios" }).save(),
                new modulo({ nombre: "aprobacion" }).save(),
                new modulo({ nombre: "cargos" }).save(),
            ]).then((res) => {
                console.log("Modulos creados correctamente: ", res);
            });
        }
    } catch (error) {
        return console.error(error);
    }
};

export async function crearPermisos() {
    try {
        //
        // const todosModulos = await modulo.find();
        // const todosTipoPermisos = await tipoPermiso.find();

        //Creando los permisos de super y adminisrador

        const numeroPermisos = await permisos.countDocuments();

        console.log("Total de permisos: ", numeroPermisos);
        if (numeroPermisos > 0) {
            return;
        } else {
            const todosModulos = await modulo.find();
            const todosTipoPermisos = await tipoPermiso.find();

            //Creando los permisos de super y adminisrador
            Promise.all([
                crearPermisosAdmin_Super(todosModulos),
                crearPermisosCobrador(todosModulos, todosTipoPermisos),
                crearPermisosSecretariado(todosModulos, todosTipoPermisos),
            ]).then((res) => {
                crearCargos();
                console.log("se usa este");
            });
        }
    } catch (error) {
        return console.error(error);
    }
}

async function mostrarIdTipoPermisos(nombresTipoPermiso, todosTipoPermisos) {
    var idsTipoPermiso = [];
    for (let index = 0; index < nombresTipoPermiso.length; index++) {
        const nombresTipo = nombresTipoPermiso[index];

        for (let index_ = 0; index_ < todosTipoPermisos.length; index_++) {
            const tipoPermiso = todosTipoPermisos[index_];

            if (nombresTipo == tipoPermiso.nombre) {
                idsTipoPermiso.push(tipoPermiso._id);
            }
        }
    }

    return idsTipoPermiso;
}

async function crearPermisosAdmin_Super(todosModulos) {
    var contador = 1;
    const idPermisosSuperYAdmin = await tipoPermiso.find({}, { _id: 1 });

    //for para crear permisos super y administrador
    for (let index = 0; index < todosModulos.length; index++) {
        const element = todosModulos[index];

        //creando permisos de super
        await new permisos({
                nombre: "super",
                modulo: element._id,
                tipo_permiso: idPermisosSuperYAdmin,
            })
            .save()
            .then((res) => {
                contador = contador + 1;
            });

        //creando permisos administrador
        await new permisos({
                nombre: "administrador",
                modulo: element._id,
                tipo_permiso: idPermisosSuperYAdmin,
            })
            .save()
            .then((res) => {
                contador = contador + 1;
            });
    }
    console.log("Permisos creados admin y super: ", contador);
}

async function crearPermisosCobrador(todosModulos, todosTipoPermisos) {
    var contador = 1;

    for (let index = 0; index < todosModulos.length; index++) {
        const element = todosModulos[index];

        if (element.nombre.toLowerCase() == "creditos") {
            //creando permisos de super
            new permisos({
                    nombre: "cobrador",
                    modulo: element._id,
                    tipo_permiso: await mostrarIdTipoPermisos(
                        ["ver", "crear_solicitar", "editar_solicitar", "borrar_solicitar"],
                        todosTipoPermisos
                    ),
                })
                .save()
                .then((res) => {
                    console.log("Permisos creados cobrador: ", contador++);
                });
        }
        if (element.nombre.toLowerCase() == "aprobacion") {
            //creando permisos de super
            new permisos({
                    nombre: "cobrador",
                    modulo: element._id,
                    tipo_permiso: await mostrarIdTipoPermisos(
                        ["ver_propio"],
                        todosTipoPermisos
                    ),
                })
                .save()
                .then((res) => {
                    console.log("Permisos creados secretariado: ", contador++);
                });
        }
        if (element.nombre.toLowerCase() == "clientes") {
            //creando permisos de super
            new permisos({
                    nombre: "cobrador",
                    modulo: element._id,
                    tipo_permiso: await mostrarIdTipoPermisos(
                        ["ver", "crear", "editar_propio", "borrar_propio"],
                        todosTipoPermisos
                    ),
                })
                .save()
                .then((res) => {
                    console.log("Permisos creados cobrador: ", contador++);
                });
        }
        if (element.nombre.toLowerCase() == "gastos") {
            //creando permisos de super
            new permisos({
                    nombre: "cobrador",
                    modulo: element._id,
                    tipo_permiso: await mostrarIdTipoPermisos(
                        ["ver_propio", "crear", "editar_solicitar", "borrar_solicitar"],
                        todosTipoPermisos
                    ),
                })
                .save()
                .then((res) => {
                    console.log("Permisos creados cobrador: ", contador++);
                });
        }
        if (element.nombre.toLowerCase() == "cobros") {
            //creando permisos de super
            new permisos({
                    nombre: "cobrador",
                    modulo: element._id,
                    tipo_permiso: await mostrarIdTipoPermisos(
                        ["ver_propio", "crear", "editar_solicitar", "borrar_solicitar"],
                        todosTipoPermisos
                    ),
                })
                .save()
                .then((res) => {
                    console.log("Permisos creados cobrador: ", contador++);
                });
        }
        if (element.nombre.toLowerCase() == "ingresos") {
            //creando permisos de super
            new permisos({
                    nombre: "cobrador",
                    modulo: element._id,
                    tipo_permiso: await mostrarIdTipoPermisos(
                        ["ver_propio", "crear", "editar_solicitar", "borrar_solicitar"],
                        todosTipoPermisos
                    ),
                })
                .save()
                .then((res) => {
                    console.log("Permisos creados cobrador: ", contador++);
                });
        }
        if (element.nombre.toLowerCase() == "reportes") {
            //creando permisos de super
            new permisos({
                    nombre: "cobrador",
                    modulo: element._id,
                    tipo_permiso: await mostrarIdTipoPermisos(
                        ["ver_propio"],
                        todosTipoPermisos
                    ),
                })
                .save()
                .then((res) => {
                    console.log("Permisos creados cobrador: ", contador++);
                });
        }
    }
}

async function crearPermisosSecretariado(todosModulos, todosTipoPermisos) {
    var contador = 1;

    for (let index = 0; index < todosModulos.length; index++) {
        const element = todosModulos[index];

        if (element.nombre.toLowerCase() == "usuarios") {
            //creando permisos de super
            new permisos({
                    nombre: "secretariado",
                    modulo: element._id,
                    tipo_permiso: await mostrarIdTipoPermisos(
                        ["ver", "crear", "editar", "borrar"],
                        todosTipoPermisos
                    ),
                })
                .save()
                .then((res) => {
                    console.log("Permisos creados secretariado: ", contador++);
                });
        }
        if (element.nombre.toLowerCase() == "aprobacion") {
            //creando permisos de super
            new permisos({
                    nombre: "secretariado",
                    modulo: element._id,
                    tipo_permiso: await mostrarIdTipoPermisos(
                        ["ver", "aprobar"],
                        todosTipoPermisos
                    ),
                })
                .save()
                .then((res) => {
                    console.log("Permisos creados secretariado: ", contador++);
                });
        }
        if (element.nombre.toLowerCase() == "clientes") {
            //creando permisos de super
            new permisos({
                    nombre: "secretariado",
                    modulo: element._id,
                    tipo_permiso: await mostrarIdTipoPermisos(
                        ["ver", "crear", "editar", "borrar"],
                        todosTipoPermisos
                    ),
                })
                .save()
                .then((res) => {
                    console.log("Permisos creados secretariado: ", contador++);
                });
        }
        if (element.nombre.toLowerCase() == "gastos") {
            //creando permisos de super
            new permisos({
                    nombre: "secretariado",
                    modulo: element._id,
                    tipo_permiso: await mostrarIdTipoPermisos(
                        ["ver_propio", "crear", "editar_solicitar", "borrar_solicitar"],
                        todosTipoPermisos
                    ),
                })
                .save()
                .then((res) => {
                    console.log("Permisos creados secretariado: ", contador++);
                });
        }
        if (element.nombre.toLowerCase() == "cobros") {
            //creando permisos de super
            new permisos({
                    nombre: "secretariado",
                    modulo: element._id,
                    tipo_permiso: await mostrarIdTipoPermisos(["ver"], todosTipoPermisos),
                })
                .save()
                .then((res) => {
                    console.log("Permisos creados secretariado: ", contador++);
                });
        }
        if (element.nombre.toLowerCase() == "ingresos") {
            //creando permisos de super
            new permisos({
                    nombre: "cobrador",
                    modulo: element._id,
                    tipo_permiso: await mostrarIdTipoPermisos(
                        ["ver", "crear", "editar_solicitar", "borrar_solicitar"],
                        todosTipoPermisos
                    ),
                })
                .save()
                .then((res) => {
                    console.log("Permisos creados cobrador: ", contador++);
                });
        }
        if (element.nombre.toLowerCase() == "reportes") {
            //creando permisos de super
            new permisos({
                    nombre: "secretariado",
                    modulo: element._id,
                    tipo_permiso: await mostrarIdTipoPermisos(["ver"], todosTipoPermisos),
                })
                .save()
                .then((res) => {
                    console.log("Permisos creados secretariado: ", contador++);
                });
        }
    }
}

export async function crearCargos() {
    const todosPermisos = await permisos.find();
    var cargos = [];
    var contador_ = 0;

    for (let index = 0; index < todosPermisos.length; index++) {
        const element = todosPermisos[index];

        if (index == 0) {
            cargos.push(element.nombre);
        } else {
            if (cargos.indexOf(element.nombre) < 0) {
                cargos.push(element.nombre);
            }
        }
    }

    for (let index = 0; index < cargos.length; index++) {
        const element = cargos[index];
        const cargosGeneral = await cargosM.find({ nombre: element }, { nombre: 1, _id: 0 });
        if (cargosGeneral.length == 0) {
            console.log("no existe, guarda: ", element);
            await new cargosM({
                    nombre: element,
                })
                .save()
                .then((res) => {
                    contador_ = contador_ + 1;
                });
        }
    }
    console.log("Cargos creados: ", contador_);
    crearUsuariosSuperYAdmin();
}

export async function crearUsuariosSuperYAdmin() {
    const usuarios = await usuarioM.find();
    console.log("Numero de usuarios: ", usuarios.length);

    if (usuarios.length == 0) {
        const cargos = await cargosM.find();

        for (let index = 0; index < cargos.length; index++) {
            const element = cargos[index];

            if (element.nombre == "super") {
                await new usuarioM({
                        correo: "super@super.com",
                        contrasena: await usuarioM.encriptarContrasena("super"),
                        nombre: "Super",
                        cargo: element._id,
                        idUsuarioCreado: "Sistema",
                    })
                    .save()
                    .then((res) => {
                        console.log("se ha guadado super");
                    });
            }

            if (element.nombre == "administrador") {
                await new usuarioM({
                        correo: "admin@admin.com",
                        contrasena: await usuarioM.encriptarContrasena("admin"),
                        nombre: "administrador",
                        cargo: element._id,
                        idUsuarioCreado: "Sistema",
                    })
                    .save()
                    .then((res) => {
                        console.log("se ha guardado administrador");
                    });
            }
        }
    }
}