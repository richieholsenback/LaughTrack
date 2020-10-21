import React, { useState, createContext } from "react"

// The context is imported and used by individual components that need data

export const CommentContext = createContext()

// This component establishes what data can be used.
export const CommentProvider = (props) => {
    const [comments, setComments] = useState([])

    const getComments = () => {
        return fetch("http://localhost:8088/comments?_expand=user")
        .then(res => res.json())
        .then(setComments)
    }

    const addComment = commentObj => {
        return fetch("http://localhost:8088/comments", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(commentObj)
        })
        .then(getComments)
    }

    const getCommentById = (id)=> {
        return fetch(`http://localhost:8088/comments/${id}?_expand=user`)
            .then(res => res.json())
    }

    const deleteComment = commentId => {
        return fetch(`http://localhost:8088/comments/${commentId}`, {
            method: "DELETE"
        })
            .then(getComments)
    }

    const updateComment = comment => {
        return fetch(`http://localhost:8088/comments/${comment.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(comment)
        })
            .then(getComments)
    }
    

    /*
        You return a context provider which has the
        `locations` state, the `addLocation` function,
        and the `getLocation` function as keys. This
        allows any child elements to access them.
    */
    return (
        <CommentContext.Provider value={{
            comments, getComments, addComment, getCommentById, deleteComment, updateComment
        }}>
            {props.children}
        </CommentContext.Provider>
    )
}