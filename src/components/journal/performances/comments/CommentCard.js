import React from "react"
import { Card, Comment } from "semantic-ui-react"

export const CommentCard = ({ comment }) => (
    <section className="journal">
        <h4 className="comment__user"><strong>{comment.user.username}</strong> - <em>{comment.text}</em></h4>
        <Card.Meta className="comment__date">{comment.date}</Card.Meta>
    </section>
)
