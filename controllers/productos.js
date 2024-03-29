const { request, response } = require("express");
const { Producto } = require('../models');

const obtenerProductos = async(req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true }

    const [ total, productos ] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
            .populate('user', 'nombre')
            .populate('categoria', 'nombre')
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.json({
        total,
        productos
    });
}

const obtenerProducto = async(req, res = response) => {

    const { id } = req.params;

    const producto = await Producto.findById( id )
        .populate('user', 'nombre')
        .populate('categoria', 'nombre');

    res.json( producto );
}

const crearProducto = async(req, res = response) => {

    const { estado, user, ...body } = req.body;

    const productoDB = await Producto.findOne({ nombre: body.nombre });

    if( productoDB ) {
        return res.status(400).json({
            msg: `El produto ${ productoDB.nombre }, ya existe`
        })
    }

    //Generar data a guardar
    const data = {
        ...body,
        nombre: body.nombre.toUpperCase(),
        user: req.user._id
    }
    
    const producto = await new Producto( data );
    // Guardar DB
    await producto.save(); 

    res.status(201).json(producto);
}

const actualizarProducto = async(req, res = response) => {
    
    const { id } = req.params;
    const { estado, user, ...data} = req.body;

    if( data.nombre ) {
        data.nombre = data.nombre.toUpperCase();
    }

    data.user = req.user._id;

    const producto = await Producto.findByIdAndUpdate( id, data, { new: true });

    res.json( producto );
}

const borrarProducto = async(req, res = response) => {

    const { id } = req.params;

    const producto = await Producto.findByIdAndUpdate( id, { estado: false }, { new: true });

    res.json( producto );
}

module.exports = {
    obtenerProductos,
    obtenerProducto,
    crearProducto,
    actualizarProducto,
    borrarProducto
}