import React from "react";
import "./homepage.scss";
import { Container, Header, Button } from 'semantic-ui-react'
import Topics from "./topics";
import Navigation from "./navigation";



const Homepage = ({ mobile }) => {
    return (
        <Container fluid className="main-container">
            <div className="homepage__block">
                <div className="homepage__block--button">
                    <Navigation/>
                </div>
                <div className="homepage__title">
                    <Header as="h1" inverted content='Welcome to Forum'></Header>
                    <Header
                        as='h2'
                        content='Do whatever you want when you want to.'
                        inverted
                        style={{
                            fontSize: mobile ? '1.5em' : '1.7em',
                            fontWeight: 'normal',
                            marginTop: mobile ? '0.5em' : '1.5em',
                        }}
                    />
                </div>

            </div>
            <Container className="grid-container">
                <div className="homepage">
                    <div className="homepage__content">
                        <Topics />
                    </div>
                </div>
            </Container>
        </Container>

    )
}
export default Homepage;