import express from 'express';
import { body, validationResult }  from 'express-validator';

const app = express();

// Middleware for validating login request
export const validateEditProfile = [
  body('name' , "Name length must be atleast 3").isLength({min: 3}),
  body('mobile').isLength({ min: 10, max: 10 }).withMessage('Mobile number must be exactly 10 characters'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];