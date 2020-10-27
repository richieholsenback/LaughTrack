import React, { useContext, useEffect, useState } from "react"
import { UserContext } from "./UserProvider"
import { UserCard } from "./UserCard"
import { useHistory } from "react-router-dom"

export const UserList = () => {

  const { user, getUsers, searchTerms } = useContext(UserContext)

  const [filteredUsers, setFiltered] = useState([])

  const history = useHistory()

  useEffect(() => {
    getUsers()
  }, [])

  useEffect(() => {
    if (searchTerms !== "") {
      const subset = user.filter(users => users.username.toLowerCase().includes(searchTerms))
      setFiltered(subset)
    } else {
      setFiltered(user)
    }
  }, [searchTerms, user])

  // const filteredUsers = followers.filter(follower => follower.followingId !== users.userId)

  return (
    <>
      <div className="users">
        {
          filteredUsers.map(user => {
            return <UserCard key={user.id} user={user} />
          })
        }
      </div>
    </>
  )
}