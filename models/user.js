
const { Schema, model } = require('mongoose');
require('colors');

const UserSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es requerido'.bgWhite.red],
    },
    correo: {
        type: String,
        required: [true, 'El correo es requerido'.bgWhite.red],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es requerida'.bgWhite.red]
    },
    img: {
        type: String,
    },
    role: {
        type: String,
        required: true,
        emun: ['ADMIN_ROLE', 'USER_ROLE']
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }

});

UserSchema.methods.toJSON = function() {
    const { __v, password, ...user } = this.toObject();
    return user;
}

module.exports = model( 'User', UserSchema );