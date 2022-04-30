const { response, request } = require('express');
const bcryp = require('bcryptjs');
const User = require('../models/user');
require('colors');


const userGet = async(req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true};

    const [ total, users ] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.json({
        total,
        users
    });
}

const userPost = async(req, res = response) => {

    const { nombre, correo, password, role } = req.body;
    const user = new User({ nombre, correo, password, role });

    // Encriptar la contraseña
    const salt = bcryp.genSaltSync();
    user.password = bcryp.hashSync( password, salt );

    // Guardar en BD
    await user.save();

    res.status(201).json({
        user
    });
}

const userPut = async(req, res = response) => {

    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;

    //TODO validar contra base de datos
    if( password ) {
        // Encriptar la contraseña
        const salt = bcryp.genSaltSync();
        resto.password = bcryp.hashSync( password, salt );
    }

    const user = await User.findByIdAndUpdate( id, resto );

    res.json(user);
}

const userDelete = async(req, res = response) => {

    const { id } = req.params;

    // Borrado Fisicamente
    // const user = await User.findByIdAndDelete( id );

    const user = await User.findByIdAndUpdate( id, { estado: false } );
    // const userAthenticated = req.user;

    res.json( user );
}

module.exports = {
    userGet,
    userPut,
    userPost,
    userDelete
}