import { taskModel } from "../model/taskModel.js"


export class taskController {
    static async create(req, res) {
        try {
            const { id, title, description, status, priority, project_id } = req.body
            
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
    static async getTasksByProject(req, res) {
        try {
            // também pego pela URL
            const { projectId } = req.params // salvo numa var
            const tasks = await taskModel.getTasksByProject(projectId) // envio que salvei para o model para trazer o que tem no projeto
            return res.status(200).json(tasks)
        } catch (error) {
            console.error("Erro ao buscar tasks do projeto:", error.message)
            return res.status(500).json({ error: "Erro interno do servidor" })
        }
    }
    static async updateTask(req, res) {
        try {// denovvo pego pela url
            const { id } = req.params
            const task = await taskModel.updateTask(id, req.body) // envio para o updateTask req,body, onde é destruturado pelo model e enviado ao banco de dados
            return res.status(200).json({ message: "Task atualizada com sucesso", task }) // retorna o que está no banco de dados
        } catch (error) {
            console.error("Erro ao atualizar task:", error.message)
            return res.status(500).json({ error: "Erro interno do servidor" })
        }
    }
    static async updateTaskStatus(req, res) {
        try {
            const { id } = req.params
            const { status } = req.body
            const AtualizandoTask = await taskModel.updateTaskStatus(id, status)
            return res.status(200).json({ message: "Task atualizada com sucesso", AtualizandoTask })
        } catch (error) {
            console.error("Erro ao atualizar task:", error.message)
            return res.status(500).json({ error: "Erro interno do servidor" })
        }
    }
    static async deleteTask(req, res) {
        try {
            const { id } = req.params
            const DeletandoTask = await taskModel.deleteTask(id)
            return res.status(200).json({ message: "Task deletada com sucesso", DeletandoTask })
        } catch (error) {
            console.error("Erro ao deletar task:", error.message)
            return res.status(500).json({ error: "Erro interno do servidor" })
        }
    }

}