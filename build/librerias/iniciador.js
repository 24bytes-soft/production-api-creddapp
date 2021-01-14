"use strict";

require("core-js/modules/es.promise.js");

require("core-js/modules/web.dom-collections.iterator.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.crearPermisos = crearPermisos;
exports.crearCargos = crearCargos;
exports.crearUsuariosSuperYAdmin = crearUsuariosSuperYAdmin;
exports.crearModulo = exports.crearTipoPermiso = void 0;

var _tipoPermiso = _interopRequireDefault(require("../modelos/tipoPermiso.model"));

var _modulo = _interopRequireDefault(require("../modelos/modulo.modelo"));

var _permisos = _interopRequireDefault(require("../modelos/permisos.model"));

var _cargo = _interopRequireDefault(require("../modelos/cargo.model"));

var _usuario = _interopRequireDefault(require("../modelos/usuario.modelo"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const crearTipoPermiso = async () => {
  try {
    const numeroTipoPermisos = await _tipoPermiso.default.countDocuments();
    console.log("Total de tipo permisos: ", numeroTipoPermisos);

    if (numeroTipoPermisos > 0) {
      return;
    } else {
      await Promise.all([new _tipoPermiso.default({
        nombre: "aprobar"
      }).save(), new _tipoPermiso.default({
        nombre: "crear"
      }).save(), new _tipoPermiso.default({
        nombre: "crear_solicitar"
      }).save(), new _tipoPermiso.default({
        nombre: "editar"
      }).save(), new _tipoPermiso.default({
        nombre: "editar_solicitar"
      }).save(), new _tipoPermiso.default({
        nombre: "editar_propio"
      }).save(), new _tipoPermiso.default({
        nombre: "borrar"
      }).save(), new _tipoPermiso.default({
        nombre: "borrar_solicitar"
      }).save(), new _tipoPermiso.default({
        nombre: "borrar_propio"
      }).save(), new _tipoPermiso.default({
        nombre: "ver"
      }).save(), new _tipoPermiso.default({
        nombre: "ver_propio"
      }).save()]).then(res => {
        console.log("Tipos permisos creados correctamente: ", res);
      });
    }
  } catch (error) {
    return console.error(error);
  }
};

exports.crearTipoPermiso = crearTipoPermiso;

const crearModulo = async () => {
  try {
    const numeroModulos = await _modulo.default.countDocuments();
    console.log("Total de modulos: ", numeroModulos);

    if (numeroModulos > 0) {
      return;
    } else {
      await Promise.all([new _modulo.default({
        nombre: "creditos"
      }).save(), new _modulo.default({
        nombre: "reportes"
      }).save(), new _modulo.default({
        nombre: "clientes"
      }).save(), new _modulo.default({
        nombre: "gastos"
      }).save(), new _modulo.default({
        nombre: "cobros"
      }).save(), new _modulo.default({
        nombre: "ingresos"
      }).save(), new _modulo.default({
        nombre: "usuarios"
      }).save(), new _modulo.default({
        nombre: "aprobacion"
      }).save(), new _modulo.default({
        nombre: "cargos"
      }).save()]).then(res => {
        console.log("Modulos creados correctamente: ", res);
      });
    }
  } catch (error) {
    return console.error(error);
  }
};

exports.crearModulo = crearModulo;

async function crearPermisos() {
  try {
    //
    // const todosModulos = await modulo.find();
    // const todosTipoPermisos = await tipoPermiso.find();
    //Creando los permisos de super y adminisrador
    const numeroPermisos = await _permisos.default.countDocuments();
    console.log("Total de permisos: ", numeroPermisos);

    if (numeroPermisos > 0) {
      return;
    } else {
      const todosModulos = await _modulo.default.find();
      const todosTipoPermisos = await _tipoPermiso.default.find(); //Creando los permisos de super y adminisrador

      Promise.all([crearPermisosAdmin_Super(todosModulos), crearPermisosCobrador(todosModulos, todosTipoPermisos), crearPermisosSecretariado(todosModulos, todosTipoPermisos)]).then(res => {
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
  const idPermisosSuperYAdmin = await _tipoPermiso.default.find({}, {
    _id: 1
  }); //for para crear permisos super y administrador

  for (let index = 0; index < todosModulos.length; index++) {
    const element = todosModulos[index]; //creando permisos de super

    await new _permisos.default({
      nombre: "super",
      modulo: element._id,
      tipo_permiso: idPermisosSuperYAdmin
    }).save().then(res => {
      contador = contador + 1;
    }); //creando permisos administrador

    await new _permisos.default({
      nombre: "administrador",
      modulo: element._id,
      tipo_permiso: idPermisosSuperYAdmin
    }).save().then(res => {
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
      new _permisos.default({
        nombre: "cobrador",
        modulo: element._id,
        tipo_permiso: await mostrarIdTipoPermisos(["ver", "crear_solicitar", "editar_solicitar", "borrar_solicitar"], todosTipoPermisos)
      }).save().then(res => {
        console.log("Permisos creados cobrador: ", contador++);
      });
    }

    if (element.nombre.toLowerCase() == "aprobacion") {
      //creando permisos de super
      new _permisos.default({
        nombre: "cobrador",
        modulo: element._id,
        tipo_permiso: await mostrarIdTipoPermisos(["ver_propio"], todosTipoPermisos)
      }).save().then(res => {
        console.log("Permisos creados secretariado: ", contador++);
      });
    }

    if (element.nombre.toLowerCase() == "clientes") {
      //creando permisos de super
      new _permisos.default({
        nombre: "cobrador",
        modulo: element._id,
        tipo_permiso: await mostrarIdTipoPermisos(["ver", "crear", "editar_propio", "borrar_propio"], todosTipoPermisos)
      }).save().then(res => {
        console.log("Permisos creados cobrador: ", contador++);
      });
    }

    if (element.nombre.toLowerCase() == "gastos") {
      //creando permisos de super
      new _permisos.default({
        nombre: "cobrador",
        modulo: element._id,
        tipo_permiso: await mostrarIdTipoPermisos(["ver_propio", "crear", "editar_solicitar", "borrar_solicitar"], todosTipoPermisos)
      }).save().then(res => {
        console.log("Permisos creados cobrador: ", contador++);
      });
    }

    if (element.nombre.toLowerCase() == "cobros") {
      //creando permisos de super
      new _permisos.default({
        nombre: "cobrador",
        modulo: element._id,
        tipo_permiso: await mostrarIdTipoPermisos(["ver_propio", "crear", "editar_solicitar", "borrar_solicitar"], todosTipoPermisos)
      }).save().then(res => {
        console.log("Permisos creados cobrador: ", contador++);
      });
    }

    if (element.nombre.toLowerCase() == "ingresos") {
      //creando permisos de super
      new _permisos.default({
        nombre: "cobrador",
        modulo: element._id,
        tipo_permiso: await mostrarIdTipoPermisos(["ver_propio", "crear", "editar_solicitar", "borrar_solicitar"], todosTipoPermisos)
      }).save().then(res => {
        console.log("Permisos creados cobrador: ", contador++);
      });
    }

    if (element.nombre.toLowerCase() == "reportes") {
      //creando permisos de super
      new _permisos.default({
        nombre: "cobrador",
        modulo: element._id,
        tipo_permiso: await mostrarIdTipoPermisos(["ver_propio"], todosTipoPermisos)
      }).save().then(res => {
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
      new _permisos.default({
        nombre: "secretariado",
        modulo: element._id,
        tipo_permiso: await mostrarIdTipoPermisos(["ver", "crear", "editar", "borrar"], todosTipoPermisos)
      }).save().then(res => {
        console.log("Permisos creados secretariado: ", contador++);
      });
    }

    if (element.nombre.toLowerCase() == "aprobacion") {
      //creando permisos de super
      new _permisos.default({
        nombre: "secretariado",
        modulo: element._id,
        tipo_permiso: await mostrarIdTipoPermisos(["ver", "aprobar"], todosTipoPermisos)
      }).save().then(res => {
        console.log("Permisos creados secretariado: ", contador++);
      });
    }

    if (element.nombre.toLowerCase() == "clientes") {
      //creando permisos de super
      new _permisos.default({
        nombre: "secretariado",
        modulo: element._id,
        tipo_permiso: await mostrarIdTipoPermisos(["ver", "crear", "editar", "borrar"], todosTipoPermisos)
      }).save().then(res => {
        console.log("Permisos creados secretariado: ", contador++);
      });
    }

    if (element.nombre.toLowerCase() == "gastos") {
      //creando permisos de super
      new _permisos.default({
        nombre: "secretariado",
        modulo: element._id,
        tipo_permiso: await mostrarIdTipoPermisos(["ver_propio", "crear", "editar_solicitar", "borrar_solicitar"], todosTipoPermisos)
      }).save().then(res => {
        console.log("Permisos creados secretariado: ", contador++);
      });
    }

    if (element.nombre.toLowerCase() == "cobros") {
      //creando permisos de super
      new _permisos.default({
        nombre: "secretariado",
        modulo: element._id,
        tipo_permiso: await mostrarIdTipoPermisos(["ver"], todosTipoPermisos)
      }).save().then(res => {
        console.log("Permisos creados secretariado: ", contador++);
      });
    }

    if (element.nombre.toLowerCase() == "ingresos") {
      //creando permisos de super
      new _permisos.default({
        nombre: "cobrador",
        modulo: element._id,
        tipo_permiso: await mostrarIdTipoPermisos(["ver", "crear", "editar_solicitar", "borrar_solicitar"], todosTipoPermisos)
      }).save().then(res => {
        console.log("Permisos creados cobrador: ", contador++);
      });
    }

    if (element.nombre.toLowerCase() == "reportes") {
      //creando permisos de super
      new _permisos.default({
        nombre: "secretariado",
        modulo: element._id,
        tipo_permiso: await mostrarIdTipoPermisos(["ver"], todosTipoPermisos)
      }).save().then(res => {
        console.log("Permisos creados secretariado: ", contador++);
      });
    }
  }
}

async function crearCargos() {
  const todosPermisos = await _permisos.default.find();
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
    const cargosGeneral = await _cargo.default.find({
      nombre: element
    }, {
      nombre: 1,
      _id: 0
    });

    if (cargosGeneral.length == 0) {
      console.log("no existe, guarda: ", element);
      await new _cargo.default({
        nombre: element
      }).save().then(res => {
        contador_ = contador_ + 1;
      });
    }
  }

  console.log("Cargos creados: ", contador_);
  crearUsuariosSuperYAdmin();
}

async function crearUsuariosSuperYAdmin() {
  const usuarios = await _usuario.default.find();
  console.log("Numero de usuarios: ", usuarios.length);

  if (usuarios.length == 0) {
    const cargos = await _cargo.default.find();

    for (let index = 0; index < cargos.length; index++) {
      const element = cargos[index];

      if (element.nombre == "super") {
        await new _usuario.default({
          correo: "super@super.com",
          contrasena: await _usuario.default.encriptarContrasena("super"),
          nombre: "Super",
          cargo: element._id,
          idUsuarioCreado: "Sistema"
        }).save().then(res => {
          console.log("se ha guadado super");
        });
      }

      if (element.nombre == "administrador") {
        await new _usuario.default({
          correo: "admin@admin.com",
          contrasena: await _usuario.default.encriptarContrasena("admin"),
          nombre: "administrador",
          cargo: element._id,
          idUsuarioCreado: "Sistema"
        }).save().then(res => {
          console.log("se ha guardado administrador");
        });
      }
    }
  }
}