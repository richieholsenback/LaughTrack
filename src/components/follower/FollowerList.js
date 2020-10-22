import React, { useContext, useEffect } from "react"
import { FollowerContext } from "./FollowerProvider"
import { FollowerCard } from "./FollowerCard"
import { useHistory } from "react-router-dom"

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
    <div className="followers">
      <div className="followersTop">
        <h2>Your Followers</h2>
        <button onClick={()=> {history.push("followers/add")}}>
          Add New Follower
        </button>
      </div>
      {
        followers.map(match => {
          return <FollowerCard key={match.id} followers={match} />
        })
      }
    </div>
  )
}