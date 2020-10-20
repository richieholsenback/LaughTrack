import React, { useContext, useEffect, useState } from "react"
import { EventContext } from "./EventProvider"
import "./Event.css"
import { useParams, useHistory } from "react-router-dom"

export const EventDetail = () => {
    const { getEventById, deleteEvent } = useContext(EventContext)

    const [event, setEvent] = useState({})
    const [user, setUser] = useState({})

    const { eventId } = useParams();
    const history = useHistory();

    useEffect(() => {
        getEventById(eventId)
            .then(response => {
                setEvent(response)
                setUser(response.user)
            })
    }, [])

    return (
        <section className="event">
            <h3 className="event__name">{event.name}</h3>
            <p>Hosted by {user.username}</p>
            <p>{event.date}</p>
            <p>{event.location}</p>
            <p>{event.address}</p>
            <p>{event.city}</p>
            <p>{event.state}</p>
            <p>{event.zip}</p>
            <p>{event.description}</p>
            <button onClick={
                () => {
                    deleteEvent(event.id)
                        .then(() => {
                            history.push("/events")
                        })
                }}>delete
            </button>
            <button type="button" onClick={() => {
                history.push(`/events/edit/${event.id}`)
            }}>edit</button>
        </section>
    )
}