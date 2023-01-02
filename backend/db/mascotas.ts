import { Model, DataTypes } from "sequelize";
import { sequelize } from "./conexion";
export class Mascota extends Model {}
Mascota.init(
    {
        nombre: DataTypes.STRING,
        pictureURL:DataTypes.STRING,
        sobremi:DataTypes.STRING,
        idUsuario:DataTypes.INTEGER,
        perdida:DataTypes.BOOLEAN,
        publicada:DataTypes.BOOLEAN,
        lat: DataTypes.FLOAT,
        lng: DataTypes.FLOAT,
    },
    { sequelize, modelName: "mascotas" }
);