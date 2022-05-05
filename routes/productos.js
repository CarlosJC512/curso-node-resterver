const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT, validarCampos, tieneRol, adminRole } = require('../middlewares');

const { login, googleSignIn } = require('../controllers/auth');

const { crearProducto, 
        obtenerProductos, 
        obtenerProducto, 
        actualizarProducto, 
        borrarProducto } = require('../controllers/productos');

const { existeProductoId, existeCategoriaId } = require('../helpers/db-validators');


const router = Router();

router.get('/', obtenerProductos);

router.get('/:id', [
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom( existeProductoId ),
    validarCampos
], obtenerProducto);

router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'No es un id valido').isMongoId(),
    check('categoria').custom( existeCategoriaId ),
    validarCampos
], crearProducto
);

router.put('/:id', [
    validarJWT,
    check('categoria', 'No es un id valido').isMongoId(),
    check('id').custom( existeProductoId ),
    validarCampos
], actualizarProducto);

router.delete('/:id', [
    validarJWT,
    adminRole,
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom( existeProductoId ),
    validarCampos
], borrarProducto );

module.exports = router;