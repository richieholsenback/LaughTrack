import React, { useContext, useEffect, useState } from "react"
import { EventContext } from "./EventProvider"
import "./Event.css"
import { useParams, useHistory } from "react-router-dom"
import { Button, Card, Icon, Image } from "semantic-ui-react"

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
        if (event.userId === parseInt(sessionStorage.getItem("active_user")))
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
        <div className="cardDescrip">
            <Card className="event">
                <Image src={event.poster} wrapped ui={false} />
                <Card.Content>
                    <h3 className="event__name">{event.name}</h3>
                    <Card.Description>Hosted by {user.username}</Card.Description>
                    <Card.Meta>{event.date}</Card.Meta>
                    <Card.Description>{event.location}</Card.Description>
                    <Card.Description>{event.address}</Card.Description>
                    <Card.Description>{event.city}, {event.state} {event.zip}</Card.Description>
                    <br></br>
                    <Card.Description>{event.description}</Card.Description>
                </Card.Content>
                <section className="buttons">
                    {buttonShow()}
                </section>
            </Card>
        </div>
    )
}