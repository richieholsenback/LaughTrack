import React from "react"
import { Link } from "react-router-dom"
import { Card, Image } from "semantic-ui-react"
import "./Event.css";

export const EventCard = ({ event }) => (
    <Card className="eventCard">
        <Image className="eventcardposter" src={event.poster} wrapped ui={false}/>
        <h3 className="event__title">
            <Link to={`/events/detail/${event.id}`}>
                {event.name}
            </Link>
        </h3>
        <p className="eventCardDetail">
            {event.date}
        </p>
    </Card>
    )