const Role = require('../models/role');
const User = require('../models/user');

const isRoleValid = async(role = '') => {

    const existRole = await Role.findOne({ role });
    if( !existRole ){
        throw new Error(`El rol ${ role } no esta registrado en la DB`);
    }
}

const existEmail = async(correo = '') => {

    // Verificar si el correo existe
    const emailExist = await User.findOne({ correo });
        if( emailExist ) {
            throw new Error(`El correo ${ correo } ya existe en DB`);
    }
}

const existUserId = async( id ) => {

    try {
        const existUser = await User.findById(id);
    } catch (error) {
        throw new Error(`El id ${ id } no existe en DB`);
    }
}

module.exports = {
    isRoleValid, 
    existEmail,
    existUserId
}