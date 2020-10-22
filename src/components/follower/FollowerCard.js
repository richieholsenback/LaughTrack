import React, { useContext } from "react"
import { FollowerContext } from "./FollowerProvider"

//creates html for each follower, which can be clicked to view the details of that follower
export const FollowerCard = ({ follower }) => (
    <section className="follower">
        <h3 className="follower__name">{ follower.user.username }</h3>
    </section>
)