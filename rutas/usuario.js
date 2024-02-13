import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();
const eschema = mongoose.Schema;

const eschemaUser = new eschema({
    nombre: String,
    email: String,
    telefono: String,
    idUser: String
});

const Usuario = mongoose.model('Usuario', eschemaUser);

router.post('/agregarusuario', async (req, res) => {
    const nuevoUser = new Usuario({
        nombre: req.body.nombre,
        email: req.body.email,
        telefono: req.body.telefono,
        idUser: req.body.idUser
    })
    try {
        const newUser = await nuevoUser.save();
        res.json(newUser);
    } catch (error) {
        res.status(500).json({ error: "Hubo un error al guardar el usuario" });
    }
});

router.get('/crud-mern-stack/obtenerusuarios', async (req, res) => {
    const users = await Usuario.find();
    res.json(users);
    if (!users) {
        return res.status(404).json({ msg: "No Encontrado" });
    }
});

router.post('/crud-mern-stack/obtenerdatausuario', async (req, res) => {
    const user = await Usuario.find().where('idUser').equals(req.body.idUser);
    res.json(user);
    if (!user) {
        return res.status(404).json({ msg: "No Encontrado" });
    }
});

router.post('/actualizausuario', async (req, res) => {
    try {
        const updatedUser = await Usuario.findOneAndUpdate(
            { idUser: req.body.idUser },
            {
                nombre: req.body.nombre,
                email: req.body.email,
                telefono: req.body.telefono,
                idUser: req.body.idUser
            },
            { new: true } // Opción "new" para devolver el documento actualizado
        );
        if (!updatedUser) {
            return res.status(404).send('Usuario no encontrado');
        }
        res.send('Usuario actualizado correctamente');
    } catch (error) {
        res.status(500).json({ error: "Hubo un error al actualizar el usuario" });
    }
});

router.post('/borrarusuario', async (req, res) => {
    try {
        const deleteUser = await Usuario.findOneAndDelete(
            { idUser: req.body.idUser }
        );
        if (!deleteUser) {
            return res.status(404).send('Usuario no encontrado');
        }
        res.send('Usuario borrado correctamente');
    } catch (error) {
        res.status(500).json({ error: "Hubo un error al actualizar el usuario" });
    }
});

export default router;