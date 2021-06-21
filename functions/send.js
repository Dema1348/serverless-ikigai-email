require("dotenv").config();

const sgMail = require("@sendgrid/mail");
const { SENDGRID_KEY } = process.env;

sgMail.setApiKey(SENDGRID_KEY);

let headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "Origin, X-Requested-With, Content-Type, Accept",
  "Content-Type": "application/json",
  "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Credentials": "true",
};

headers["Access-Control-Allow-Origin"] = "*";
headers["Vary"] = "Origin";

exports.handler = async function (event, context) {
  console.log(event);
  console.log(headers);

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: "204", headers };
  }

  if (event.httpMethod === "POST") {
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
      return {
        headers,
        statusCode: 200,
        body: "true",
      };
    } catch (error) {
      return {
        headers,
        statusCode: 500,
        body: error,
      };
    }
  }
  return {
    statusCode: 401,
    headers,
  };
};
