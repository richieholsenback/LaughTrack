import React, { useContext, useEffect, useRef, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { Button, Form, Label, TextArea } from "semantic-ui-react"
import { IdeaCommentContext } from "./IdeaCommentProvider"

export const IdeaCommentForm = (props) => {
    const { addIdeaComment, getIdeaCommentById, updateIdeaComment } = useContext(IdeaCommentContext)

    const [ideaComment, setIdeaComment] = useState({})
    const [isLoading, setIsLoading] = useState(true);

    const { ideaCommentId } = useParams();
    const { journalIdeaId } = useParams();
    const history = useHistory();

    const handleControlledInputChange = (event) => {
        const newIdeaComment = { ...ideaComment }
        newIdeaComment[event.target.name] = event.target.value
        setIdeaComment(newIdeaComment)
    }

    useEffect(() => {
        if (ideaCommentId) {
            getIdeaCommentById(ideaCommentId)
                .then(ideaComment => {
                    setIdeaComment(ideaComment)
                    setIsLoading(false)
                })
        } else {
            setIsLoading(false)
        }
    }, [])

    const constructIdeaCommentObject = () => {
        const userId = parseInt(localStorage.getItem("active_user"))
        setIsLoading(false)
        if (ideaCommentId) {
            updateIdeaComment({
                id: ideaComment.id,
                userId: userId,
                text: ideaComment.text,
                journalIdeaId: +journalIdeaId,
                date: new Intl.DateTimeFormat('en-US', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit'
                }).format(Date.now())
            })
                .then(() => history.push(`/journals/ideas/detail/${journalIdeaId}`))
        } else {
            addIdeaComment({
                userId: userId,
                text: ideaComment.text,
                journalIdeaId: +journalIdeaId,
                date: new Intl.DateTimeFormat('en-US', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit'
                }).format(Date.now())
            })
                .then(() => history.push(`/journals/ideas/detail/${journalIdeaId}`))
        }
    }

    return (
        <Form className="ideaCommentForm">
            <h3 className="ideaCommentForm__title">IdeaComments</h3>
            <Form.Field>
                <div className="form-group">
                    <Label htmlFor="text">IdeaComment:</Label>
                    <TextArea type="text" id="ideaCommentText" name="text" required autoFocus className="form-control"
                        placeholder="IdeaComment here..."
                        onChange={handleControlledInputChange}
                        defaultValue={ideaComment.text} />
                </div>
            </Form.Field>
            <Button
                type="submit"
                className="btn btn-primary"
                disabled={isLoading}
                onClick={event => {
                    event.preventDefault()
                    constructIdeaCommentObject()
                }}>
                {ideaCommentId ? <>Save IdeaComment</> : <>Add IdeaComment</>}</Button>
        </Form>
    )
}