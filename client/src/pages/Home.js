import React from 'react'
import { Row, Col, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthDispatch } from '../context/auth';

export default function Home() {
  const dispatch = useAuthDispatch()
  const navigate = useNavigate();
  const logout = () => {
    dispatch({ type: 'Logout', payload: null });
    navigate('/login')
  }
  return (
    <Row>
      <Link to='/login'>Login</Link>
      <Link to='/register'>Register</Link>
      <Button variant='link' onClick={logout}>Logout</Button>
    </Row>
  )
}
