import React, { useContext, useEffect, useState } from "react"
import { JournalContext } from "./JournalProvider"
import "./Journal.css"
import { useParams, useHistory } from "react-router-dom"
import { Button, Card, Icon } from "semantic-ui-react"
import ReactPlayer from "react-player"
import { CommentForm } from './comments/CommentForm'
import { CommentList } from "./comments/CommentList"

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
                        }}><Icon name="trash" />
                    </Button>
                    <Button onClick={() => {
                        history.push(`/journals/edit/${journal.id}`)
                    }}><Icon name="edit" />
                    </Button>
                </>
            )
    })

    return (
        <>
            <div className="cardContainer">
                <Card fluid>
                    <Card.Content fluid >
                        <ReactPlayer
                            url={journal.url} />
                        <br></br>
                        <Card.Header >{journal.concept}</Card.Header>
                        <Card.Meta>By {users.username}</Card.Meta>
                        <Card.Description><strong>Date Performed</strong> - {journal.date}</Card.Description>
                        <Card.Description><strong>How did I think it went</strong> - {journal.userApproval}</Card.Description>
                        <Card.Description><strong>How did the crowd react</strong> - {journal.crowdApproval}</Card.Description>
                        <Card.Description><strong>Notes about the performance</strong> - {journal.userNotes}</Card.Description>
                        <Card.Content>
                            {buttonShow()}
                        </Card.Content>
                        <Card.Content >
                            {CommentForm()}
                            {CommentList()}
                        </Card.Content>
                    </Card.Content>
                </Card>
            </div>
        </>
    )
}