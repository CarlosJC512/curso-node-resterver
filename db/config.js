const mongoose = require('mongoose');
require('colors');

const dbconnection = async() => {

    try {

        await mongoose.connect( process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        } );

        console.log('Base de datos online'.bgWhite.blue.bold);
        
    } catch (error) {
        console.log(error);
        throw new Error('Error al iniciar la base de datos');
    }
}





module.exports = {
    dbconnection
}