import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { useTeam } from '../context/TeamContext';
import { useAuth } from '../context/AuthContext';

const Team = () => {
  const { team, teams, loading, fetchMyTeam, fetchAllTeams, createTeam, joinTeam, leaveTeam, deleteTeam } = useTeam();
  const { user, checkAuth } = useAuth();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showJoinList, setShowJoinList] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    fetchMyTeam();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCreateTeam = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name) {
      setError('Please provide a team name');
      return;
    }

    try {
      await createTeam(formData);
      setShowCreateForm(false);
      setFormData({ name: '', description: '' });
      checkAuth(); // Refresh user data
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create team');
    }
  };

  const handleJoinTeam = async (teamId) => {
    try {
      await joinTeam(teamId);
      setShowJoinList(false);
      checkAuth(); // Refresh user data
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to join team');
    }
  };

  const handleLeaveTeam = async () => {
    if (window.confirm('Are you sure you want to leave this team?')) {
      try {
        await leaveTeam();
        checkAuth(); // Refresh user data
      } catch (err) {
        alert(err.response?.data?.message || 'Failed to leave team');
      }
    }
  };

  const handleDeleteTeam = async () => {
    if (window.confirm('Are you sure you want to delete this team? This action cannot be undone.')) {
      try {
        await deleteTeam(team._id);
        checkAuth(); // Refresh user data
      } catch (err) {
        alert(err.response?.data?.message || 'Failed to delete team');
      }
    }
  };

  const handleShowJoinList = () => {
    fetchAllTeams();
    setShowJoinList(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Team Management</h1>
          <p className="text-gray-600 mt-1">Collaborate with your team members</p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading...</p>
          </div>
        ) : team ? (
          <div className="space-y-6">
            {/* Team Details Card */}
            <div className="card">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{team.name}</h2>
                  {team.description && (
                    <p className="text-gray-600 mt-1">{team.description}</p>
                  )}
                </div>
                <div className="flex space-x-2">
                  {user.isAdmin ? (
                    <button onClick={handleDeleteTeam} className="btn btn-danger">
                      Delete Team
                    </button>
                  ) : (
                    <button onClick={handleLeaveTeam} className="btn btn-secondary">
                      Leave Team
                    </button>
                  )}
                </div>
              </div>

              <div className="border-t pt-4">
                <p className="text-sm text-gray-600 mb-2">
                  <span className="font-medium">Admin:</span> {team.admin.name} ({team.admin.email})
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Created:</span>{' '}
                  {new Date(team.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* Team Members */}
            <div className="card">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Team Members ({team.members.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {team.members.map((member) => (
                  <div
                    key={member._id}
                    className="bg-gray-50 rounded-lg p-4 flex items-center justify-between"
                  >
                    <div>
                      <p className="font-medium text-gray-900">{member.name}</p>
                      <p className="text-sm text-gray-600">{member.email}</p>
                    </div>
                    {member.isAdmin && (
                      <span className="px-2 py-1 bg-primary-100 text-primary-800 text-xs rounded-full">
                        Admin
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="card text-center py-12">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No team</h3>
            <p className="mt-1 text-sm text-gray-500">
              You are not part of any team. Create one or join an existing team.
            </p>
            <div className="mt-6 flex justify-center space-x-4">
              <button onClick={() => setShowCreateForm(true)} className="btn btn-primary">
                Create Team
              </button>
              <button onClick={handleShowJoinList} className="btn btn-secondary">
                Join Team
              </button>
            </div>
          </div>
        )}

        {/* Create Team Modal */}
        {showCreateForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Create Team</h2>
              {error && (
                <div className="mb-4 bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}
              <form onSubmit={handleCreateTeam}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Team Name *
                    </label>
                    <input
                      type="text"
                      className="input"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Enter team name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      className="input"
                      rows="3"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Enter team description (optional)"
                    />
                  </div>
                </div>
                <div className="mt-6 flex space-x-4">
                  <button type="submit" className="btn btn-primary flex-1">
                    Create
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowCreateForm(false);
                      setError('');
                      setFormData({ name: '', description: '' });
                    }}
                    className="btn btn-secondary flex-1"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Join Team Modal */}
        {showJoinList && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Available Teams</h2>
              {teams.length === 0 ? (
                <p className="text-gray-600">No teams available to join.</p>
              ) : (
                <div className="space-y-4">
                  {teams.map((t) => (
                    <div key={t._id} className="border rounded-lg p-4 flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold text-gray-900">{t.name}</h3>
                        {t.description && <p className="text-sm text-gray-600">{t.description}</p>}
                        <p className="text-xs text-gray-500 mt-1">
                          {t.members.length} member{t.members.length !== 1 ? 's' : ''}
                        </p>
                      </div>
                      <button
                        onClick={() => handleJoinTeam(t._id)}
                        className="btn btn-primary"
                      >
                        Join
                      </button>
                    </div>
                  ))}
                </div>
              )}
              <div className="mt-6">
                <button
                  onClick={() => setShowJoinList(false)}
                  className="btn btn-secondary w-full"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Team;
