import React from "react";
import { Comment } from 'semantic-ui-react'

const Answer = (props) => {
    return (
        <Comment.Group>
            <Comment>
                <Comment.Avatar as='a' src={process.env.PUBLIC_URL + '/unknown.png'} />
                <Comment.Content>
                    <Comment.Author>{props.publishedBy}</Comment.Author>
                    <Comment.Metadata>
                        {new Date(props.publishedAt).toLocaleString(navigator.language, { dateStyle: 'long', timeStyle: 'short', hour12: true })}
                    </Comment.Metadata>
                    <Comment.Text>
                        {props.text}
                    </Comment.Text>
                </Comment.Content>
            </Comment>
        </Comment.Group>
    )
}

export default Answer;