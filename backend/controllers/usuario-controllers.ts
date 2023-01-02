import { Usuario } from "../db/usuarios";
import { Mascota } from "../db/mascotas";

// DATOS ID USUARIO
export async function dataUsuario(id: number) {  
  const usuario = await Usuario.findByPk(id);  
  return usuario;
}

// MODIFICAR USUARIO POR ID
export async function updateUsuario(id:number,nombre:string,telefono:string){
  const editarUsuario = await Usuario.update( {nombre,telefono}, {
    where: { id },
  });
 return editarUsuario;
}
// DATOS MAIL USUARIO
export async function dataUsuarioMail(id: number) {
  const usuario = await Usuario.findByPk(id);
  const idUsuario = usuario.get("email");
  return idUsuario;
}
// DATOS ID USUARIO MASCOTA
export async function dataMascota(userId: number) {
  const mascotas = await Mascota.findAll({
    where: {
      userId: userId,
    },
  });
  return mascotas;
}
