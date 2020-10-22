import React, { useContext, useEffect } from "react"
import { FollowerContext } from "./FollowerProvider"
import { FollowerCard } from "./FollowerCard"
import { useHistory } from "react-router-dom"
import { UserContext } from "../user/UserProvider"

export const FollowerList = () => {
  // This state changes when `getFollowers()` is invoked below
  const { followers, getFollowers } = useContext(FollowerContext)
	
	//useEffect - reach out to the world for something
  useEffect(() => {
    getFollowers()
  }, [])

  const history = useHistory()
  //returns the user's list of followers
  return (
    <section className="followers">
      <div className="followersTop">
        <h2>Following</h2>
        {/* <button onClick={()=> {history.push("followers")}}>
          Add New Follower
        </button> */}
      </div>
      {
        followers.map(follow => {
          return <FollowerCard key={follow.id} followers={followers} />
        })
      }
    </section>
  )
}