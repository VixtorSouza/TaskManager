import express from "express"
import { authController } from "../controllers/authController"
import { verifyToken } from "../middlewares/authMiddleware"


const router = express.Router()


router.post("/register", authController.register)
router.post("/login", authController.login)
router.post("/logout", verifyToken, authController.logout)

export default router;
