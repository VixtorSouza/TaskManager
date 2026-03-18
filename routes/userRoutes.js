import express from "express"
import { userController } from "../controllers/userController.js"
import { verifyToken } from "../middlewares/authMiddleware.js"
import { validate, userUpdateSchema } from "../middlewares/validation.js"


// criando rota 

const router = express.Router()

router.get("/me", verifyToken, userController.getMe)
router.get("/:id", verifyToken, userController.getUserById)
router.put("/:id", verifyToken, validate(userUpdateSchema), userController.updateUser)
router.delete("/:id", verifyToken, userController.deleteUser)

export default router;