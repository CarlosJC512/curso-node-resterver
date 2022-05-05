const { Schema, model } = require('mongoose');

const ProductoSchema = Schema({

    nombre: {
        type: String,
        required: [true, 'El nombre es requerido'],
        unique: true
    },
    estado: {
        type: Boolean,
        default: true,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    precio: {
        type: Number,
        default: 0
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required: true
    },
    descripcion: { type: String },
    disponible: { type: Boolean, default: true },
});

ProductoSchema.methods.toJSON = function() {
    const { __v, estado, ...producto } = this.toObject();

    return producto;
}

module.exports = model( 'Producto', ProductoSchema);