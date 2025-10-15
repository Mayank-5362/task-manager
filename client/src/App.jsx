import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { TaskProvider } from './context/TaskContext';
import { TeamProvider } from './context/TeamContext';
import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import NewTask from './pages/NewTask';
import EditTask from './pages/EditTask';
import Team from './pages/Team';
import Admin from './pages/Admin';

function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <TeamProvider>
          <Router>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/task/new"
                element={
                  <PrivateRoute>
                    <NewTask />
                  </PrivateRoute>
                }
              />
              <Route
                path="/task/:id/edit"
                element={
                  <PrivateRoute>
                    <EditTask />
                  </PrivateRoute>
                }
              />
              <Route
                path="/team"
                element={
                  <PrivateRoute>
                    <Team />
                  </PrivateRoute>
                }
              />
              <Route
                path="/admin"
                element={
                  <PrivateRoute>
                    <Admin />
                  </PrivateRoute>
                }
              />
              <Route path="/" element={<Navigate to="/dashboard" />} />
            </Routes>
          </Router>
        </TeamProvider>
      </TaskProvider>
    </AuthProvider>
  );
}

export default App;
