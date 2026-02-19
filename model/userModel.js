import connection from "../config/database.js"; // conecta com o banco de dados


export class UserModel {
    // Busca o usuario pelo email
    static async FindUserByEmail({ email }) {
        if (email) {
            const lowerCaseEmail = email.toLowerCase();
            const [users] = await connection.query(
                `
            SELECT * FROM users WHERE email = ?
            `,
                [lowerCaseEmail]
            )

            if (users.length === 0) {
                return null;
            }

            const [{ id }] = users;

            return [u];
        }
    }

    // Busca o usuario pelo username
    static async FindUserByUsername({ username }) {
        if (username) {
            const lowerCaseUsername = username.toLowerCase();
            const [users] = await connection.query(
                `
            SELECT * FROM users WHERE username = ?
            `,
                [lowerCaseUsername]
            )

            if (users.length === 0) {
                return null;
            }

            return users[0];
        }
    }

    // Busca todos os usuarios
    static async getAllUsers() {
        const [users] = await connection.query(
            `SELECT * FROM users`
        )
        return users[0];
    }

    static async createUser({ name, email, passwordHash }) {
        const [user] = await connection.query(
            `
            INSERT INTO users(name,email, password_hash) VALUES(?,?,?)
            `,
            [name, email, passwordHash]
        )
        return user.insertId;
    }
    // Atualiza o usuario(todos os dados)
    static async updateUser({ input }) {
        const { id, name, email, passwordHash } = input;

    }

}