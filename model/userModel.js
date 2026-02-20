import connection from "../config/database.js"; // conecta com o banco de dados

export class UserModel {
    // Busca o usuario pelo email
    static async FindUserByEmail({ email }) {
        if (email) {
            const lowerCaseEmail = email.toLowerCase();
            const [users] = await connection.query(
                `
            SELECT * FROM users WHERE LOWER(email) = ?
            `,
                [lowerCaseEmail]
            )

            if (users.length === 0) {
                return null;
            }



            return users[0];
        }
    }

    // Busca o usuario pelo username
    static async FindUserByUsername({ username }) {
        if (username) {
            const lowerCaseUsername = username.toLowerCase();
            const [users] = await connection.query(
                `
            SELECT * FROM users WHERE LOWER(username) = ?
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
        return users; // return all
    }

    static async createUser({ name, email, passwordHash }) {

        if (!name || !email || !passwordHash) {
            return null;
        }
        // insert datas
        await connection.query(
            `
            INSERT INTO users(name,email, password_hash) VALUES(?,?,?)
            `,
            [name, email, passwordHash]
        );

        // search and return user created
        const [users] = await connection.query(
            'SELECT id,name, email, created_at FROM users WHERE id = ?',
            [id]
        );
        return users[0]

    }
    // Atualiza o usuario(todos os dados)
    static async updateUser({ id, name, email }) {
        const [input] = await connection.query(
            'UPDATE users SET name= ?, email = ? WHERE id  = ?',
            [name, email, id]
        );
        if (result.affectedRows === 0) return null

        // return
        const [users] = await connection.query(
            'SELECT id,name, email, created_at FROM users WHERE = ?',
            [id]
        );
        return users[0]

    };

    static async deleteUser({ id }) {
        const [result] = await connection.query(
            'DELETE FROM users WHERE id = ?',
            [id]
        )
        return result.affectedRows;
    };
}



