import React, { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { EventCard } from "../event/EventCard"
import { EventContext } from "../event/EventProvider"
import "../journal/Journal.css"
import { JournalCard } from "../journal/JournalCard"
import { JournalContext } from "../journal/JournalProvider"
import { FollowerContext } from "./FollowerProvider"

export const FollowerDetails = () => {
    const { journals, getJournals } = useContext(JournalContext)
    const { events, getEvents } = useContext(EventContext)
    const [filteredEvents, setFilteredEvents] = useState([])
    const [filteredJournals, setFilteredJournals] = useState([])

    //useEffect - reach out to the world for something
    useEffect(() => {
        // debugger;
        getJournals()
        getEvents()
    }, [])

    const { followingId } = useParams()
    console.log(followingId)

    useEffect(() => {
        
        let newFilteredEvents = events.filter(event => event.userId === +followingId)
        
        setFilteredEvents(newFilteredEvents)
    }, [events])

    useEffect(() => {
        
        let newFilteredJournals = journals.filter(journal => journal.userId === +followingId)
        
        setFilteredJournals(newFilteredJournals)
    }, [journals])

    return (
        <>
            {console.log(filteredEvents)}
            {console.log("Whoop!", filteredJournals)}

            <div className="journals">
                <h4>Their Journal Entries</h4>
                {
                    filteredJournals.map(journal => {
                        return <JournalCard key={journal.id} journal={journal} />
                    })
                }
            </div>
            <div className="events">
                <h4>Their Created Events</h4>
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

