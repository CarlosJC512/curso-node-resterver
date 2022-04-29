const express = require('express');
const cors = require('cors');
const { dbconnection } = require('../db/config');

require('colors');


class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = '/api/users';

        // Conectar a base de datos
        this.conectarDB();

        // Middelwares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();
    }
    
    async conectarDB() {
        await dbconnection();
    }
    
    middlewares() {

        // Cors
        this.app.use( cors() );

        //Lectura y PArseo del body
        this.app.use( express.json() );

        // Directorio public
        this.app.use( express.static('public') );
    }


    routes() {

       this.app.use(this.usersPath, require('../routes/user'));

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en http://localhost:${this.port}`.green.bold);
        });
    }
}

module.exports = Server;