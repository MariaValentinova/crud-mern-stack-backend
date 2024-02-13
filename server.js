import express from 'express';
import conectarDB from './conexion.js';
import router from './rutas/usuario.js';
import bodyParser from 'body-parser';

const app = express();

conectarDB();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//Importación del archivo de rutas y modelo de usuario
app.use('/crud-mern-stack/api/usuario', router);

app.get('/', (req, res) =>{
    res.end('Bienvenidos');
});

//Configurar servidor básico
const PORT = process.env.PORT || 5000;
app.listen(PORT, function() {
    console.log('El servidor está funcionando correctamente');
})
