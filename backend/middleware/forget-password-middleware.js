import express from 'express';
import { body, validationResult }  from 'express-validator';

const app = express();

// Middleware for validating login request
export const validateForgetPassword = [
  body('email' , "Enter a valid Email").isEmail(),
  body('password' , "Password length must be atleast 5").isLength({min : 5}),
  body('confirmPassword' , "Confirm Password length must be atleast 5").isLength({min : 5}),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];