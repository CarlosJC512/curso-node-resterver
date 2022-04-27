const express = require('express');
const cors = require('cors');


class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = '/api/users';

        // Middelwares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();
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
            console.log(`Servidor corriendo en http://localhost:${this.port}`);
        });
    }
}

module.exports = Server;