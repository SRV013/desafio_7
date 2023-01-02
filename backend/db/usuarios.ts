import { Model, DataTypes } from "sequelize";
import { sequelize } from "./conexion";
export class Usuario extends Model {}
Usuario.init(
    {
        nombre: DataTypes.STRING,
        telefono: DataTypes.STRING,
        email: DataTypes.STRING,
    },
    { sequelize, modelName: "usuarios" }
);
