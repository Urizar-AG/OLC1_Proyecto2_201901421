import express from 'express';
import { indexController } from '../controllers/indexController';

const router = express.Router();

router.get('/test', indexController.test);

router.post('/interpretar', indexController.interpretar);

router.get('/reporte-errores', indexController.generarReporteErrores);

router.get('/reporte-ast', indexController.generarArbolAST);

export default router;