import {
    Col,
    Row,
    Form,
    Button
} from 'react-bootstrap';
import { useMutation, gql } from '@apollo/client'
import { useState } from 'react';
const REGISTER = gql`
mutation Mutation($username: String!, $email: String!, $password: String!) {
  register(username: $username, email: $email, password: $password) {
    username
  }
}
`;
export function Register() {
    const [variables, setVariables] = useState({ email: '', password: '', username: '', confirmPassword: '' });
    const [mutate, { data, loading, error }] = useMutation(REGISTER)
    const submit = (e) => {
        e.preventDefault();
        console.log(variables);
        mutate({
            variables
        })
    }
    const onChange = ({ target }) => {
        setVariables(prev => ({ ...prev, [target.name]: target.value }));
    }
    return (
        <Row className='bg-white py-5 justify-content-center'>
            <Col sm={8} md={6} lg={4}>
                <h1 className='text-center'>Register</h1>
                <Form onSubmit={submit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control onChange={onChange} name='email' type="email" placeholder="Enter email" />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>
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
                    <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                        <Form.Label>Confirm password</Form.Label>
                        <Form.Control onChange={onChange} name='confirmPassword' type="password" placeholder="Enter confirmPassword" />
                        <Form.Text className="text-muted">
                            We'll never share your confirmPassword with anyone else.
                        </Form.Text>
                    </Form.Group>
                    <div className='text-center'>
                        <Button variant="success" type="submit">
                            Register
                        </Button>
                    </div>
                </Form>
            </Col>
        </Row>
    )
}
