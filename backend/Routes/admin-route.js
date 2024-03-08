import express from 'express';
import { productDetails, userDetails } from '../controller/admin-controller.js';
const router = express.Router();

router.route('/user').get(userDetails);



router.route('/products').get(productDetails);


export default router;
