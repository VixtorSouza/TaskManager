import express from "express";
import { projectController } from "../controllers/projectsController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";


const Router = express.Router()

Router.get("/", verifyToken, projectController.getAllProjects)
Router.get("/:id", verifyToken, projectController.getProjectById)
Router.post("/", verifyToken, projectController.createProject)
Router.put("/:id", verifyToken, projectController.updateProject)
Router.delete("/:id", verifyToken, projectController.deleteProject)
Router.post("/:projectId/members", verifyToken, projectController.addMember)
Router.delete("/:projectId/members/:userId", verifyToken, projectController.removeMember)
Router.get("/:projectId/members", verifyToken, projectController.getMembers)

export default Router