import { createContext, useContext, useState } from 'react';
import API from '../utils/api';

const TeamContext = createContext();

export const useTeam = () => {
  const context = useContext(TeamContext);
  if (!context) {
    throw new Error('useTeam must be used within TeamProvider');
  }
  return context;
};

export const TeamProvider = ({ children }) => {
  const [team, setTeam] = useState(null);
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMyTeam = async () => {
    setLoading(true);
    try {
      const { data } = await API.get('/teams/my-team');
      setTeam(data.data);
    } catch (error) {
      console.error('Error fetching team:', error);
      setTeam(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllTeams = async () => {
    setLoading(true);
    try {
      const { data } = await API.get('/teams');
      setTeams(data.data);
    } catch (error) {
      console.error('Error fetching teams:', error);
    } finally {
      setLoading(false);
    }
  };

  const createTeam = async (teamData) => {
    const { data } = await API.post('/teams', teamData);
    setTeam(data.data);
    return data;
  };

  const joinTeam = async (teamId) => {
    const { data } = await API.post(`/teams/join/${teamId}`);
    setTeam(data.data);
    return data;
  };

  const leaveTeam = async () => {
    await API.post('/teams/leave');
    setTeam(null);
  };

  const deleteTeam = async (teamId) => {
    await API.delete(`/teams/${teamId}`);
    setTeam(null);
  };

  const value = {
    team,
    teams,
    loading,
    fetchMyTeam,
    fetchAllTeams,
    createTeam,
    joinTeam,
    leaveTeam,
    deleteTeam
  };

  return <TeamContext.Provider value={value}>{children}</TeamContext.Provider>;
};
