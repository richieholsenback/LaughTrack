import React, { useContext, useEffect } from "react"
import { FollowerContext } from "./FollowerProvider"
import { FollowerCard } from "./FollowerCard"
import { useHistory } from "react-router-dom"
import { UserContext } from "../user/UserProvider"

export const FollowerList = () => {
  
  const { followers, getFollowers } = useContext(FollowerContext)
  
  useEffect(() => {
    getFollowers()
  }, [])

  const history = useHistory()
  //returns the user's list of followers

  return (
    <section className="followers">
      <div className="followersTop">
        <h2>You Follow</h2>
      </div>
      {
        followers.map(follower => {
          return <FollowerCard key={follower.id} follower={follower} />
        })
      }
    </section>
  )
}