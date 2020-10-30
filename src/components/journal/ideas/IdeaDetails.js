import React, { useContext, useEffect, useState } from "react"
// import "./Idea.css"
import { useParams, useHistory } from "react-router-dom"
import { Button, Card, Icon } from "semantic-ui-react"
import { IdeaContext } from "./IdeaProvider"
import { IdeaCommentForm } from "./IdeaComments/IdeaCommentForm"
import { IdeaCommentList } from "./IdeaComments/IdeaCommentList"

export const IdeaDetail = () => {
    const { getIdeaById, deleteIdea } = useContext(IdeaContext)

    const [idea, setIdea] = useState({})
    const [users, setUser] = useState({})
    const [comment, setComment] = useState({})

    const { ideaId } = useParams();
    const history = useHistory();

    useEffect(() => {
        getIdeaById(ideaId)
            .then((response) => {
                setIdea(response)
                setUser(response.user)
                setComment(response.comment)
            })
    }, [])

    const buttonShow = (() => {
        if (idea.userId === parseInt(localStorage.getItem("active_user")))
            return (
                <>
                    <Button onClick={
                        () => {
                            deleteIdea(idea.id)
                                .then(() => {
                                    history.push("/journals/ideas")
                                })
                        }}><Icon name="trash" />
                    </Button>
                    <Button onClick={() => {
                        history.push(`/journals/ideas/edit/${idea.id}`)
                    }}><Icon name="edit" />
                    </Button>
                </>
            )
    })

    return (
        <div>
            <br></br>
            <br></br>
            <section className="ideaEntry">
                <Card.Content>
                    <h3 className="idea__concept">{idea.concept}</h3>
                    <p>By {users.username}</p>
                    <p><strong>Date</strong> - {idea.date}</p>
                    <p><strong>Note</strong> - {idea.note}</p>
                </Card.Content>
                <br></br>
                <section className="buttons">
                    {buttonShow()}
                </section>
            </section>
            <br></br>
            <section className="comments">
                {IdeaCommentForm()}
                {IdeaCommentList()}
            </section>
        </div>
    )
}