import * as crypto from "crypto";
import * as jwt from "jsonwebtoken";
import { Usuario } from "../db/usuarios";
import { Autentificar } from "../db/autoriza";

// // SECRETA TOKEN
const SECRETA = process.env.TOKEN_SECRETA;
// HASH
function getSHA256ofString(text) {
    return crypto.createHash("sha256").update(text).digest("hex");
}
// NUEVO USUARIO
export async function crearUsuario(
    email: string,
    nombre: string,
    telefono: string,
    password: string
) {
    const [user, created] = await Usuario.findOrCreate({
        where: { email },
        defaults: {
            nombre,
            telefono,
            email,
        },
    });
    const [auth, authcreated] = await Autentificar.findOrCreate({
        where: { idUsuario: user.get("id") },
        defaults: {
            email,
            password: getSHA256ofString(password),
            idUsuario: user.get("id"),
        },
    });
    return [user, auth];
}

// LOGIN USUARIO
export async function loginUsuario(email: string, password: string) {
    const auth = await Autentificar.findOne({
        where: {
            email,
            password: getSHA256ofString(password),
        },
    });
    if (auth) {
        const token = jwt.sign({ id: auth.get("user_id") }, SECRETA);
        return [token, auth.get("id")];
    } else {
        return false;
    }
}
// MODIFICAR USUARIO POR ID
export async function updateUsuarioPass(id: number, password:string) {
    const editarUsuario = await Autentificar.update({
        password:getSHA256ofString(password)}, {
        where: { id },
    });
    return editarUsuario;
}

export async function validarToken(headersAuth) {
    const token = headersAuth.split(" ")[1];
    try {
        const data = jwt.verify(token, SECRETA);
        return data;
    } catch (e) {
        return false;
    }
}
