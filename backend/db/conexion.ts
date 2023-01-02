import { Sequelize } from "sequelize";
import "dotenv/config";
export const sequelize = new Sequelize({
    dialect: "postgres",
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: 5432,
    ssl: true,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
    },
});

export async function borrarTabla() {
    await sequelize.authenticate();
    // BORRA DATOS
    sequelize.sync({ alter: true });
    // SOLO SINCRONIZA
    //sequelize.sync({ alter: true });
    return "FINALIZADO";
}
