import connection from "../config/db.js";

export class projectModel {
    static async createProject(id, name, description, ownerId) {
        await connection.query(
            'INSERT INTO projects (id, name, description, owner_id) VALUES (?, ?, ?, ?)',
            [id, name, description, ownerId]
        )
        const [result] = await connection.query(
            'SELECT * FROM projects WHERE id = ?',
            [id]
        )
        return result[0];
    }
    static async getAllProjects() {
        const [allProjects] = await connection.query(
            'SELECT * FROM projects'
        )
        return allProjects;
    }
    static async getProjectById(id) {
        const [projectID] = await connection.query(
            'SELECT * FROM projects WHERE id = ?',
            [id]
        )
        return projectID[0];
    }
    static async getProjectsByUser(userId) {
        const [projects] = await connection.query(
            'SELECT p.*, pm.role FROM projects p INNER JOIN projects_members pm ON p.id = pm.project_id WHERE pm.user_id = ?',
            [userId]
        )
        return projects;
    }
    static async updateProject(id, data) {
        const { name, description } = data

        const [updateProject] = await connection.query(
            'UPDATE projects SET name = ?, description = ? WHERE id = ?',
            [name, description, id]
        )
        if (updateProject.affectedRows === 0) return null;

        const [project] = await connection.query(
            'SELECT * FROM projects WHERE id = ?',
            [id]
        )
        return project[0];
    }
    static async deleteProject(id) {
        const [deleteProject] = await connection.query(
            'DELETE FROM projects WHERE id = ?',
            [id]
        )
        return deleteProject.affectedRows;
    }
    static async addMember(projectId, userId, role) {
        await connection.query(
            'INSERT INTO project_member (project_id, user_id, role) VALUES (?,?,?)',
            [projectId, userId, role]
        )
        const [member] = await connection.query(
            'SELECT * FROM project_member WHERE project_id = ? AND user_id = ?',
            [projectId, userId]
        )
        return member[0];
    }
    static async removeMember(projectId, userId) {
        const [deleteMember] = await connection.query(
            'DELETE FROM project_member WHERE project_id = ? AND user_id = ?',
            [projectId, userId]
        )
        return deleteMember.affectedRows;
    }
    static async getMembers(projectId) {
        const [members] = await connection.query(
            'SELECT u.id, u.name, u.email, pm.role FROM project_member pm INNER JOIN users u ON pm.user_id = u.id WHERE pm.project_id = ?',
            [projectId]
        )
        return members;
    }
}
