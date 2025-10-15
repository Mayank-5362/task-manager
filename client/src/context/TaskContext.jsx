import { createContext, useContext, useState } from 'react';
import API from '../utils/api';

const TaskContext = createContext();

export const useTask = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTask must be used within TaskProvider');
  }
  return context;
};

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const { data } = await API.get('/tasks');
      setTasks(data.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTeamTasks = async () => {
    setLoading(true);
    try {
      const { data } = await API.get('/tasks/team/all');
      setTasks(data.data);
    } catch (error) {
      console.error('Error fetching team tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (taskData) => {
    const { data } = await API.post('/tasks', taskData);
    setTasks([data.data, ...tasks]);
    return data;
  };

  const updateTask = async (id, taskData) => {
    const { data } = await API.put(`/tasks/${id}`, taskData);
    setTasks(tasks.map((task) => (task._id === id ? data.data : task)));
    return data;
  };

  const deleteTask = async (id) => {
    await API.delete(`/tasks/${id}`);
    setTasks(tasks.filter((task) => task._id !== id));
  };

  const getTaskById = async (id) => {
    const { data } = await API.get(`/tasks/${id}`);
    return data.data;
  };

  const value = {
    tasks,
    loading,
    fetchTasks,
    fetchTeamTasks,
    createTask,
    updateTask,
    deleteTask,
    getTaskById
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};
