import jwt from "jsonwebtoken";


export const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1] || req.cookies?.token; // pega o token de dentro da req no header o ? é caso não tenha nada manda nada o outro procura nos cookies
    // Se o token não for encontrado
    if (!token) {
        return res.status(401).json({ error: "token não fornecido!" })
    }
    // Agora um try catch

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (error) {
        console.error("Erro na verificação do token:", error.message)

        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ error: "Token expirado!" })
        }

        return res.status(401).json({ error: "Token invalido!" })
    }

}