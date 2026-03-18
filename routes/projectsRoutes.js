import express from "express";
import { projectController } from "../controllers/projectsController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { validate, projectSchema, memberSchema } from "../middlewares/validation.js";


const router = express.Router()

router.get("/", verifyToken, projectController.getAllProjects)
router.get("/:id", verifyToken, projectController.getProjectById)
router.post("/", verifyToken, validate(projectSchema), projectController.createProject)
router.put("/:id", verifyToken, validate(projectSchema.partial()), projectController.updateProject)
router.delete("/:id", verifyToken, projectController.deleteProject)
router.post("/:projectId/members", verifyToken, validate(memberSchema), projectController.addMember)
router.delete("/:projectId/members/:userId", verifyToken, projectController.removeMember)
router.get("/:projectId/members", verifyToken, projectController.getMembers)

export default router