const { response } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/user');
const { generarJWT } = require('../helpers/generarJWT');
const { googleVerify } = require('../helpers/google-verify');
const { json } = require('express/lib/response');

const login = async( req, res = response ) => {

    const { correo, password } = req.body;

    try {

        // Verificar si el email existe
        const user = await User.findOne({ correo });
        if( !user ) {
            return res.status(400).json({ 
                msg: 'El usuario y/o la contraseña no son correctos - correo'
            });
        }

        // Si el usuario esta activo
        if( !user.estado ) {
            return res.status(400).json({ 
                msg: 'El usuario y/o la contraseña no son correctos - estado: false'
            });
        }

        // Verificar la contraseña
        const validPassword = bcrypt.compareSync( password, user.password );
        if ( !validPassword ) {
            return res.status(400).json({ 
                msg: 'El usuario y/o la contraseña no son correctos - password'
            });
        }

        //Generar el JWT
        const token = await generarJWT( user.id );


        res.json({
            user,
            token
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ 
            msg: 'Ocurrio un error, Hable con el administrador'
        });
    }


}

const googleSignIn = async(req, res = response) => {

    const { id_token } = req.body;

    try {

        const { correo, nombre, img } = await googleVerify( id_token );

        let user = await User.findOne({ correo });

        if( !user) {
            // Creacion de Usuario
            const data = {
                nombre,
                correo,
                password: '12345678',
                role: 'USER_ROLE',
                img,
                google: true
            };
            
            user = new User( data );
            await user.save();
        }

        // Si el usuario en DB
        if( !user.estado ) {
            return res.status(401).json({
                msg: '¡Usuario bloqueado!, comuniquese con el administrador'
            });
        }
        // Generar eñ JWT
        const token = await generarJWT( user.id );

        res.json({
            user,
            token
        });
        
    } catch (error) {
        return res.status(400).json({
            ok: false,
            msg: 'No se ha podido verificar el Token'
        })
    }

}

module.exports = {
    login,
    googleSignIn
}