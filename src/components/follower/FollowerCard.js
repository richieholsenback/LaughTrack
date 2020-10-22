import React, { useContext } from "react"
import { Link } from "react-router-dom"
import { FollowerContext } from "./FollowerProvider"

//creates html for each follower, which can be clicked to view the details of that follower
export const FollowerCard = ({ follower }) => {
    return (
        <section className="follower">
           <Link to={`/followers/detail/${follower.userId}`}> <h4 className="follower__name">{follower.user.username}</h4></Link>
        </section>
    )
}
