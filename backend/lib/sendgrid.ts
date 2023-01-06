import "dotenv/config";
import * as sgMail from "@sendgrid/mail";
const sendgridKey = process.env.SENDGRID_API_KEY;
const sendgridfrom= process.env.SENDGRID_API_FROM;
sgMail.setApiKey(sendgridKey);
export { sgMail , sendgridfrom };