import React from "react"

export const JournalCard = ({ comment, user }) => (
    <section className="journal">
        <p className="comment__user">{user.username}</p>
        <p className="comment__text">{comment.text}</p>
        <p className="comment__date">{comment.date}</p>
    </section>
)
