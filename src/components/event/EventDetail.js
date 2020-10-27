import React, { useContext, useEffect, useState } from "react"
import { EventContext } from "./EventProvider"
import "./Event.css"
import { useParams, useHistory } from "react-router-dom"
import { Button, Icon, Image } from "semantic-ui-react"

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

    const buttonShow = (() => {
        if (event.userId === parseInt(localStorage.getItem("active_user")))
            return (
                <>
                    <Button onClick={
                        () => {
                            deleteEvent(event.id)
                                .then(() => {
                                    history.push("/events")
                                })
                        }}>Delete
                    </Button>
                    <Button onClick={() => {
                        history.push(`/events/edit/${event.id}`)
                    }}>Edit
                    </Button>
                </>
            )
    })

    return (
        <section className="event">
            <Image src={event.poster} />
            <h3 className="event__name">{event.name}</h3>
            <p>Hosted by {user.username}</p>
            <p>{event.date}</p>
            <p>{event.location}</p>
            <p>{event.address}</p>
            <p>{event.city}</p>
            <p>{event.state}</p>
            <p>{event.zip}</p>
            <p>{event.description}</p>
            <section className="buttons">
                {buttonShow()}
            </section>
        </section>
    )
}