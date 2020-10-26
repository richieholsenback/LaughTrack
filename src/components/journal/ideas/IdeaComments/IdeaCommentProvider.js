import React, { createContext, useState } from "react"

// The context is imported and used by individual components that need data

export const IdeaCommentContext = createContext()

// This component establishes what data can be used.
export const IdeaCommentProvider = (props) => {
    const [ideaComments, setIdeaComments] = useState([])

    const getIdeaComments = () => {
        return fetch("http://localhost:8088/ideaComments?_expand=journalIdea&_expand=user")
        .then(res => res.json())
        .then(setIdeaComments)
    }

    const addIdeaComment = commentObj => {
        return fetch("http://localhost:8088/comments", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(commentObj)
        })
        .then(getIdeaComments)
    }

    const getIdeaCommentById = (id)=> {
        return fetch(`http://localhost:8088/comments/${id}?_expand=journal&_expand=user`)
            .then(res => res.json())
    }

    const deleteIdeaComment = commentId => {
        return fetch(`http://localhost:8088/comments/${commentId}`, {
            method: "DELETE"
        })
            .then(getIdeaComments)
    }

    const updateIdeaComment = comment => {
        return fetch(`http://localhost:8088/comments/${comment.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(comment)
        })
            .then(getIdeaComments)
    }
    

    /*
        You return a context provider which has the
        `locations` state, the `addLocation` function,
        and the `getLocation` function as keys. This
        allows any child elements to access them.
    */
    return (
        <IdeaCommentContext.Provider value={{
            ideaComments, getIdeaComments, addIdeaComment, getIdeaCommentById, deleteIdeaComment, updateIdeaComment
        }}>
            {props.children}
        </IdeaCommentContext.Provider>
    )
}