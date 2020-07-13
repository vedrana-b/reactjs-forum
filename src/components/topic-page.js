import React, { useState, useEffect } from "react";
import { Container, Header } from 'semantic-ui-react'
import AddAnswer from "./addAnswer";
import "./homepage.scss";
import topicService from "../services/topic.service"
import AnswerList from "./answer-list";
import Navigation from "./navigation";

const TopicPage = (props) => {
    const [topic, setTopic] = useState({});

    useEffect(() => {
        topicService.getTopic(props.match.params.topicId).then(topic => {
            setTopic(topic);
        });
    }, []);

    const addBackground = () => {
        let pallete = ['red', 'blue', 'green', 'orange', 'purple', 'pink', 'yellow', 'lavander', 'lightblue', 'brown'];
        let modulos = topic.id % 10;
        return pallete[modulos];

    }

    const addAnswerHandler = (answer) => {
        topicService.addAnswer(topic.id, answer).then(response => {
            setTopic({
                ...topic,
                answers: [...topic.answers, answer]
            })
        });
    }

    return (
        <Container fluid className="main-container">
            <div className="homepage__block">
                <div className="homepage__block--button">
                    <Navigation />
                </div>
                <div style={{ backgroundColor: addBackground() }} className="homepage__title">
                    <Header as="h2" inverted content={topic.title}></Header>
                </div>
                <Container className="grid-container">
                    <div className="topic-page">
                        <AnswerList answers={topic.answers} />
                        <AddAnswer onAddAnswer={addAnswerHandler} />
                    </div>
                </Container>
            </div>
        </Container>
    );
}

export default TopicPage;