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
        if (journal.userId === parseInt(sessionStorage.getItem("active_user")))
            return (
                <>
                    <Button onClick={
                        () => {
                            deleteJournal(journal.id)
                                .then(() => {
                                    history.push("/journals")
                                })
                        }}><Icon name="trash" /> Delete
                    </Button>
                    <Button onClick={() => {
                        history.push(`/journals/edit/${journal.id}`)
                    }}><Icon name="edit" /> Edit
                    </Button>
                </>
            )
    })

    return (
        <>
                <section >
                    <div className="ideaEntryPerf">
                        <h3 className="idea__concept">{journal.concept}</h3>
                        <p className="idea__content" id="perfUser">By {users.username}</p>
                        <p className="idea__content" id="perfDate"><strong>Performed on</strong> {journal.date}</p>
                        <ReactPlayer
                            url={journal.url}/>
                        <br></br>
                        <p className="idea__content"><strong>How I think it went</strong> - {journal.userApproval}</p>
                        <p className="idea__content"><strong>How the crowd reacted</strong> - {journal.crowdApproval}</p>
                        <p className="idea__content"><strong>Notes about the performance</strong> - {journal.userNotes}</p>
                        <div>
                            {buttonShow()}
                        </div>
                    </div>
                </section>
                        <div className="commentListicle">
                            <h2>Comments</h2>
                            {CommentList()}
                            {CommentForm()}
                        </div>
                    </>
    )
}