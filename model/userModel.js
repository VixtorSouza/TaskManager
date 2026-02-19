import connection from "../config/database.js";


export class UserModel {
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

            return [];
        }
    }

    static async FindUserByUsername({ username }) {
        if (username) {
            const lowerCaseUsername = username.toLowerCase();
            const [users] = await connection.query(
                `
            SELECT * FROM users WHERE username = ?
            `,
                [lowerCaseUsername]
            )
            return users[0];
        }
    }

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

    static async updateUser()

}