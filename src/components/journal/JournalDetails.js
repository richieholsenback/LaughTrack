import React, { useContext, useEffect, useState } from "react"
import { JournalContext } from "./JournalProvider"
import "./Journal.css"
import { useParams, useHistory } from "react-router-dom"
import { Card, Icon } from "semantic-ui-react"

export const JournalDetail = () => {
    const { getJournalById, deleteJournal } = useContext(JournalContext)

    const [journal, setJournal] = useState({})

    const { journalId } = useParams();
    const history = useHistory();

    useEffect(() => {
        getJournalById(journalId)
            .then(response => {
                setJournal(response)
            })
    }, [])

    const buttonShow = (() => {
        if (journal.userId === parseInt(localStorage.getItem("active_user")))
            return (
                <>
                    <button onClick={
                        () => {
                            deleteJournal(journal.id)
                                .then(() => {
                                    history.push("/journals")
                                })
                        }}><Icon name="trash" />
                    </button>
                    <button onClick={() => {
                        history.push(`/journals/edit/${journal.id}`)
                    }}><Icon name="edit" />
                    </button>
                </>
            )
    })

    return (
        <Card className="journal">
            <h3 className="journal__name">{journal.concept}</h3>
            <p>Date Performed - {journal.date}</p>
            <p>How did I think it went - {journal.userApproval}</p>
            <p>How did the crowd react - {journal.crowdApproval}</p>
            <p>Notes about the performance - {journal.userNotes}</p>
            <section className="buttons">
                {buttonShow()}
            </section>
        </Card>
    )
}