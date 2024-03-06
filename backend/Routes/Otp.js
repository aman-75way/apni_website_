import express from 'express'
const router = express.Router();
import { sendMail } from '../controller/mail-controller.js';
import User from '../models/UserSchema.js';

const otpStore = {};
const generateOTP = () => Math.floor(1000 + Math.random() * 9000);

router.post('/send-otp', async (req, res) => {
  const { email } = req.body;
  
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  const existingUser = await User.findOne({email});

  if(existingUser) res.send("User Exists Already");
  
  const otp = generateOTP();
  otpStore[email] = otp;

  // Use your email-sending middleware to send OTP via email
  sendMail(email, otp)
    .then(() => {
      res.json({ message: 'OTP sent successfully' });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: 'Failed to send OTP via email' });
    });
});


router.post('/verify-otp', (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ error: 'Email and OTP are required' });
  }

  if (otpStore[email] && otpStore[email] === parseInt(otp)) {
    // OTP is valid
    delete otpStore[email]; // Clear OTP after successful verification
    
    res.json({ message: 'OTP verified successfully' });
  } else {
    return res.status(400).json({ error: 'Invalid OTP' });
  }
});

export default router;
