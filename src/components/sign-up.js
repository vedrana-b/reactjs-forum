import React, { useState, useEffect } from 'react'
import { Button, Form, Modal } from 'semantic-ui-react'
import * as authService from "../services/auth.service";
const Joi = require('@hapi/joi');



const SignUp = (props) => {
    const [user, setUsers] = useState({ username: '', password: '', confirmPassword: '', checked: false });
    const [error, setError] = useState();
    const [modal, setModal] = useState({ modalOpen: false });

    const handleOpen = () => {
        setModal({ ...modal, modalOpen: true });
    }

    const handleClose = () => {
        setModal({ ...modal, modalOpen: false });
        resetValues();
    }

    const resetValues = () => {
        setUsers({ ...user, username: '', password: '', confirmPassword: '', checked: false });
    }

    const addUsernameHandler = (event) => {
        let username = event.target.value;
        setUsers({ ...user, username: username });
    }

    const addPasswordHandler = (event) => {
        let password = event.target.value;
        setUsers({ ...user, password: password });
    }

    const addConfirmPasswordHandler = (event) => {
        let confirmPassword = event.target.value;
        setUsers({ ...user, confirmPassword: confirmPassword });
    }

    const checkboxHandler = () => {
        setUsers({ ...user, checked: !user.checked });
    }

    const validations = () => {
        const schema = Joi.object({
            username: Joi.string()
                .alphanum()
                .min(3)
                .max(30)
                .required()
                .messages({
                    'string.base': `Username should be a type of 'text'`,
                    'string.empty': `Username cannot be an empty field`,
                    'string.min': `Username should have a minimum length of {#limit}`,
                    'string.max': `Password should have a maximum length of {#limit}`,
                    'any.required': `Username is a required field`
                }),
            password: Joi.string()
                .pattern(/^[a-zA-Z0-9]*$/)
                .min(8)
                .max(30)
                .required()
                .messages({
                    'string.pattern.base': `Password should contain numbers and letters only`,
                    'string.empty': `Password cannot be an empty field`,
                    'string.min': `Password should have a minimum length of {#limit}`,
                    'string.max': `Password should have a maximum length of {#limit}`,
                    'any.required': `Password is a required field`
                }),
            confirmPassword: Joi.string()
                .valid(Joi.ref('password'))
                .required()
                .messages({
                    'string.pattern.base': `Confirm password should contain numbers and letters only`,
                    'string.empty': `Confirm password cannot be an empty field`,
                    'any.required': `Confirm password is a required field`,
                    'any.only': "Passwords are not matching"
                }),
            checked: Joi.boolean()
                .valid(true)
        }).options({
            abortEarly: false
        });

        return schema.validate(user);
    }

    const submitHandler = () => {
        const isValid = validations().error;
        setError(isValid);

        if (isValid) {
            return;
        }

        authService.addUser(user.username, user.password).then(response => {
            setModal({ ...modal, modalOpen: false });
            resetValues();
        });
    }

    const getError = (error, prop) => {
        return error && error.details.find(err => err.path.includes(prop));
    }

    return (
        <React.Fragment>
            {!props.isLogged &&
                <Button onClick={handleOpen}>Sign Up</Button>}
            <Modal size='tiny'
                onClose={handleClose}
                open={modal.modalOpen}
                closeIcon>
                <Modal.Header>Sign Up</Modal.Header>
                <Modal.Content>
                    <Form>
                        <Form.Field>
                            <label>Username</label>
                            <Form.Input
                                error={getError(error, 'username') ? { content: getError(error, 'username').message, pointing: 'above' } : null}
                                value={user.username} onChange={addUsernameHandler} />
                        </Form.Field>
                        <Form.Field>
                            <label>Password</label>
                            <Form.Input
                                error={getError(error, "password") ? { content: getError(error, "password").message, pointing: 'above' } : null}
                                value={user.password}
                                type="password"
                                onChange={addPasswordHandler}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>Confirm Password</label>
                            <Form.Input
                                value={user.confirmPassword}
                                error={getError(error, "confirmPassword") ? { content: getError(error, "confirmPassword").message, pointing: 'above' } : null}
                                type="password" onChange={addConfirmPasswordHandler}
                            />
                        </Form.Field>
                        <Form.Field>
                            <Form.Checkbox checked={user.checked} error={getError(error, 'checked') ? true : null} onChange={checkboxHandler} label='I agree to the Terms and Conditions' />
                        </Form.Field>
                        <Button onClick={submitHandler} type='submit'>Submit</Button>
                    </Form>
                </Modal.Content>
            </Modal>
        </React.Fragment>
    )
}

export default SignUp;