import express from 'express';
import {
  createTeam,
  getMyTeam,
  joinTeam,
  leaveTeam,
  getAllTeams,
  deleteTeam
} from '../controllers/team.controller.js';
import { protect, isAdmin } from '../middleware/auth.middleware.js';

const router = express.Router();

router.route('/').get(protect, getAllTeams).post(protect, createTeam);

router.get('/my-team', protect, getMyTeam);
router.post('/join/:teamId', protect, joinTeam);
router.post('/leave', protect, leaveTeam);
router.delete('/:id', protect, isAdmin, deleteTeam);

export default router;
