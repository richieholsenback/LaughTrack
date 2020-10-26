import React, { useContext, useEffect, useState } from "react"
import { JournalContext } from "./JournalProvider"
import "./Journal.css"
import { useParams, useHistory } from "react-router-dom"
import { Button, Card, Icon } from "semantic-ui-react"
import ReactPlayer from "react-player"
import {CommentForm} from '../comments/CommentForm'
import { CommentList } from "../comments/CommentList"

export const JournalDetail = () => {
    const { getJournalById, deleteJournal } = useContext(JournalContext)

    const [journal, setJournal] = useState({})
    const [users, setUser] = useState({})
    const [comment, setComment] = useState({})

    const { journalId } = useParams();
    const history = useHistory();

    useEffect(() => {
        getJournalById(journalId)
            .then((response) => {
                setJournal(response)
                setUser(response.user)
                setComment(response.comment)
            })
    }, [])

    const buttonShow = (() => {
        if (journal.userId === parseInt(localStorage.getItem("active_user")))
            return (
                <>
                    <Button onClick={
                        () => {
                            deleteJournal(journal.id)
                                .then(() => {
                                    history.push("/journals")
                                })
                        }}>Delete
                    </Button>
                    <Button onClick={() => {
                        history.push(`/journals/edit/${journal.id}`)
                    }}>Edit
                    </Button>
                </>
            )
    })

    return (
        <>
        <Card className="journalEntry">
            <Card.Content>
                <h3 className="journal__name">{journal.concept}</h3>
                <p>By {users.username}</p>
                <ReactPlayer
                    url={journal.url} />
                <p><strong>Date Performed</strong> - {journal.date}</p>
                <p><strong>How did I think it went</strong> - {journal.userApproval}</p>
                <p><strong>How did the crowd react</strong> - {journal.crowdApproval}</p>
                <p><strong>Notes about the performance</strong> - {journal.userNotes}</p>
            </Card.Content>
            <section className="buttons">
                {buttonShow()}
            </section>
        </Card>
        <Card className="comments">
            {CommentForm()}
            {CommentList()}
        </Card>
        </>
    )
}