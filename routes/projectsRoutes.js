import express from "express";
import { projectController } from "../controllers/projectsController.js";


const Router = express.Router()

Router.get("/", projectController.getAllProjects)
Router.get("/:id", projectController.getProjectById)
Router.post("/", projectController.createProject)
Router.put("/:id", projectController.updateProject)
Router.delete("/:id", projectController.deleteProject)
Router.post("/:projectId/members", projectController.addMember)
Router.delete("/:projectId/members/:userId", projectController.removeMember)
Router.get("/:projectId/members", projectController.getMembers)

export default Router