import { gql, useLazyQuery, useMutation, useQuery } from '@apollo/client';
import React, { useState } from 'react'
import { Button, Col, Row, Image, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthDispatch } from '../context/auth';

const SEND_MESSAGE = gql`
mutation MessageSend($content: String!, $to: String!) {
  messageSend(content: $content, to: $to) {
    id
    content
    createdAt
    from
    to
  }
}
`;


const GET_MESSAGES = gql`
query MessagesGet($from: String!) {
  messagesGet(from: $from) {
    id
    content
    createdAt
    from
    to
  }
}`

const GET_USERS = gql`
query UsersGet {
  usersGet {
    username
    email
    id
    imageUrl
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
  const [selectedUser, setSelectedUser] = useState()
  const [content, setContent] = useState()
  const [messages, setMessages] = useState([])
  const [getMessagesQuery] = useLazyQuery(GET_MESSAGES);
  const [sendMessageMutation] = useMutation(SEND_MESSAGE);
  useQuery(GET_USERS, {
    onCompleted: ({ usersGet }) => {
      if (usersGet) {
        console.log(usersGet);
        setUsers(usersGet)
      }
    }
  })

  const sendMessage = (e) => {
    e.preventDefault()
    sendMessageMutation({
      variables: {
        to: selectedUser.id,
        content
      }
    })
  }
  const logout = () => {
    dispatch({ type: 'Logout', payload: null });
    navigate('/login')
  }
  const getMessages = (user) => {
    console.log(user);
    setSelectedUser(user)
    setMessages([])
    getMessagesQuery({
      variables: {
        from: user.id
      },
      onCompleted: ({ messagesGet }) => {
        console.log(messagesGet);
        setMessages(messagesGet)
      }
    })
  }
  const mapUser = (user) => {
    return (
      <div onClick={() => getMessages(user)} className='d-flex p-3' key={user.id}>
        {user.imageUrl && <Image style={{ width: 50, height: 50 }} src={user.imageUrl} roundedCircle className='mr-2' />}
        <div>
          <p className='text-success'>{user.username}</p>
          {user?.latestMessage && <p className='font-weight-light'>{user.latestMessage.content}</p>}
        </div>
      </div>
    )
  }
  const mapMessages = (message) => {
    return (<div key={message.id}>
      <div>{message.content}</div>
    </div>)
  }
  return (<>
    <div style={{ marginBottom: 10, display: 'flex', width: '100%', background: 'white', justifyContent: 'center', alignItems: 'center' }}>
      <Link key={'login_link_home'} to='/login'><Button variant='link'>Login</Button></Link>
      <Link key={'register_link_home'} to='/register'><Button variant='link'>Register</Button></Link>
      <Button variant='link' onClick={logout}>Logout</Button>
    </div>
    <Row className='bg-white'>
      <Col xs={4} className='p-0'>
        {!!users.length && users.map(mapUser)}
      </Col>
      <Col xs={8}>
        <p>Messages</p>
        <div style={{ height: 500, overflowY: 'scroll' }}>
          {!!messages?.length && messages?.map(mapMessages)}
        </div>
        {selectedUser && <Form onSubmit={sendMessage}>
          <Form.Group>
            <Form.Control value={content} onChange={({ target }) => { setContent(target.value) }} placeholder='Type a message' className="rounded-pill bg-secondary" type={'text'} />
            <Button variant="success" type="submit">
              Login
            </Button>
          </Form.Group>
        </Form>}
      </Col>
    </Row>
  </>
  )
}
