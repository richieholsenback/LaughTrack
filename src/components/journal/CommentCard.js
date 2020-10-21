import React from "react"

export const CommentCard = ({ comment }) => (
    <section className="journal">
        <p className="comment__user">{comment.user.username}</p>
        <p className="comment__text">{comment.text}</p>
        <p className="comment__date">{comment.date}</p>
    </section>
)
