import express from "express"
import { userController } from "../controllers/userController"
import { verifyToken } from "../middlewares/authMiddleware"


// criando rota 

const router = express.Router()

router.get("/me", verifyToken, userController.getMe)
router.get("/:id", verifyToken, userController.getUserById)
router.put("/:id", verifyToken, userController.updateUser)
router.delete("/:id", verifyToken, userController.deleteUser)

export default router;