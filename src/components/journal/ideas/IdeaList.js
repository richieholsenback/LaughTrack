import React, { useContext, useEffect, useState } from "react"
import { Link, useHistory } from "react-router-dom"
// import "./Idea.css"
import { IdeaCard } from "./IdeaCard"
import { IdeaContext } from "./IdeaProvider"

export const IdeaList = () => {
    // This state changes when `getAnimals()` is invoked below
    const { ideas, getIdeas, searchTerms } = useContext(IdeaContext)
    const [ filteredIdeas, setFiltered ] = useState([])

    //useEffect - reach out to the world for something
    useEffect(() => {
        getIdeas()

    }, [])

    const history = useHistory()

    useEffect(() => {
        if (searchTerms !== "") {
            // If the search field is not blank, display matching ideas
            const subset = ideas.filter(idea => idea.concept.toLowerCase().includes(searchTerms))
            setFiltered(subset)
        } else {
            // If the search field is blank, display all ideas
            setFiltered(ideas)
        }
    }, [searchTerms, ideas])

    const journalShow = ((entry) => {
        
        if (entry.hidden === true && entry.userId !== parseInt(localStorage.getItem("active_user"))){
            return null
        } else {
            return <IdeaCard key={entry.id} idea={entry} />
        }

    })

    return (
        <div className="ideas">
            {/* {console.log("IdeaList: Render")} */}
            
            <button type="button" onClick={() => history.push("/journals/ideas/create")}>New Entry</button>
            {
                filteredIdeas.map(idea => {
                    return journalShow(idea)
                })
            }
        </div>
    )
}