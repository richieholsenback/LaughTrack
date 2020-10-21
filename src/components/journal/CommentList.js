import React, { useContext, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { CommentContext } from "./CommentProvider"
import { CommentCard } from './CommentCard'

export const CommentList = () => {
    const {comments, getComments} = useContext(CommentContext)

    useEffect(() => {
        getComments()
    }, [])

    const history = useHistory()

    return (
        <>
        <h3>Comments</h3>
        <div className="commentSection">
            {
                comments.map(comment => {
                    return <CommentCard key={comment.id} comment={comment} />
                })
            }
        </div>
        </>
    )
}