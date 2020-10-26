import React, { useContext, useEffect, useState } from "react"
// import "./JournalIdea.css"
import { useParams, useHistory } from "react-router-dom"
import { Button, Card, Icon } from "semantic-ui-react"
import { JournalIdeaContext } from "./JournalIdeaProvider"
import { IdeaCommentForm } from "./IdeaComments/IdeaCommentForm"
import { IdeaCommentList } from "./IdeaComments/IdeaCommentList"

export const JournalIdeaDetail = () => {
    const { getJournalIdeaById, deleteJournalIdea } = useContext(JournalIdeaContext)

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
                <p>By Me</p>
                <p><strong>Date</strong> - {journalIdea.date}</p>
                <p><strong>Note</strong> - {journalIdea.notes}</p>
            </Card.Content>
            <section className="buttons">
                {buttonShow()}
            </section>
        </Card>
        <Card className="comments">
            {IdeaCommentForm()}
            {IdeaCommentList()}
        </Card>
        </>
    )
}