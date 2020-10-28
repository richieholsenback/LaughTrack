import React from "react"
import { Card, Comment } from "semantic-ui-react"

export const CommentCard = ({ comment }) => (
    <Comment className="journal">
        <Comment.Author className="comment__user"><strong>{comment.user.username}</strong></Comment.Author>
        <Comment.Text className="comment__text">{comment.text}</Comment.Text>
        <Comment.Metadata className="comment__date">{comment.date}</Comment.Metadata>
    </Comment>
)
