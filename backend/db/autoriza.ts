import { Model, DataTypes } from "sequelize";
import { sequelize } from "./conexion";
export class Autentificar extends Model {}
Autentificar.init(
    {
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        idUsuario:DataTypes.INTEGER,
    },
    { sequelize, modelName: "autentificaciones" }
);
