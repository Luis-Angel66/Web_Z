import express from 'express';
import authControllers from '../controllers/authControllers.js'; 
const router = express.Router(); //Carga el nucleo de router


router.get('/inicio', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});


export default router;
