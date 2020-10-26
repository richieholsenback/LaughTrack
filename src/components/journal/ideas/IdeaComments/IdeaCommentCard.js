import React from "react"

export const IdeaCommentCard = ({ ideaComment }) => (
    <section className="journal">
        <p className="ideaComment__user">{ideaComment.user.username}</p>
        <p className="ideaComment__text">{ideaComment.text}</p>
        <p className="ideaComment__date">{ideaComment.date}</p>
    </section>
)
