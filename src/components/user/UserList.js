import React, { useContext, useEffect} from "react"
import { UserContext } from "./UserProvider"
import { UserCard } from "./UserCard"
import {useHistory} from "react-router-dom"
import { FollowerContext } from "../follower/FollowerProvider"

export const UserList = () => {
    const { user, getUsers } = useContext(UserContext)
    const { followers, getFollowers } = useContext(FollowerContext)
    const history = useHistory()
    
    useEffect(() => {
		getUsers()
		
    }, [])

    // const filteredUsers = followers.filter(follower => follower.followingId !== users.userId)

    return (
      <>
          <h3>Suggested Follow</h3>
        <div>
      {
      user.map(users => {
        return <UserCard key={users.id} users={users} />
      })
      }
        </div>
      </>
  )
}