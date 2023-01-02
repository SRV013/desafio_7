import { Model, DataTypes } from "sequelize";
import { sequelize } from "./conexion";
export class Reportes extends Model {}
Reportes.init(
  {
    nombre: DataTypes.STRING,
    telefono: DataTypes.STRING,
    comentario: DataTypes.STRING,
    idMascota:DataTypes.INTEGER,
  },
  { sequelize, modelName: "reportes" }
);