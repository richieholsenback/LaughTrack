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

    const journalIdeaShow = ((entry) => {
        
        if (entry.hidden === true && entry.userId !== parseInt(sessionStorage.getItem("active_user"))){
            return null
        } else {
            return <IdeaCard key={entry.id} idea={entry} />
        }

    })

    const journalPerformanceShow = ((entry) => {

        if (entry.hidden === true && entry.userId !== parseInt(sessionStorage.getItem("active_user"))) {
            return null
        } else {
            return <JournalCard key={entry.id} journal={entry} />
        }

    })

    return (
        <>
            {/* {console.log(filteredEvents)}
            {console.log("Whoop!", filteredJournals)} */}

            <div className="journals">
                <h2>Journal Entries</h2>
                <div className="detailsindiv">
                {
                filteredJournals.map(journal => {
                    return journalPerformanceShow(journal)
                }
                )
            }
                </div>
            </div>
            <div className="journals">
                <h2>Joke Ideas</h2>
                <div className="detailsindiv">
                {
                filteredIdeas.map(idea => {
                    return journalIdeaShow(idea)
                })
            }
                </div>
            </div>
            <div className="events">
                <h2>Created Events</h2>
                <div>
                    <div className="detailsindiv">
                        {
                            filteredEvents.map(event => {
                                return <EventCard key={event.id} event={event} user={event.user.username} />
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

