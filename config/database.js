import mysql from 'mysql2/promise';
// conectar ao banco de dados
// o que precisa host, user, password, database
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

export default pool