import React, { useContext, useEffect, useState } from "react"
import { JournalContext } from "../performances/JournalProvider"
// import "./JournalIdea.css"
import { useParams, useHistory } from "react-router-dom"
import { Button, Card, Icon } from "semantic-ui-react"
import ReactPlayer from "react-player"
import {CommentForm} from '../comments/CommentForm'
import { CommentList } from "../comments/CommentList"

export const JournalIdeaDetail = () => {
    const { getJournalIdeaById, deleteJournalIdea } = useContext(JournalContext)

    const [journalIdea, setJournalIdea] = useState({})
    const [users, setUser] = useState({})
    const [comment, setComment] = useState({})

    const { journalIdeaId } = useParams();
    const history = useHistory();

    useEffect(() => {
        getJournalIdeaById(journalIdeaId)
            .then((response) => {
                setJournalIdea(response)
                setUser(response.user)
                setComment(response.comment)
            })
    }, [])

    const buttonShow = (() => {
        if (journalIdea.userId === parseInt(localStorage.getItem("active_user")))
            return (
                <>
                    <Button onClick={
                        () => {
                            deleteJournalIdea(journalIdea.id)
                                .then(() => {
                                    history.push("/journal/ideas")
                                })
                        }}>Delete
                    </Button>
                    <Button onClick={() => {
                        history.push(`/journal/ideas/edit/${journalIdea.id}`)
                    }}>Edit
                    </Button>
                </>
            )
    })

    return (
        <>
        <Card className="journalIdeaEntry">
            <Card.Content>
                <h3 className="journalIdea__name">{journalIdea.concept}</h3>
                <p>By {users.username}</p>
                <ReactPlayer
                    url={journalIdea.url} />
                <p><strong>Date Performed</strong> - {journalIdea.date}</p>
                <p><strong>How did I think it went</strong> - {journalIdea.notes}</p>
                <p><strong>How did the crowd react</strong> - {journalIdea.user.username}</p>
                <p><strong>Notes about the performance</strong> - {journalIdea.userNotes}</p>
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