import React from "react"
import { Link } from "react-router-dom"

export const JournalIdeaCard = ({ journalIdea }) => (
    <section className="journal">
        <h3 className="journalIdea__concept">
            <Link to={`/journals/ideas/detail/${journalIdea.id}`}>
                { journalIdea.concept }
            </Link>
        </h3>
        <p id="journalIdeaAuthor">By: {journalIdea.user.username}</p>
    </section>
)
