import React, { useState, useEffect, useRef } from "react";
import {
    Link
} from "react-router-dom";
import { Button, Form, Icon, Header, Message, Comment, Input } from 'semantic-ui-react'
import * as topicService from "../services/topic.service";
import * as authService from "../services/auth.service";

const Topics = () => {
    const [topics, setTopics] = useState([]);
    const [newTopic, setNewTopic] = useState({ id: '', title: '' });
    const [showNewTopicInput, setShowNewTopicInput] = useState(false);
    const [message, setMessage] = useState({});
    const [error, setError] = useState({});

    useEffect(() => {
        topicService.getTopics().then(topics => {
            setTopics(topics.data);
        });
    }, []);

    //Button add topic that shows input
    const topicInputHandler = () => {
        if (authService.isLoggedIn()) {
            setShowNewTopicInput(true);
        } else {
            document.getElementById('loginButton').click();
        }
    } 

    //Input value
    const addTopicHandler = (event) => {
        let newTopic = event.target.value;
        setNewTopic({ id: String(Math.floor(Math.random() * 100)), title: newTopic, answers: [] });
    }

    const buttonConfirmHandler = () => {
        if (newTopic.title.length < 5) {
            setError({ ...error, textLength: { message: "Minimum is 5 letters" } });
            return;
        } else {
            setError({ ...error, textLength: false });
        }

        topicService.addTopic(newTopic).then(response => {
            if (response.status === 201) {
                setTopics([...topics, newTopic]);
                setNewTopic({ title: '', id: '' });
                setShowNewTopicInput(false);
                setMessage({ ...message, topic: { success: true, content: 'Topic is sucessfully submited.', header: 'Congratulations!' } })
            } else {
                setMessage({ ...message, topic: { negative: true, content: 'Unexpected error occured on the server side. Please try later.', header: 'Topic cannot be submited' } });
            }
        });
    }

    const buttonCancelHandler = () => {
        setNewTopic({ title: '', id: '' });
        setShowNewTopicInput(false);
    }

    return (
        <div className="topics">
            <div className="topics__button">
                <Button positive size='medium' onClick={topicInputHandler}>Add new topic <Icon name='right arrow' />
                </Button>
            </div>
            {topics.map(topic => {
                return (
                    <Link key={topic.id} to={'/question/' + topic.id}>
                        <div className="topics__title">
                            <Header as="h3" content={topic.title}></Header>
                                <Icon name='reply' />
                                {topic.numberOfAnswers  === undefined ? '0 replies ' : topic.numberOfAnswers} 
                                {topic.numberOfAnswers == 1 && <span> reply</span>}
                                {topic.numberOfAnswers > 1 && <span> replies</span>}
                                {topic.numberOfAnswers == 0 && <span> replies</span>}
                            {topic.numberOfAnswers > 0 &&
                                <Comment.Metadata>
                                    <span>Latest: </span>
                                    {new Date(topic.lastAnswerPublishedAt).toLocaleString(navigator.language, { dateStyle: 'long', timeStyle: 'short', hour12: true })}
                                </Comment.Metadata>
                            }
                        </div>
                    </Link>
                )
            })}
            {message.topic &&
                <Message {...message.topic}>
                </Message>}

            {showNewTopicInput &&
                <React.Fragment>
                    <Form> 
                    <Form.Field className="topics__form-input">
                        <Form.Input
                            autoFocus
                            error={error.textLength ? { content: error.textLength.message, pointing: 'below' } : null} 
                            focus 
                            fluid 
                            onChange={addTopicHandler} 
                            value={newTopic.title} 
                            placeholder="Enter topic name" 
                            type="text"
                        />
                    </Form.Field>
                    <Form.Field className="topics__button-container">
                        <Button.Group>
                            <Button onClick={buttonCancelHandler}>Cancel</Button>
                            <Button.Or />
                            <Button primary animated onClick={buttonConfirmHandler}>
                                <Button.Content visible>Confirm</Button.Content>
                                <Button.Content hidden>
                                    <Icon name='arrow right' />
                                </Button.Content>
                            </Button>
                        </Button.Group>
                    </Form.Field>
                    </Form>
                </React.Fragment>
            }
        </div>
    );
}

export default Topics;