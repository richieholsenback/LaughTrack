import React, { useContext, useEffect } from "react"
import { Link, useHistory } from "react-router-dom"
import { UserContext } from "../user/UserProvider"
import "./performances/Journal.css"
import { JournalContext } from "./performances/JournalProvider"
import { JournalCard } from "./performances/JournalCard"
import { IdeaCard } from "./ideas/IdeaCard"
import { IdeaContext } from "./ideas/IdeaProvider"

export const JournalHub = () => {
    // This state changes when `getAnimals()` is invoked below
    const { journals, getJournals } = useContext(JournalContext)
    const { ideas, getIdeas } = useContext(IdeaContext)

    //useEffect - reach out to the world for something
    useEffect(() => {
        getJournals()
        getIdeas()
    }, [])

    const history = useHistory()

    return (
        <>
        <div className="journals">
            <div className="journalSelect">
                <div class="spacer"></div>
                <Link to="/journals/performances">Performances</Link>
                <br></br>
                <Link to="/journals/ideas">Ideas</Link>
                <div class="spacer"></div>
            </div>
            <br></br>
            <h3 class="journalSection">Joke Performances</h3>
            {
                journals.map(journal => {
                    return <JournalCard key={journal.id} journal={journal}  />
                })
            }
        </div>
        <div className="ideas">
        {/* {console.log("IdeaList: Render")} */}
        <h3 class="journalSection">Joke Ideas</h3>
        {
            ideas.map(idea => {
                return <IdeaCard key={idea.id} idea={idea}  />
            })
        }
    </div>
    </>
    )
}