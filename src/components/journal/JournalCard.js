import React from "react"
import { Link } from "react-router-dom"

export const JournalCard = ({ journal }) => (
    <section className="journal">
        <h3 className="journal__concept">
            <Link to={`/journal/detail/${journal.id}`}>
                { journal.concept }
            </Link>
        </h3>
    </section>
)
