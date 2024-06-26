import mysql from 'mysql2/promise';

const connection = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'MyMoldi12',
    database: process.env.DB_NAME || 'db_mecanicos',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

export default connection;


