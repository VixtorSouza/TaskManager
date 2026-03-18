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
    description: z.string().optional(),
    status: z.enum(["todo", "in_progress", "done"]).optional(),
    priority: z.enum(["low", "medium", "high"]).optional(),
    project_id: z.string().uuid("id do projeto invalido!")
})

const projectSchema = z.object({
    name: z.string().min(1, "insira o nome do projeto!"),
    description: z.string().optional(),
    ownerId: z.string().uuid("id do dono invalido!").optional()
})

const memberSchema = z.object({
    userId: z.string().uuid("id do usuario invalido!"),
    role: z.enum(["admin", "member"]).optional()
})

const userUpdateSchema = z.object({
    name: z.string().min(1, "insira um nome!").optional(),
    email: z.string().email("email invalido!").optional()
})

const validate = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body)
        next()
    } catch (error) {
        res.status(400).json({ error: error.errors })
    }
}


export { validate, loginSchema, registerSchema, taskSchema, projectSchema, memberSchema, userUpdateSchema }