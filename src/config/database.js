import { Sequelize } from "sequelize";
import dotenv from "dotenv";


dotenv.config();

const conn = new Sequelize(
    process.env.DB_NAME,   
    process.env.DB_USER,  
    process.env.DB_PASS,  
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT || "mysql", 
        logging: false 
    }
);


const testDB = async () => {
    try {
        await conn.authenticate();
        console.log("Conexión a la base de datos establecida correctamente.");
    } catch (error) {
        console.error("Error al conectar a la base de datos:", error);
    }
};

// Ejecutar la prueba de conexión
testDB();

export default conn;
