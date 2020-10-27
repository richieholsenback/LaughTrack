import React, { useContext, useEffect } from "react"
import { Link, useHistory } from "react-router-dom"
import { UserContext } from "../user/UserProvider"
import "./performances/Journal.css"
import { JournalContext } from "./performances/JournalProvider"
import { JournalCard } from "./performances/JournalCard"
import { JournalIdeaCard } from "./ideas/JournalIdeaCard"
import { JournalIdeaContext } from "./ideas/JournalIdeaProvider"

export const JournalHub = () => {
    // This state changes when `getAnimals()` is invoked below
    const { journals, getJournals } = useContext(JournalContext)
    const { journalIdeas, getJournalIdeas } = useContext(JournalIdeaContext)

    //useEffect - reach out to the world for something
    useEffect(() => {
        getJournals()
        getJournalIdeas()
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
        <div className="journalIdeas">
        {/* {console.log("JournalIdeaList: Render")} */}
        <h3 class="journalSection">Joke Ideas</h3>
        {
            journalIdeas.map(journalIdea => {
                return <JournalIdeaCard key={journalIdea.id} journalIdea={journalIdea}  />
            })
        }
    </div>
    </>
    )
}