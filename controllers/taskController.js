import { taskModel } from "../model/taskModel"


export class taskController {
    static async create(req, res) {
        try {
            const { id, title, description, status, priority, project_id } = req.body

            if (!id || !title || !description || !status || !priority || !project_id) {
                return res.status(400).json({ error: "Todos os campos são obrigatórios" })
            }

            const task = await taskModel.createTask(req.body)
            return res.status(201).json(task)

        } catch (error) {
            console.error("Erro ao criar task:", error.message)
            return res.status(500).json({ error: "Erro interno do servidor" })
        }
    }
}