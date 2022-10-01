import { gql, useLazyQuery } from '@apollo/client';
import React, { useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom';
const LOGIN = gql`
query Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      username
      token
      email
    }
  }`
export default function Login() {
    const navigate = useNavigate();
    const [variables, setVariables] = useState({ password: '', username: '' });
    const [login] = useLazyQuery(LOGIN)
    const submit = (e) => {
        e.preventDefault();
        console.log(variables);
        login({
            variables,
            onCompleted: (data) => {
                if (data?.login?.token) {
                    localStorage.setItem('token', data?.login?.token)
                    navigate('/home');
                }
            }
        })
    }
    const onChange = ({ target }) => {
        setVariables(prev => ({ ...prev, [target.name]: target.value }));
    }
    return (
        <Row className='bg-white py-5 justify-content-center'>
            <Col sm={8} md={6} lg={4}>
                <h1 className='text-center'>Login</h1>
                <Form onSubmit={submit}>
                    <Form.Group className="mb-3" controlId="formBasicUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control onChange={onChange} name='username' type="text" placeholder="Enter username" />
                        <Form.Text className="text-muted">
                            We'll never share your username with anyone else.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control onChange={onChange} name='password' type="password" placeholder="Enter password" />
                        <Form.Text className="text-muted">
                            We'll never share your password with anyone else.
                        </Form.Text>
                    </Form.Group>
                    <div className='text-center'>
                        <Button variant="success" type="submit">
                            Login
                        </Button>
                        <br />
                        don`t have account <Link to='/register'>Register </Link>
                    </div>
                </Form>
            </Col>
        </Row>
    )
}
