import connection from "../config/database"

export class TaskModel {
    // criar task, precisa de title, description, status, priority, project_id
    static async createTask(taskData) {
        const { id, title, description, status, priority, project_id } = taskData

        await connection.query(
            'INSERT INTO users (title,description, status, priority,project_id) VALUE (?,?,?,?,?)',
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
            'SELECT title,description, status, priority FROM tasks'
        )
        return task;
    }

    static async getTaskID(id) {
        const [task] = await connection.query(
            'SELECT title, description, status, priority FROM tasks WHERE id = ?',
            [id]
        )

        return task[0]
    }
    static async getTasksByProject(projectId) {
        const [task] = connection.query(
            'SELECT title, description, status, priority FROM tasks WHERE id = ?',
            [projectId]
        )
        return task[0]
    }
    static async updateTask(id, data) {
        const { id, title, description, status, priority, } = data
        await connection.query(
            'UPDATE tasks SET title = ?, description = ?, status = ?, priority = ? WHERE id = ?',
            [title, description, status, priority, id]
        )
        const [task] = await connection
    }


}
