import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './index.css'
import Login from './pages/Auth/Login';
import Dashboard from './pages/Dashboard';
import DashboardLayout from './layouts/DashboardLayout';
import ProtectedRoute from './components/ProtectedRoute';
import Users from './pages/Users';

function App() {
  

  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login />}/>
        <Route path='/dashboard' element={
          <ProtectedRoute>
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          </ProtectedRoute>
        }/>
        <Route path='/users' element={
          <ProtectedRoute>
            <DashboardLayout>
              <Users />
            </DashboardLayout>
          </ProtectedRoute>
        }/>
      </Routes>
    </Router>
  )
}

export default App
