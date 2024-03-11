import express from 'express';
import { deleteProductById } from '../controller/productController.js';
const router = express.Router();

router.route('/delete/:id').delete(deleteProductById);

export default router;