import express from "express"
import { authController } from "../controllers/authController.js"
import { verifyToken } from "../middlewares/authMiddleware.js"
import { validate, registerSchema, loginSchema } from "../middlewares/validation.js"


const router = express.Router()


router.post("/register", validate(registerSchema), authController.register)
router.post("/login", validate(loginSchema), authController.login)
router.post("/logout", verifyToken, authController.logout)

export default router;
