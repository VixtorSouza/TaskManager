import { Router } from "express"
import { taskController } from "../controllers/taskController.js"
import { validate, taskSchema } from "../middlewares/validation.js"

const router = Router() 

router.get("/", taskController.getAllTasks) 
router.get("/:id", taskController.getTaskID) 
router.get("/project/:projectId", taskController.getTasksByProject)
router.post("/", validate(taskSchema), taskController.create)
router.put("/:id", validate(taskSchema.partial()), taskController.updateTask)
router.patch("/:id/status", taskController.updateTaskStatus)
router.delete("/:id", taskController.deleteTask)

export default router
