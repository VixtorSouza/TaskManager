import { Router } from "express"
import { taskController } from "../controllers/taskController.js"

const router = Router() // criei o metodo de roteamento

router.get("/", taskController.getAllTasks) // sempre coloco o endpoint e depois o controller que vai executar
router.get("/:id", taskController.getTaskID) // aqui eu coloco o id na url para buscar o id especifico
router.get("/:id", taskController.getTasksByProject)
router.post("/", taskController.create)
router.put("/:id", taskController.updateTask)
router.put("/:id", taskController.updateTaskStatus)
router.delete("/:id", taskController.deleteTask)

export default router
