const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar_campos');
const { isRoleValid,
        existEmail,
        existUserId } = require('../helpers/db-validators')

const { userGet,
        userPut,
        userPost,
        userDelete } = require('../controllers/user');

const router = Router();

router.get('/', userGet );

router.put('/:id', [
    check('id', 'no es un ID valido').isMongoId(),
    check('id').custom( existUserId ),
    check('role').custom( isRoleValid ),
    validarCampos
], userPut);

router.post('/', [
    check('nombre', 'El nombre es requerido').not().isEmpty(),
    check('password', 'El password es requerido y contener mas de 8 carácteres').isLength({ min: 6 }),
    check('correo', 'En correo debe tener el formato: example@domain.com').isEmail(),
    check('correo').custom( existEmail ),
    // check('role', 'NO es un rol permitido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('role').custom( isRoleValid ),
    validarCampos

], userPost);

router.delete('/:id', [
    check('id', 'no es un ID valido').isMongoId(),
    check('id').custom( existUserId ),
    validarCampos
], userDelete);

module.exports = router;