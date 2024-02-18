import express from 'express';
import { body, validationResult }  from 'express-validator';

const app = express();

// Middleware for validating login request
export const validateLogin = [
  body('name' , "Name length must be atleast 3").isLength({min : 3}),
  body('password' , "Password length must be atleast 5").isLength({min : 5}),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];