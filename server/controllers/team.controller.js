import Team from '../models/Team.model.js';
import User from '../models/User.model.js';

// @desc    Create a new team
// @route   POST /api/teams
// @access  Private
export const createTeam = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a team name'
      });
    }

    // Check if user is already in a team
    if (req.user.team) {
      return res.status(400).json({
        success: false,
        message: 'You are already part of a team'
      });
    }

    // Check if team name already exists
    const teamExists = await Team.findOne({ name });
    if (teamExists) {
      return res.status(400).json({
        success: false,
        message: 'Team name already exists'
      });
    }

    // Create team
    const team = await Team.create({
      name,
      description,
      admin: req.user._id,
      members: [req.user._id]
    });

    // Update user to set team and admin status
    await User.findByIdAndUpdate(req.user._id, {
      team: team._id,
      isAdmin: true
    });

    const populatedTeam = await Team.findById(team._id)
      .populate('admin', 'name email')
      .populate('members', 'name email');

    res.status(201).json({
      success: true,
      data: populatedTeam
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get team details
// @route   GET /api/teams/my-team
// @access  Private
export const getMyTeam = async (req, res) => {
  try {
    if (!req.user.team) {
      return res.status(404).json({
        success: false,
        message: 'You are not part of any team'
      });
    }

    const team = await Team.findById(req.user.team)
      .populate('admin', 'name email')
      .populate('members', 'name email isAdmin');

    res.json({
      success: true,
      data: team
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Join a team
// @route   POST /api/teams/join/:teamId
// @access  Private
export const joinTeam = async (req, res) => {
  try {
    const { teamId } = req.params;

    // Check if user is already in a team
    if (req.user.team) {
      return res.status(400).json({
        success: false,
        message: 'You are already part of a team. Leave current team first.'
      });
    }

    const team = await Team.findById(teamId);

    if (!team) {
      return res.status(404).json({
        success: false,
        message: 'Team not found'
      });
    }

    // Check if user is already a member
    if (team.members.includes(req.user._id)) {
      return res.status(400).json({
        success: false,
        message: 'You are already a member of this team'
      });
    }

    // Add user to team
    team.members.push(req.user._id);
    await team.save();

    // Update user
    await User.findByIdAndUpdate(req.user._id, {
      team: team._id,
      isAdmin: false
    });

    const populatedTeam = await Team.findById(team._id)
      .populate('admin', 'name email')
      .populate('members', 'name email');

    res.json({
      success: true,
      data: populatedTeam,
      message: 'Successfully joined the team'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Leave team
// @route   POST /api/teams/leave
// @access  Private
export const leaveTeam = async (req, res) => {
  try {
    if (!req.user.team) {
      return res.status(400).json({
        success: false,
        message: 'You are not part of any team'
      });
    }

    const team = await Team.findById(req.user.team);

    // Admin cannot leave (must delete team or transfer admin)
    if (team.admin.toString() === req.user._id.toString()) {
      return res.status(400).json({
        success: false,
        message: 'Admin cannot leave the team. Delete the team instead.'
      });
    }

    // Remove user from team
    team.members = team.members.filter(
      (member) => member.toString() !== req.user._id.toString()
    );
    await team.save();

    // Update user
    await User.findByIdAndUpdate(req.user._id, {
      team: null,
      isAdmin: false
    });

    res.json({
      success: true,
      message: 'Successfully left the team'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get all teams (for joining)
// @route   GET /api/teams
// @access  Private
export const getAllTeams = async (req, res) => {
  try {
    const teams = await Team.find()
      .populate('admin', 'name email')
      .select('name description admin members createdAt');

    res.json({
      success: true,
      count: teams.length,
      data: teams
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Delete team (admin only)
// @route   DELETE /api/teams/:id
// @access  Private (Admin)
export const deleteTeam = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);

    if (!team) {
      return res.status(404).json({
        success: false,
        message: 'Team not found'
      });
    }

    // Check if user is admin
    if (team.admin.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Only team admin can delete the team'
      });
    }

    // Remove team reference from all members
    await User.updateMany(
      { team: team._id },
      { team: null, isAdmin: false }
    );

    await team.deleteOne();

    res.json({
      success: true,
      message: 'Team deleted successfully'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};
