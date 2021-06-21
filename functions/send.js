require("dotenv").config();

const sgMail = require("@sendgrid/mail");
const { SENDGRID_KEY } = process.env;

sgMail.setApiKey(SENDGRID_KEY);

exports.handler = async function (event, context, callback) {
  const { email, comment, name } = JSON.parse(event.body);

  const msg = {
    to: "admin@ikigaisystems.cl",
    from: "contacto@ikigaisystems.cl",
    subject: `contactar a ${email}`,
    text: "contacto",
    html: `Correo cliente: <strong>${email}</strong><br>
             Comentario: <strong>${comment}</strong><br> 
             Nombre: <strong>${name}</strong><br> `,
  };

  try {
    const response = await sgMail.send(msg);
    console.log(response);
    callback(null, {
      statusCode: 200,
      body: "true",
    });
  } catch (error) {
    callback(null, {
      statusCode: 500,
      body: error,
    });
  }
};
