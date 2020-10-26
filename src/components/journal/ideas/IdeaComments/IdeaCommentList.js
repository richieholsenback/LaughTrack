import React, { useContext, useEffect, useState } from "react"
import { IdeaCommentContext } from "./IdeaCommentProvider"
import { IdeaCommentCard } from './IdeaCommentCard'
import { JournalIdeaContext} from '../JournalIdeaProvider'
import { useParams } from "react-router-dom"

export const IdeaCommentList = () => {
    const {ideaComments, getIdeaComments} = useContext(IdeaCommentContext)
    const {ideaJournals, getJournalIdeas} = useContext(JournalIdeaContext)
    const [filteredIdeaComments, setFilteredIdeaComments] = useState([])

    useEffect(() => {
        getIdeaComments()
        getJournalIdeas()
    }, [])

    const {journalIdeaId} = useParams()

    useEffect(() => {
        let newFilteredIdeaComments = ideaComments.filter(ideaComment => ideaComment.journalIdeaId === +journalIdeaId)

        setFilteredIdeaComments(newFilteredIdeaComments)
    }, [ideaComments])

    return (
        <>
        {console.log(filteredIdeaComments)}
        {/* <h3>IdeaComments</h3> */}
        <div className="ideaCommentSection">
            {
                filteredIdeaComments.map(ideaComment => {
                    return <IdeaCommentCard key={ideaComment.id} ideaComment={ideaComment} />
                })
            }
        </div>
        </>
    )
}