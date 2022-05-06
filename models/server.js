const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const { dbconnection } = require('../db/config');

require('colors');


class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth: '/api/auth',
            buscar: '/api/buscar',
            categorias: '/api/categorias',
            productos: '/api/productos',
            users: '/api/users',
            uploads: '/api/uploads'
        }

        // this.usersPath = '/api/users';
        // this.authPath = '/api/auth';

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

        //FileUpload - Carga de archivos
        this.app.use( fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));

    }


    routes() {

       this.app.use(this.paths.auth, require('../routes/auth'));
       this.app.use(this.paths.buscar, require('../routes/buscar'));
       this.app.use(this.paths.categorias, require('../routes/categorias'));
       this.app.use(this.paths.productos, require('../routes/productos'));
       this.app.use(this.paths.users, require('../routes/user'));
       this.app.use(this.paths.uploads, require('../routes/uploads'));

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en http://localhost:${this.port}`.green.bold);
        });
    }
}

module.exports = Server;