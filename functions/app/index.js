import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import sgMail from "@sendgrid/mail";

const { SENDGRID_KEY } = process.env;
sgMail.setApiKey(SENDGRID_KEY);

export default function expressApp(functionName) {
  const app = express();
  const router = express.Router();

  const routerBasePath = `/v1/${functionName}`;
  console.log(routerBasePath);

  router.use(cors());

  router.post("", async (req, res) => {
    try {
      const { email, comment, name } = JSON.parse(req.body);

      const msg = {
        to: "admin@ikigaisystems.cl",
        from: "contacto@ikigaisystems.cl",
        subject: `contactar a ${email}`,
        text: "contacto",
        html: `Correo cliente: <strong>${email}</strong><br>
               Comentario: <strong>${comment}</strong><br> 
               Nombre: <strong>${name}</strong><br> `,
      };

      await sgMail.send(msg);

      res.status(200).send({
        message: "ok",
        success: true,
      });
    } catch (error) {
      res.status(400).send({
        message: "Bad Request: " + error.message,
        success: false,
      });
    }
  });

  app.use(routerBasePath, router);
  router.use(bodyParser.json());
  router.use(bodyParser.urlencoded({ extended: true }));

  return app;
}
