import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './index.css'
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Dashboard from './pages/Dashboard';
import DashboardLayout from './layouts/DashboardLayout';
import ProtectedRoute from './components/ProtectedRoute';
import Users from './pages/Users';
import Property from './pages/Property';
import Reservation from './pages/Reservation';

function App() {
  

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/register' element={<Register />}/>
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
        <Route path='/property' element={
          <ProtectedRoute>
            <DashboardLayout>
              <Property />
            </DashboardLayout>
          </ProtectedRoute>
        } 
        
        />
        <Route path='/reservation' element={
          <ProtectedRoute>
            <DashboardLayout>
              <Reservation />
            </DashboardLayout>
          </ProtectedRoute>
        } 
        
        />
      </Routes>
    </Router>
  )
}

export default App
