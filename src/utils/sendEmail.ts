import * as nodemailer from 'nodemailer';

// async..await is not allowed in global scope, must use a wrapper
export const sendEmail = async (email: string, link: string) => {
  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: process.env.HOST_MAIL,
    port: process.env.HOST_PORT,
    secure: false,
    auth: {
      user: process.env.HOST_USER,
      pass: process.env.HOST_PASS,
    },
  });

  const info = await transporter.sendMail({
    from: `"Garimpei" <${process.env.HOST_USER}>`, // sender address
    to: email, // list of receivers
    subject: 'Recuperação de Senha', // Subject line
    text: 'Recuperação de Senha', // plain text body
    html: `<b>Recuperação de Senha</b><a href="${link}">Recupere sua senha clicando aqui.</a>`, // html body
  });

  console.log('Message sent: %s', info.messageId);
};
