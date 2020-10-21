import React, { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { Button, Form, Label, TextArea } from "semantic-ui-react"
import { CommentContext } from "./CommentProvider"

export const CommentForm = (props) => {
    const {addComment, getCommentById, updateComment} = useContext(CommentContext)

    const [comment, setComment] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    const { commentId } = useParams()
    const history = useHistory()

    const HandleControlledInputChange = (event) => {
        const newComment = {...comment}
        newComment[event.target.name] = event.target.value
    }

    useEffect(() => {
        if (commentId){
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
        const userId = parseInt(localStorage.getItem("activeUser"))
        setIsLoading(false)
        if (commentId) {
            updateComment({
                id: comment.id,
                userId: userId,
                text: comment.text,
                date: new Intl.DateTimeFormat('en-US', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit'
                }).format(Date.now())
            })
            .then(() => history.push(`/journals/detail/${comment.id}`))
        } else {
            addComment({
                userId: userId,
                text: comment.text,
                date: new Intl.DateTimeFormat('en-US', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit'
                }).format(Date.now())
            })
            .then(() => history.push("comments"))
        }
    }

    return (
        <Form className="commentForm">
            <h3 className="commentForm__title">Comments</h3>
            <Form.Field>
                <div className="form-group">
                    <Label htmlFort="text">Comment:</Label>
                    <TextArea type="text" id="commentText" name="text" required autoFocus className="form-control"
                        placeholder="Comment here..."
                        onChange={HandleControlledInputChange}
                        defaultValue={comment.text} />
                </div>
            </Form.Field>
            <Button type="submit"
                className="btn btn-primary"
                disabled={isLoading}
                onClick={event => {
                    event.preventDefault() // Prevent browser from submitting the form
                    constructCommentObject()
                }}>
                {commentId ? <>Save Comment</> : <>Add Comment</>}</Button>
        </Form>
    )
}