import React from "react"
import { Link } from "react-router-dom"
import { Card } from "semantic-ui-react"

export const JournalCard = ({ journal }) => (
    <Card className="journal">
        <h3 className="journal__concept">
            <Link to={`/journals/detail/${journal.id}`}>
                {journal.concept}
            </Link>
        </h3>
        <p id="journalAuthor">By: {journal.user.username}</p>
    </Card>
)
