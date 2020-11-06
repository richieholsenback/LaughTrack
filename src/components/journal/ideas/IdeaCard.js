import React from "react"
import { Link } from "react-router-dom"
import "./Idea.css"

export const IdeaCard = ({ idea }) => (
    <section className="journal">
        <h3 className="journal__concept">
            <Link to={`/journals/ideas/detail/${idea.id}`}>
                { idea.concept }
            </Link>
        </h3>
        <p id="journalAuthor">By: {idea.user.username}</p>
    </section>
)
