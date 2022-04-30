const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar_campos');

const { login } = require('../controllers/auth');

const router = Router();

router.post( '/login',[
    check('correo', 'El correo es necesario').isEmail(),
    check('password', 'La contraseña es necesaria').not().isEmpty(),
    validarCampos
], login );


module.exports = router;