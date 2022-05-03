const { Schema, model } = require('mongoose');

const RoleSchema = Schema({

    role: {
        type: String,
        required: [true, 'El rol es requerido'],
        default: 'USER_ROLE'
    }
});

module.exports = model( 'Role', RoleSchema);