import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
    process.env.DB_NAME || "pedacodoceu",
    process.env.DB_USER || "root",
    process.env.DB_PASS || "",
    {
        host: process.env.DB_HOST || "localhost",
        port: Number(process.env.DB_PORT) || 3306,
        dialect: "mysql",
        logging: false
    }
);

sequelize.sync({ alter: false }).catch((err) => {
    console.error("Erro ao sincronizar banco:", err);
});

export default sequelize;