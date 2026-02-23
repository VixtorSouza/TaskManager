import { z } from "zod"

// validação com zod 

const registerSchema = z.object({
    name: z.string().min(1, "insira um nome!"),
    email: z.string().email("email invalido!"),
    password: z.string().min(6, "No minimo 6 caracteres!")
})

const loginSchema = z.object({
    email: z.string().email("email invalido!"),
    password: z.string().min(6, "No minimo 6 caracteres!")
})

const taskSchema = z.object({
    title: z.string().min(1, "insira um titulo!"),
    description: z.string(),
    status: z.enum(["todo", "in_progress", "done"]),
    priority: z.enum(["low", "medium", "high"]),
    project_id: z.string().uuid("id do projeto invalido!")
})

const validate = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body)
        next()
    } catch (error) {
        res.status(400).json({ error: error.errors })
    }
}


export { loginSchema, registerSchema, taskSchema }