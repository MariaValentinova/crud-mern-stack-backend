import express from 'express';
import conectarDB from './conexion.js';
import router from './rutas/usuario.js';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();

conectarDB();

const corsOptions = {
    origin: 'https://crud-mern-stack-react.netlify.app',
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
console.log('Middleware CORS aplicado correctamente con las siguientes opciones:', corsOptions);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//Importación del archivo de rutas y modelo de usuario
app.use('/api/usuario', router);

app.get('/', (req, res) =>{
    res.end('Bienvenidos');
});

//Configurar servidor básico
const PORT = process.env.PORT || 5000;
app.listen(PORT, function() {
    console.log('El servidor está funcionando correctamente');
})
