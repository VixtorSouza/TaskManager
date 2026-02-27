import { projectModel } from "../model/projectModel.js";

export class projectController {
    static async createProject(req, res) {
        try {
            const { id, name, description, ownerId } = await req.body//passando todos os campos preenchidos do req que veio de um formulario ou algo assim e colocado no corpo da requisição
            const createdProject = await projectModel.createProject(id, name, description, ownerId) // envio para o model
            return res.status(201).json({ message: "Projeto criado com sucesso", createdProject })
        } catch (error) {
            return res.status(500).json({ message: "Erro ao criar projeto", error })
        }
    }
    static async getAllProjects() {
        try {
            const allProjects = await projectModel.getAllProjects()
            return res.status(200).json(allProjects)
        } catch (error) {
            return res.status(500).json({ message: "Erro ao buscar projetos", error })
        }
    }
    static async getProjectById(req, res) {
        try {
            const { id } = req.params
            const project = await projectModel.getProjectById(id)
            return res.status(200).json(project)
        } catch (error) {
            return res.status(500).json({ message: "Erro ao buscar projeto", error })
        }
    }
    static async getProjectsByUser(req, res) {
        try {
            const { userId } = req.params
            const projects = await projectModel.getProjectsByUser(userId)
            return res.status(200).json(projects)
        } catch (error) {
            return res.status(500).json({ message: "Erro ao buscar projetos", error })
        }
    }
    static async updateProject(req, res) {
        try {
            const { id } = req.params
            const { name, description } = req.body
            const updatedProject = await projectModel.updateProject(id, { name, description })
            return res.status(200).json({ message: "Projeto atualizado com sucesso", updatedProject })
        } catch (error) {
            return res.status(500).json({ message: "Erro ao atualizar projeto", error })
        }
    }
    static async deleteProject(req, res) {
        try {
            const { id } = req.params
            const deletedProject = await projectModel.deleteProject(id)
            return res.status(200).json({ message: "Projeto deletado com sucesso", deletedProject })
        } catch (error) {
            return res.status(500).json({ message: "Erro ao deletar projeto", error })
        }
    }
    static async addMember(req, res) {
        try {
            const { projectId, userId, role } = req.body
            const addedMember = await projectModel.addMember(projectId, userId, role)
            return res.status(200).json({ message: "Membro adicionado com sucesso", addedMember })
        } catch (error) {
            return res.status(500).json({ message: "Erro ao adicionar membro", error })
        }
    }
    static async removeMember(req, res) {
        try {
            const { projectId, userId } = req.body
            const removedMember = await projectModel.removeMember(projectId, userId)
            return res.status(200).json({ message: "Membro removido com sucesso", removedMember })
        } catch (error) {
            return res.status(500).json({ message: "Erro ao remover membro", error })
        }
    }
    static async getMembers(req, res) {
        try {
            const { projectId } = req.params
            const members = await projectModel.getMembers(projectId)
            return res.status(200).json(members)
        } catch (error) {
            return res.status(500).json({ message: "Erro ao buscar membros", error })
        }
    }

}
