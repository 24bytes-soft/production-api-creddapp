"use strict";

var _app = _interopRequireDefault(require("./configuraciones/app"));

require("./base-datos/base_datos");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_app.default.listen(3000);

console.log("servidor en puerto: ", 3000);