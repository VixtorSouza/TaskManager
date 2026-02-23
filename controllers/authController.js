import { userModel } from "../model/userModel";
import bcrypt from "bcrypt";
import { v7 as uuidv7 } from "uuid";


export class authController {
    static async register(req, res, next) {
        try {
            const { name, email, password } = req.body;
            console.log(name, email, password, "dados veio")
            if (!name || !email || !password) {
                res.status(400).json({ error: "Todos os campos são obrigatórios" })
                return;
            }
            const user = await userModel.FindUserByEmail({ email });
            if (user) {
                res.status(409).json({ error: "Email já cadastrado" })
                return;
            }
            const passwordHash = await bcrypt.hash(password, 10);
            const id = uuidv7();
            // criando o o usuario no banco de dados
            const userCreated = await userModel.createUser({ name, email, passwordHash });
            res.status(201).json({
                message: "Sucess", userCreated: {
                    name,
                    email,
                    id: userCreated.id
                }
            })



        }
        catch (error) {
            next(error)
        }


    }
}