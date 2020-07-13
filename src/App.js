import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import './App.scss';

import Homepage from "./components/homepage";
import TopicPage from './components/topic-page';

function App() {
    return (
        <div >
            <Router basename={process.env.PUBLIC_URL}>
                <Switch>
                    <Route path="/" exact component={Homepage}></Route>
                    <Route path="/question/:topicId" component={TopicPage}></Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
