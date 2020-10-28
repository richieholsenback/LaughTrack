import React from "react"
import { Link } from "react-router-dom"

export const IdeaCard = ({ idea }) => (
    <section className="journal">
        <h3 className="idea__concept">
            <Link to={`/journals/ideas/detail/${idea.id}`}>
                { idea.concept }
            </Link>
        </h3>
        <p id="ideaAuthor">By: {idea.user.username}</p>
    </section>
)
