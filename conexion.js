import mongoose from 'mongoose';
const conectarDB = async () => {
    try {
        await mongoose.connect(process.env.URL_DB);

        console.log("Conexión exitosa a la Base de datos.");
    } catch (error) {
        console.error(`Error de conexión a la base de datos: ${error.message}`);
        process.exit(1);
    }
};

export default conectarDB;