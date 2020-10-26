import React, { useState, createContext } from "react"

// The context is imported and used by individual components that need data

export const JournalIdeaContext = createContext()

// This component establishes what data can be used.
export const JournalIdeaProvider = (props) => {

    const [journalIdeas, setJournalIdeas] = useState([])

    const getJournalIdeas = () => {
        return fetch("http://localhost:8088/journalIdeas?_expand=user")
        .then(res => res.json())
        .then(setJournalIdeas)
    }

    const addJournalIdea = journalObj => {
        return fetch("http://localhost:8088/journalIdeas", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(journalObj)
        })
        .then(getJournalIdeas)
    }

    const getJournalIdeaById = (id)=> {
        return fetch(`http://localhost:8088/journalIdeas/${id}?_expand=user`)
            .then(res => res.json())
    }

    const deleteJournalIdea = journalId => {
        return fetch(`http://localhost:8088/journalIdeas/${journalId}`, {
            method: "DELETE"
        })
            .then(getJournalIdeas)
    }

    const updateJournalIdea = journal => {
        return fetch(`http://localhost:8088/journalIdeas/${journal.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(journal)
        })
            .then(getJournalIdeas)
    }

    
    

    /*
        You return a context provider which has the
        `locations` state, the `addLocation` function,
        and the `getLocation` function as keys. This
        allows any child elements to access them.
    */
    return (
        <JournalIdeaContext.Provider value={{
            journalIdeas, getJournalIdeas, addJournalIdea, getJournalIdeaById, deleteJournalIdea, updateJournalIdea
        }}>
            {props.children}
        </JournalIdeaContext.Provider>
    )
}