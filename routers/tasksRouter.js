import express from "express";
const router = express.Router();
import {
  getAllTasks,
  createTask,
  deleteTask,
  updateTask,
  getOneTask,
} from "../controllers/tasksController.js";
import {uploadFileLocal,uploadFile} from "../controllers/fileUploadController.js";

router.post("/uploads", uploadFile);
router.get("/", getAllTasks);
router.get("/:id", getOneTask);
router.post("/", createTask);
router.patch("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;
