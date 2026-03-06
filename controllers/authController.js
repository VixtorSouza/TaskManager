import { userModel } from "../model/userModel.js";
import bcrypt from "bcrypt";
import { uuidv7 } from "uuidv7";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";

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
            const userCreated = await userModel.createUser({ name, email, passwordHash, id });
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
    static async login(req, res, next) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                res.status(400).json({ error: "Todos os campos são obrigatórios" })
                return;
            }
            const user = await userModel.FindUserByEmail({ email });
            if (!user) {
                res.status(404).json({ error: "Usuario nao encontrado" })
                return;
            }
            const isPasswordValid = await bcrypt.compare(password, user.password_hash);
            if (!isPasswordValid) {
                res.status(401).json({ error: "Senha invalida" })
                return;
            }
            const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
            // Em vez de apenas res.json, você "seta" o cookie antes
            res.cookie('token', token, {
                httpOnly: true, // O front-end não consegue ler/roubar via script
                secure: false,  // Coloque 'true' quando tiver HTTPS (produção), preciso lembrar
                maxAge: 3600000, // 1 hora em milissegundos
                sameSite: 'strict' // Protege de CSRF
            });
            res.status(200).json({ message: "Sucess", token: token, user: { name: user.name, email: user.email, id: user.id } })

        } catch (err) {
            next(err)
        }

    }
    static async logout(req, res, next) {
        // o que faz 

        try {
            res.clearCookie('token'); // limpa o cookie pelo nome dele que dentro tem um token que foi criado no login
            res.status(200).json({ message: "Sucess" })
        } catch (err) {
            next(err)
        }

    }

}