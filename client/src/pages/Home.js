import { gql, useQuery } from '@apollo/client';
import React, { useState } from 'react'
import { Button, Col, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthDispatch } from '../context/auth';
const GET_USERS = gql`
query UsersGet {
  usersGet {
    username
    email
    id
    latestMessage{
      id
      content
    }
  }
}`
export default function Home() {
  const dispatch = useAuthDispatch()
  const navigate = useNavigate();
  const [users, setUsers] = useState([])
  useQuery(GET_USERS, {
    onCompleted: ({ usersGet }) => {
      if (usersGet) {
        console.log(usersGet);
        setUsers(usersGet)
      }
    }
  })
  const logout = () => {
    dispatch({ type: 'Logout', payload: null });
    navigate('/login')
  }
  const mapUser = (user) => {
    return (
      <div key={user.id}>{user.username}</div>
    )
  }
  return (<>
    <div style={{ marginBottom: 10, display: 'flex', width: '100%', background: 'white', justifyContent: 'center', alignItems: 'center' }}>
      <Link key={'login_link_home'}to='/login'><Button variant='link'>Login</Button></Link>
      <Link key={'register_link_home'} to='/register'><Button variant='link'>Register</Button></Link>
      <Button variant='link' onClick={logout}>Logout</Button>
    </div>
    <Row className='bg-white'>
      <Col xs={4}>
        {!!users.length && users.map(mapUser)}
      </Col>
      <Col xs={8}>
        <p>Messages</p>
      </Col>
    </Row>
  </>
  )
}
