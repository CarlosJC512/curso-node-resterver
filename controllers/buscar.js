const { response } = require("express");
const { ObjectId } = require('mongoose').Types;

const { User, Categoria, Producto } = require('../models')

const coleccionesPermitidas = [
    'usuarios',
    'categorias',
    'productos',
    'roles'
];

const buscarUsuario = async( termino = '', res = response ) => {

    const esMongoId = ObjectId.isValid( termino ); //True

    if( esMongoId ) {
        const user = await User.findById(termino);
        return res.json({
            results: ( user && user.estado == true ) ? [ user ] : [] 
        });
    }

    const regex = new RegExp( termino, 'i' );

    const users = await User.find({ 
        $or: [{ nombre: regex }, { correo: regex }],
        $and: [{ estado: true }]
     });

    res.json({
        results: users
    });

}

const  buscarCategoria = async ( termino = '', res ) => {

    const esMongoId = ObjectId.isValid( termino ); //True

        if( esMongoId ) {
            const categoria = await Categoria.findById(termino);
            return res.json({
                results: ( categoria && categoria.estado == true ) ? [ categoria ] : [] 
            });
        }    

    const regex = new RegExp( termino, 'i' );

    const categorias = await Categoria.find({ nombre: regex, estado: true });

    res.json({
        results: categorias
    });
}

const  buscarProducto = async ( termino = '', res ) => {

    const esMongoId = ObjectId.isValid( termino ); //True

        if( esMongoId ) {
            const producto = await Producto.findById(termino)
                .populate('categoria', 'nombre');
            return res.json({
                results: ( producto && producto.estado == true ) ? [ producto ] : [] 
            });
        }    

    const regex = new RegExp( termino, 'i' );

    const productos = await Producto.find({ nombre: regex, estado: true })
        .populate('categoria', 'nombre');

    res.json({
        results: productos
    });
}


const buscar = (req, res = response) => {

    const { coleccion, termino } = req.params;

    if ( !coleccionesPermitidas.includes( coleccion ) ) {
        return res.status(400).json({
            msg: `Las colecciones permitidas son: ${ coleccionesPermitidas }`
        });
    }

    switch (coleccion) {

    case 'usuarios':
        buscarUsuario( termino, res );
    break;
    case 'categorias':
        buscarCategoria( termino, res );
    break;
    case 'productos':
        buscarProducto( termino, res );
    break;

    default:
        res.status(500).json({
            msg: 'Por el momento no es posible realizar esta busqueda'
        })
    }

}

module.exports = {
    buscar
}