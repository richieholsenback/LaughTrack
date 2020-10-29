import React, { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { EventCard } from "../event/EventCard"
import { EventContext } from "../event/EventProvider"
import { IdeaCard } from "../journal/ideas/IdeaCard"
import { IdeaContext } from "../journal/ideas/IdeaProvider"
import "../journal/performances/Journal.css"
import { JournalCard } from "../journal/performances/JournalCard"
import { JournalContext } from "../journal/performances/JournalProvider"
import { FollowerContext } from "./FollowerProvider"

export const FollowerDetails = () => {
    const { journals, getJournals } = useContext(JournalContext)
    const { ideas, getIdeas } = useContext(IdeaContext)
    const { events, getEvents } = useContext(EventContext)
    const [filteredEvents, setFilteredEvents] = useState([])
    const [filteredJournals, setFilteredJournals] = useState([])
    const [filteredIdeas, setFilteredIdeas] = useState([])

    //useEffect - reach out to the world for something
    useEffect(() => {
        // debugger;
        getJournals()
        getIdeas()
        getEvents()
    }, [])

    const { followingId } = useParams()
    // console.log(followingId)

    useEffect(() => {
        
        let newFilteredEvents = events.filter(event => event.userId === +followingId)
        
        setFilteredEvents(newFilteredEvents)
    }, [events])

    useEffect(() => {
        
        let newFilteredIdeas = ideas.filter(idea => idea.userId === +followingId)
        
        setFilteredIdeas(newFilteredIdeas)
    }, [ideas])

    useEffect(() => {
        
        let newFilteredJournals = journals.filter(journal => journal.userId === +followingId)
        
        setFilteredJournals(newFilteredJournals)
    }, [journals])

    return (
        <>
            {/* {console.log(filteredEvents)}
            {console.log("Whoop!", filteredJournals)} */}

            <div className="journals">
                <h4>Journal Entries</h4>
                {
                    filteredJournals.map(journal => {
                        return <JournalCard key={journal.id} journal={journal} />
                    })
                }
            </div>
            <div className="journals">
                <h4>Joke Ideas</h4>
                {
                    filteredIdeas.map(idea => {
                        return <IdeaCard key={idea.id} idea={idea} />
                    })
                }
            </div>
            <div className="events">
                <h4>Created Events</h4>
                <div>
                    {
                        filteredEvents.map(event => {
                            return <EventCard key={event.id} event={event} user={event.user.username} />
                        })
                    }
                </div>
            </div>
        </>
    )
}

