import React, { useContext, useEffect, useState } from "react"
import { IdeaCommentContext } from "./IdeaCommentProvider"
import { IdeaCommentCard } from './IdeaCommentCard'
import { IdeaContext} from '../IdeaProvider'
import { useParams } from "react-router-dom"

export const IdeaCommentList = () => {
    const {ideaComments, getIdeaComments} = useContext(IdeaCommentContext)
    const {ideaJournals, getIdeas} = useContext(IdeaContext)
    const [filteredIdeaComments, setFilteredIdeaComments] = useState([])

    useEffect(() => {
        getIdeaComments()
        getIdeas()
    }, [])

    const {ideaId} = useParams()

    useEffect(() => {
        let newFilteredIdeaComments = ideaComments.filter(ideaComment => ideaComment.ideaId === +ideaId)

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