const { response } = require("express")


const adminRole = (req, res = response, next) => {

    if( !req.user ){
        return res.status(500).json({
            msg: 'Se necesita verificar el rol sin validar token primero'
        });
    }

    const { role, nombre } = req.user;
    if( role !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `${ nombre } no es un administrador - Acceso restringido`
        });
    }

    next();
}

const tieneRol = ( ...roles ) => {

    return (req, res = response, next) => {

        if( !req.user ){
            return res.status(500).json({
            msg: 'Se necesita verificar el rol sin validar token primero'
        });
    }

    if( !roles.includes( req.user.role ) ){
        return res.status(401).json({
            msg: `Se requiere alguno de estos roles ${ roles }`
        });
    }
        next();
    }
}

module.exports = {
    adminRole,
    tieneRol
}