import React from "react"
import { Link } from "react-router-dom"
import { Card, Image } from "semantic-ui-react"
import "./Event.css";

export const EventCard = ({ event }) => (
    <Card className="eventCard">
        <Link to={`/events/detail/${event.id}`}>
            <Image className="eventcardposter" src={event.poster} wrapped ui={false} width="100%"/>
        </Link>
        <Card.Content>
        <Card.Header>
            <Link to={`/events/detail/${event.id}`}>
                <h4 className="event__title">
                {event.name}
                </h4>
            </Link>
        </Card.Header>
        <Card.Meta className="event__date">
            {event.date}
        </Card.Meta>
        </Card.Content>
    </Card>
)