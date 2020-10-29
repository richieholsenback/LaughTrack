import React, { useState, createContext } from "react"

// The context is imported and used by individual components that need data

export const IdeaContext = createContext()

// This component establishes what data can be used.
export const IdeaProvider = (props) => {
    const [ideas, setIdeas] = useState([])
    const [ searchTerms, setSearchTerms ] = useState("")

    const getIdeas = () => {
        return fetch("http://localhost:8088/ideas?_expand=user")
        .then(res => res.json())
        .then(setIdeas)
    }

    const addIdea = Obj => {
        return fetch("http://localhost:8088/ideas", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(Obj)
        })
        .then(getIdeas)
    }

    const getIdeaById = (id)=> {
        return fetch(`http://localhost:8088/ideas/${id}?_expand=user`)
            .then(res => res.json())
    }

    const deleteIdea = Id => {
        return fetch(`http://localhost:8088/ideas/${Id}`, {
            method: "DELETE"
        })
            .then(getIdeas)
    }

    const updateIdea = idea => {
        return fetch(`http://localhost:8088/ideas/${idea.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(idea)
        })
            .then(getIdeas)
    }

    
    

    /*
        You return a context provider which has the
        `locations` state, the `addLocation` function,
        and the `getLocation` function as keys. This
        allows any child elements to access them.
    */
    return (
        <IdeaContext.Provider value={{
            ideas, searchTerms, getIdeas, addIdea, getIdeaById, deleteIdea, updateIdea, setSearchTerms
        }}>
            {props.children}
        </IdeaContext.Provider>
    )
}