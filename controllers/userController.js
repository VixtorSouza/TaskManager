import { userModel } from "../models/userModel";

export class User {
    static async getMe(req, res, next) {
        try {
            const id = req.user.id

            const user = await userModel.FindUserById({ id })
            if (!user) {
                return res.status(404).json({ error: "Usuario nao encontrado" })
            }
            return res.status(200).json(user)
        } catch (err) {
            next(err)
        }
    }
    static async getUserById(req, res, next) {
        try {
            const id = req.params.id
            const user = await userModel.FindUserById({ id })
            if (!user) {
                return res.status(404).json({ error: "Usuario nao encontrado" })
            }
            return res.status(200).json(user)
        } catch (err) {
            next(err)
        }
    }
    static async updateUser(req, res, next) {
        try {
            const id = req.user.id
            const { name, email } = req.body
            if (id === req.params.id) {
                await userModel.updateUser({ id, name, email })
                return // irei deixarpara depois 
            }
            if (req.params.id !== id) {
                req.status(403).json({ error: "ID invalido!" })
            }

        } catch (err) {
            next(err)
        }
    }
    static async deleteUser(req, res, next) {
        try {
            const id = req.user.id
            const deleteID = req.params.id
            if (id === deleteID) {
                await userModel.deleteID({ id })
                return res.status(200).json({ message: "Sucess delete" })
            }
            if (deleteID !== id) {
                res.status(403).json({ error: "erro, deletar  usuario" })
            }

        } catch (err) {
            next(err)
        }
    }
}