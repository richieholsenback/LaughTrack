import React, { useContext, useEffect, useState } from "react"
import { CommentContext } from "./CommentProvider"
import { CommentCard } from './CommentCard'
import { JournalContext} from '../performances/JournalProvider'
import { useParams } from "react-router-dom"
import { Card } from "semantic-ui-react"

export const CommentList = () => {
    const {comments, getComments} = useContext(CommentContext)
    const {journals, getJournals} = useContext(JournalContext)
    const [filteredComments, setFilteredComments] = useState([])

    useEffect(() => {
        getComments()
        getJournals()
    }, [])

    const {journalId} = useParams()

    useEffect(() => {
        let newFilteredComments = comments.filter(comment => comment.journalId === +journalId)

        setFilteredComments(newFilteredComments)
    }, [comments])

    return (
        <>
        <Card className="commentSection">
            {
                filteredComments.map(comment => {
                    return <CommentCard key={comment.id} comment={comment} />
                })
            }
        </Card>
        </>
    )
}