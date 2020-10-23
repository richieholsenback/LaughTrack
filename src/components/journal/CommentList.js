import React, { useContext, useEffect } from "react"
import { CommentContext } from "./CommentProvider"
import { CommentCard } from './CommentCard'

export const CommentList = () => {
    const {comments, getComments} = useContext(CommentContext)

    useEffect(() => {
        getComments()
    }, [])

    return (
        <>
        {/* <h3>Comments</h3> */}
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