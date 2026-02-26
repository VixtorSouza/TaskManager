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
    static async getAllTasks(req, res) {
        try {
            const tasks = await taskModel.getAllTasks() // não preciso enviar nada
            return res.status(200).json(tasks)
        } catch (error) {
            console.error("Erro ao buscar tasks:", error.message)
            return res.status(500).json({ error: "Erro interno do servidor" })
        }
    }
    static async getTaskID(req, res) {
        try {
            // pego o id com req.params, pois o que a pessoa digitar vai aparecer na url e enviar para o servidor 
            const { id } = req.params // salvo aqui
            const task = await taskModel.getTaskID(id) // enviado para o model para buscar no banco de dados
            return res.status(200).json(task) // retorno do servidor
        } catch (error) {
            console.error("Erro ao buscar task:", error.message)
            return res.status(500).json({ error: "Erro interno do servidor" })
        }
    }
}