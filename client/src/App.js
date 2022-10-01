import './App.scss';
import {
  Container
} from 'react-bootstrap';
import { Register } from './pages/Register';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import { AuthProvider } from './context/auth';
function App() {

  return (
    <AuthProvider>
      <Container>
        <Routes>
          <Route path="*" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Container>
    </AuthProvider>
  );
}

export default App;
