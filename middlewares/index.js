const validarCampos  = require('../middlewares/validar_campos');
const validarJWT     = require('../middlewares/validar_jwt');
const validarRoles   = require('../middlewares/validar-roles');
const validarArchivo = require('../middlewares/validar-archivo');

module.exports = {
    ...validarCampos,
    ...validarJWT,
    ...validarRoles,
    ...validarArchivo
}