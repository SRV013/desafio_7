import { Reportes } from "../db/reportes";
import { sgMail, sendgridfrom } from "../lib/sendGrid";

// NUEVA REPORTE
export async function nuevoReporte(
    idMascota,
    nombre,
    telefono,
    comentario,
    email
) {
    console.log(email);
    const msg = {
        to: email,
        from: sendgridfrom,
        subject: "Alguien ha visto tu mascota !!!",
        text: "hola",
        html: "Hola soy, <strong>" + nombre + "</strong> <br><br>" + comentario + "<br><br>Mi contacto, <strong>" + telefono + "</strong>",
    };
    await sgMail.send(msg);
    const reportes = await Reportes.create({
        nombre,
        telefono,
        comentario,
        idMascota,
    });
    return reportes;
}
