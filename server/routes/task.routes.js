import express from 'express';
import {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  getTeamTasks
} from '../controllers/task.controller.js';
import { protect, isAdmin } from '../middleware/auth.middleware.js';

const router = express.Router();

router.route('/').get(protect, getTasks).post(protect, createTask);

router.route('/team/all').get(protect, isAdmin, getTeamTasks);

router
  .route('/:id')
  .get(protect, getTask)
  .put(protect, updateTask)
  .delete(protect, deleteTask);

export default router;
