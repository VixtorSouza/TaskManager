import 'dotenv/config'
import express from "express";
import userRoutes from "./routes/userRoutes.js"; // gerenciar usuarios, CRUD completo
//import taskRoutes from "./routes/taskRoutes.js"; // gerenciar tarefas
//import projectRoutes from "./routes/projectRoutes.js"; // gerenciar projetos
import { authRoutes } from "./routes/authRoutes.js"
import { errorHandler } from "./middlewares/errorHandles.js"


const app = express()
const PORT = process.env.PORT ?? 3000; // essencial para rodar em qualquer lugar

// cuidar para deixar em formato json e enviar para as rotas
app.use(express.json());
app.use("/auth", authRoutes)
app.use("/users", userRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
// DEPOIS de todas as rotas:
app.use(errorHandler);  // ← sempre por último!
// pega os erros nas rotas 
