import React from "react"
import "./IdeaComment.css"

export const IdeaCommentCard = ({ ideaComment }) => (
    <section className="journal">
        <div className="ideaComment__user"><strong>{ideaComment.user.username}</strong> - <em>{ideaComment.text}</em></div>
        <p className="ideaComment__date">{ideaComment.date}</p>
    </section>
)
