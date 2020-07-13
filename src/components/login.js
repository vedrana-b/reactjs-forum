import React, { useState } from 'react'
import { Button, Form, Modal, Message } from 'semantic-ui-react'
import * as authService from "../services/auth.service"

const LogIn = (props) => {
    const [user, setUsers] = useState({ username: '', password: '' });
    const [modal, setModal] = useState({ modalOpen: false });
    const [message, setMessage] = useState({});

    const handleOpen = () => {
        setModal({ ...modal, modalOpen: true });
    }

    const handleClose = () => {
        setModal({ ...modal, modalOpen: false });
        resetValues();
    }

    const resetValues = () => {
        setUsers({ ...user, username: '', password: '' });
    }

    const addUsernameHandler = (event) => {
        let username = event.target.value;
        setUsers({ ...user, username: username });
    }

    const addPasswordHandler = (event) => {
        let password = event.target.value;
        setUsers({ ...user, password: password });
    }

    const submitHandler = () => {
        authService.login(user.username, user.password).then(response => {
            if (response.status === 200) {
                setModal({ ...modal, modalOpen: false });
                resetValues();
                props.onLogin();
            } else if (response.status === 401) {
                setMessage({ ...message, login: { negative: true, content: 'Username or password are not correct' } })
            } else if (response.status === 404) {
                setMessage({ ...message, login: { negative: true, content: 'User does not exist' } })
            }
            console.log(user);
        });
    }

    return (
        <React.Fragment>
            {!props.isLogged &&
                <Button id="loginButton" onClick={handleOpen}>Log In</Button>}
            {props.isLogged &&
                <Button compact onClick={props.isLoggedOut}>Log out</Button>}
            <Modal
                size='tiny'
                onClose={handleClose}
                open={modal.modalOpen}
                closeIcon>
                <Modal.Header>Log in</Modal.Header>
                <Modal.Content>
                    <Form>
                        <Form.Field>
                            <label>Username</label>
                            <Form.Input
                                fluid
                                icon='user'
                                iconPosition='left'
                                value={user.username}
                                onChange={addUsernameHandler}
                            />

                        </Form.Field>
                        <Form.Field>
                            <label>Password</label>
                            <Form.Input
                            fluid
                                icon='lock'
                                iconPosition='left'
                                type='password'
                                value={user.password}
                                onChange={addPasswordHandler}
                            />
                        </Form.Field>
                        {message.login &&
                            <Message {...message.login}>
                            </Message>}
                        <Button onClick={submitHandler} type='submit'>Log in</Button>
                    </Form>
                </Modal.Content>
            </Modal>
        </React.Fragment>
    )
}

export default LogIn;