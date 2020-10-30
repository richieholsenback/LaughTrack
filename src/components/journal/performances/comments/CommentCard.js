import React from "react"
import { Card, Comment } from "semantic-ui-react"

export const CommentCard = ({ comment }) => (
    <section className="journal">
        <p className="comment__user"><strong>{comment.user.username}</strong> - {comment.text}</p>
        <p className="comment__date">{comment.date}</p>
    </section>
)
