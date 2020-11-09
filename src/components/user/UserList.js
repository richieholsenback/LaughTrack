import React, { useContext, useEffect, useState } from "react"
import { UserContext } from "./UserProvider"
import { UserCard } from "./UserCard"
import { useHistory } from "react-router-dom"
import { FollowerContext } from "../follower/FollowerProvider"

export const UserList = () => {

  const { user, getUsers, searchTerms } = useContext(UserContext)
  const { followers, getFollowers } = useContext(FollowerContext)

  const [filteredUsers, setFiltered] = useState([])

  // const history = useHistory()

  useEffect(() => {
    getFollowers().then(
      getUsers())
  }, [])

  useEffect(() => {
    if (searchTerms !== "") {
      const subset = user.filter(users => users.username.toLowerCase().includes(searchTerms))
      setFiltered(subset)
    } else {
      setFiltered(user)
    }
  }, [searchTerms, user])

  const findIfFollowing = (obj) => {
    const hasFollowers = followers.find(follower => follower.userId === obj.id)
    if (!hasFollowers && obj.id !== parseInt(sessionStorage.getItem("active_user"))) {
      return <UserCard key={obj.id} user={obj} />
    }
  }

  // const filteredUsers = followers.filter(follower => follower.followingId !== users.userId)


  return (
    <>
      <div className="users">
        {
          filteredUsers.map(user => {
            return findIfFollowing(user)
          })
        }
      </div>
    </>
  )
}

