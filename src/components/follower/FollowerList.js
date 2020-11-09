import React, { useContext, useEffect } from "react"
import { FollowerContext } from "./FollowerProvider"
import { FollowerCard } from "./FollowerCard"
import { useHistory } from "react-router-dom"
import "./Follower.css"

export const FollowerList = () => {

  const { followers, getFollowersForList } = useContext(FollowerContext)

  useEffect(() => {
    getFollowersForList()
  }, [])

  const history = useHistory()
  //returns the user's list of followers

  const filteredFollowers = followers.filter(follower => follower.followedById === parseInt(sessionStorage.getItem("active_user")))

  return (
    <section className="followers">
      <div className="followersTop">
        <h2>You Follow</h2>
      </div>
      <br></br>
      <div className="followingList">
        {
          filteredFollowers.map(follower => {
            return <FollowerCard key={follower.id} follower={follower} />
          })
        }
      </div>
    </section>
  )
}