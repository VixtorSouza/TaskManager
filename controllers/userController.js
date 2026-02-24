import { userModel } from "../models/userModel";

export class userController {
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
            if (req.params.id !== id) {
                return res.status(403).json({ error: "ID invalido!" })
            }
            const user = await userModel.updateUser({ id, name, email })
            return res.status(200).json(user)

        } catch (err) {
            next(err)
        }
    }
    static async deleteUser(req, res, next) {
        try {
            const id = req.user.id
            const deleteID = req.params.id
            if (deleteID !== id) {
                return res.status(403).json({ error: "erro, deletar  usuario" })
            }
            const user = await userModel.deleteUser({ id })
            return res.status(200).json({ message: "Sucess delete" })



        } catch (err) {
            next(err)
        }
    }
}