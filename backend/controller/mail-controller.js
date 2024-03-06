// your-email-middleware.js

import nodemailer from 'nodemailer';

const sendMail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: 'amancoding86@gmail.com',
      pass: 'imsg yuwp wxiu mibb',
    },
  });

  const info = await transporter.sendMail({
    from: '"Aman Tiwari 👻" <amancoding86@gmail.com>',
    to: email,
    subject: 'OTP Verification',
    text: `Your OTP is: ${otp}`,
    html: `<b>Your OTP is: ${otp}</b>`,
  });

  console.log('Message sent: %s', info.messageId);
};

export { sendMail };













































// import nodemailer from 'nodemailer';

// /* Mail Controller */


// const sendMail = async(req, res , next)=>{
      
//       const {email , otp} = req.body;
      
//       const transporter = nodemailer.createTransport({
//         service: "gmail",
//         host: "smtp.gmail.com",
//         port: 587,
//         secure: false,
//         auth: {
//           user: "amancoding86@gmail.com",
//           pass: "imsg yuwp wxiu mibb",
//         },
//       });

//       const info = await transporter.sendMail({
//         from: '"Aman Tiwari 👻" <amancoding86@gmail.com>', // sender address
//         to: email, // list of receivers
//         subject: "Welcome to our website ", // Subject line
//         text: "Thanks for logging into our website", // plain text body
//         html: `<b>Hello ${name} , Here is a link <a href="http://localhost:5173/login">( Click here )</a> to login into our website </b>`, // html body
//       });
    
//       console.log("Message sent: %s", info.messageId);
//       // res.json(info);
//       next();
// }


// export {sendMail}



