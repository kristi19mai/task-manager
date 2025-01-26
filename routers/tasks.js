import express from "express";
const router = express.Router();
import {
  getAllTasks,
  createTask,
  deleteTask,
  updateTask,
  getOneTask,
} from "../controllers/tasks.js";

// router.get("/", getTodos);
// router.get("/:id", getOneTodo);
// router.post("/", createTodo);
// router.patch("/:id", updateTodo);
// router.delete("/:id", deleteTodo);

router.route("/").get(getAllTasks).post(createTask);
router.route("/:id").get(getOneTask).patch(updateTask).delete(deleteTask);

export default router;
