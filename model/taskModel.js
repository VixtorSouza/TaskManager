import connection from "../config/database.js"

export class taskModel {
    // criar task, precisa de title, description, status, priority, project_id
    static async createTask(taskData) {
        const { id, title, description, status, priority, project_id } = taskData

        await connection.query(
            'INSERT INTO tasks (id,title,description, status, priority,project_id) VALUE (?,?,?,?,?)',
            [id, title, description, status, priority, project_id]
        );

        const [task] = await connection.query(
            'SELECT * FROM tasks WHERE id = ?',
            [id]
        );
        // return 

        return task[0];
    }


    static async getAllTasks() {
        const [task] = await connection.query(
            'SELECT * FROM tasks'
        )
        return task;
    }

    static async getTaskID(id) {
        const [task] = await connection.query(
            'SELECT * FROM tasks WHERE id = ?',
            [id]
        )

        return task[0]
    }
    static async getTasksByProject(projectId) {
        const [task] = await connection.query(
            'SELECT * FROM tasks WHERE project_id = ?',
            [projectId]
        )
        return task
    }
    static async updateTask(id, data) {
        const { title, description, status, priority, } = data
        await connection.query(
            'UPDATE tasks SET title = ?, description = ?, status = ?, priority = ? WHERE id = ?',
            [title, description, status, priority, id]
        )
        const [task] = await connection.query(
            'SELECT * FROM tasks WHERE id = ?',
            [id]
        )
        return task[0]
    }

    static async updateTaskStatus(id, status) {
        await connection.query(
            'UPDATE tasks SET status = ? WHERE id = ? ',
            [status, id]
        )
        const [task] = await connection.query(
            'SELECT status FROM tasks WHERE id = ?',
            [id]
        )
        return task[0]
    }

    static async deleteTask(id) {
        await connection.query(
            'DELETE FROM tasks WHERE id = ? ',
            [id]
        )

        return result.affectedRows > 0;
    }


}
