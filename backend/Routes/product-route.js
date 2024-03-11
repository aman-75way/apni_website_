import express from 'express';
import { deleteProductById, updateProductById } from '../controller/productController.js';
const router = express.Router();

router.route('/delete/:id').delete(deleteProductById);

router.route('/update/:id').patch(updateProductById);


export default router;