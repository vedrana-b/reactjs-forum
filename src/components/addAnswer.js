import React, { useState, useEffect } from "react";
import { Form, Button, Comment } from 'semantic-ui-react';
import * as authService from "../services/auth.service";

const AddAnswer = (props) => {
    const [error, setError] = useState({});
    let [reply, setReply] = useState({ text: '', textLength: 200 });

    let textHandler = (event) => {
        let text = event.target.value;
        let newTextLength = text.length;
        let max = 200;
        let textLeft = max - newTextLength;
        if (newTextLength > max) {
            setError({ ...error, textLength: { message: "You have reached the limit" } });
            return;
        } else {
            setError({ ...error, textLength: null })
        }
        setReply({ ...reply, text: text, textLength: textLeft });
    }

    const replyHandler = (e) => {
        if (!authService.isLoggedIn()) {
            document.getElementById('loginButton').click();
            return;
        }

        // Validations
        if (!reply.text) {
            setError({ ...error, text: { message: "This field cannot be empty" } });
            return;
        } else if (reply.text.length <= 1) {
            setError({ ...error, text: { message: "This field has to have more than 1 letter" } })
            return;
        } else {
            setError({ ...error, text: false })
        }

        props.onAddAnswer({
            id: Math.floor(Math.random() * 100),
            publishedAt: new Date(),
            publishedBy: authService.getUser(),
            text: reply.text
        })
        setReply({ ...reply, text: '', textLength: '200' });
    }


    return (
        <Form reply>
            <Form.TextArea
                onChange={textHandler}
                value={reply.text}
                error={error.text ? { content: error.text.message, pointing: 'below' } : null}
                placeholder="Answer">
            </Form.TextArea>
            <p>{reply.textLength}</p>
            {error.textLength && <p>{error.textLength.message}</p>}
            <Button onClick={replyHandler} content='Add Reply' labelPosition='left' icon='edit' primary />
        </Form>
    )
}

export default AddAnswer;