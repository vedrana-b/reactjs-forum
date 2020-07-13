import React from "react";
import Answer from "./answer";

const AnswerList = (props) => {
    return (
        <React.Fragment>
            {props.answers && props.answers.map(answer => {
                return (
                    <Answer key={answer.id}
                        publishedBy={answer.publishedBy}
                        publishedAt={answer.publishedAt}
                        text={answer.text}
                    />
                )
            })}
        </React.Fragment>
    )

}

export default AnswerList;