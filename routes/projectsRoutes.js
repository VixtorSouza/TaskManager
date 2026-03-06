import express from "express";
import { projectController } from "../controllers/projectsController.js";


const router = express.Router()

router.get("/", projectController.getAllProjects)
router.get("/:id", projectController.getProjectID)
router.post("/", projectController.create)
router.put("/:id", projectController.updateProject)
router.delete("/:id", projectController.deleteProject)
router.post("/:projectId/members", projectController.addMember)
router.delete("/:projectId/members/:userId", projectController.removeMember)
router.get("/:projectId/members", projectController.getMembers)

export default router