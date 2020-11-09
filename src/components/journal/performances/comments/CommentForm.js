import React, { useContext, useEffect, useRef, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { Button, Form, Label, TextArea } from "semantic-ui-react"
import { CommentContext } from "./CommentProvider"

export const CommentForm = (props) => {
    const { addComment, getCommentById, updateComment } = useContext(CommentContext)

    const [comment, setComment] = useState({})
    const [isLoading, setIsLoading] = useState(true);

    const { commentId } = useParams();
    const { journalId } = useParams();
    const history = useHistory();

    const handleControlledInputChange = (event) => {
        const newComment = { ...comment }
        newComment[event.target.name] = event.target.value
        setComment(newComment)
    }

    useEffect(() => {
        if (commentId) {
            getCommentById(commentId)
                .then(comment => {
                    setComment(comment)
                    setIsLoading(false)
                })
        } else {
            setIsLoading(false)
        }
    }, [])

    const constructCommentObject = () => {
        const userId = parseInt(sessionStorage.getItem("active_user"))
        setIsLoading(false)
        if (commentId) {
            updateComment({
                id: comment.id,
                userId: userId,
                text: comment.text,
                journalId: +journalId,
                date: new Intl.DateTimeFormat('en-US', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit'
                }).format(Date.now())
            })
                .then(() => history.push(`/journals/detail/${journalId}`))
        } else {
            addComment({
                userId: userId,
                text: comment.text,
                journalId: +journalId,
                date: new Intl.DateTimeFormat('en-US', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit'
                }).format(Date.now())
            })
                .then(() => history.push(`/journals/detail/${journalId}`))
        }
    }

    return (
        <Form className="commentForm">
            <h3 className="ideaCommentForm__title">Comments</h3>
            <Form.Field>
                <div className="form-group">
                    <TextArea type="text" id="commentText" name="text" required autoFocus className="form-control"
                        placeholder="Comment here..."
                        style={{ minHeight: 100 }}
                        onChange={handleControlledInputChange}
                        defaultValue={comment.text} />
                </div>
            </Form.Field>
            <Button
                type="submit"
                className="btn btn-primary"
                disabled={isLoading}
                onClick={event => {
                    event.preventDefault()
                    constructCommentObject()
                }}>
                {commentId ? <>Save Comment</> : <>Add Comment</>}</Button>
        </Form>
    )
}