import React, { useContext, useEffect, useState } from "react"
import { JournalContext } from "./JournalProvider"
import "./Journal.css"
import { useParams, useHistory } from "react-router-dom"
import { Icon } from "semantic-ui-react"

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

    return (
        <section className="journal">
            <h3 className="journal__name">{journal.concept}</h3>
    <p>{journal.date}</p>
    <p>{journal.userApproval}</p>
    <p>{journal.crowdApproval}</p>
            <button onClick={
                () => {
                    deleteJournal(journal.id)
                        .then(() => {
                            history.push("/journals")
                        })
                }}>delete
            </button>
            <button type="button" onClick={() => {
                history.push(`/journals/edit/${journal.id}`)
            }}>edit</button>
        </section>
    )
}