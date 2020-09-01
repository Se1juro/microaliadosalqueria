const contactController = {};
const nodemailer = require('nodemailer');
contactController.sendEmail = async (req, res, next) => {
  try {
    const { nombre, email, mensaje } = req.body;
    contentHTML = `
        <h1>Informacion del usuario</h1>
        <ul>
            <li>Nombre del usuario: ${nombre}</li>
            <li>Email: ${email}</li>
        </ul>
        <p>${mensaje}</p>
    `;
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      service: 'gmail',
      auth: {
        user: 'daniel.msweb@gmail.com',
        pass: 'xxxx',
      },
    });
    const mailOptions = {
      from: email,
      to: 'daniel.msweb@gmail.com',
      subject: 'Solicitud de contacto Microaliados APP',
      html: `
        <h1>Informacion del usuario</h1>
        <ul>
            <li>Nombre del usuario: ${nombre}</li>
            <li>Email: ${email}</li>
        </ul>
        <p>${mensaje}</p>
    `,
    };

    const info = await transporter.sendMail(mailOptions);
    if (info.messageId) {
      return res.status(200).json({
        status: 'Success',
        message: 'Mensaje enviado correctamente',
      });
    } else {
      return res.status(409).json({
        status: 'Error',
        message: 'Hubo un error enviando tu correo',
      });
    }
  } catch (error) {
    next(error);
  }
};
module.exports = contactController;
