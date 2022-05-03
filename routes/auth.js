const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar_campos');

const { login, googleSignIn } = require('../controllers/auth');

const router = Router();

router.post( '/login',[
    check('correo', 'El correo es necesario').isEmail(),
    check('password', 'La contraseña es necesaria').not().isEmpty(),
    validarCampos
], login );

router.post( '/google',[
    check('id_token', 'El id_token de google es necesario').not().isEmpty(),
    validarCampos
], googleSignIn );


module.exports = router;