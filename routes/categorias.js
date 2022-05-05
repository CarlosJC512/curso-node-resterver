const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT, validarCampos, tieneRol, adminRole } = require('../middlewares');

const { login, googleSignIn } = require('../controllers/auth');

const { crearCategoria, 
        obtenerCategorias, 
        borrarCategoria, 
        actualizarCategoria, 
        obtenerCategoria } = require('../controllers/categorias');
        
const { existeCategoriaId } = require('../helpers/db-validators');

const router = Router();

/**
 * {{url}}/api/categorias
 */

// Obtener todas las categorias - publico
router.get('/', obtenerCategorias);

// Obtener una categoria por id - publico
router.get('/:id', [
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom( existeCategoriaId ),
    validarCampos
], obtenerCategoria
);

// Crear Categoria - privado - cualquier persona con un token válido
router.post('/', [ 
    validarJWT,
    check('nombre', 'El nombre es obligatirio').not().isEmpty(),
    validarCampos
    ], crearCategoria
);

// Actualizar - privado - cualquier persona con token válido
router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom( existeCategoriaId ),
    validarCampos
], actualizarCategoria);

// Borrar una categoria - Admin
router.delete('/:id', [
    validarJWT,
    adminRole,
    check('id', 'No es un ID valido').isMongoId(),
    validarCampos,
    check('id').custom( existeCategoriaId ),
    validarCampos
], borrarCategoria);

module.exports = router;