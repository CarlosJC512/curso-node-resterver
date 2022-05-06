const { Router } = require('express');
const { check } = require('express-validator');
const { cargarArchivo, actualizarImagen, mostrarImagen, actualizarImagenCloudinary } = require('../controllers/uploads');
const { coleccionesPermitidas } = require('../helpers');
const { validarArchivo } = require('../middlewares');

const { validarCampos } = require('../middlewares/validar_campos');

const router = Router();

router.post( '/', validarArchivo, cargarArchivo );

router.put( '/:coleccion/:id', [
    validarArchivo,
    check('id', 'Se necesita un id de mongo valido').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas( c, ['users', 'productos'] ) ),
    validarCampos
], actualizarImagenCloudinary);
// actualizarImagen);

router.get('/:coleccion/:id', [
    check('id', 'Se necesita un id de mongo valido').isMongoId(),
    check( 'coleccion' ).custom()
], mostrarImagen);


module.exports = router;