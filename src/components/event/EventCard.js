import React from "react"
import { Link } from "react-router-dom"
import { Card, Image } from "semantic-ui-react"
import "./Event.css";

export const EventCard = ({ event }) => (
    <Card className="eventCard">
        <Image className="eventcardposter" src={event.poster} wrapped ui={false} />
        <Card.Header className="event__title">
            <Link to={`/events/detail/${event.id}`}>
                {event.name}
            </Link>
        </Card.Header>
        <Card.Meta className="eventCardDetail">
            {event.date}
        </Card.Meta>
    </Card>
    )