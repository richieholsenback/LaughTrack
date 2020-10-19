import React, { useState, createContext } from "react"

// The context is imported and used by individual components that need data

export const JournalContext = createContext()

// This component establishes what data can be used.
export const JournalProvider = (props) => {
    const [journals, setJournals] = useState([])

    const getJournals = () => {
        return fetch("http://localhost:8088/journals?_expand=user")
        .then(res => res.json())
        .then(setJournals)
    }

    const addJournal = journalObj => {
        return fetch("http://localhost:8088/journals", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(journalObj)
        })
        .then(getJournals)
    }

    const getJournalById = (id)=> {
        return fetch(`http://localhost:8088/journals/${id}?_expand=user`)
            .then(res => res.json())
    }

    const deleteJournal = journalId => {
        return fetch(`http://localhost:8088/journals/${journalId}`, {
            method: "DELETE"
        })
            .then(getJournals)
    }

    const updateJournal = journal => {
        return fetch(`http://localhost:8088/journals/${journal.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(journal)
        })
            .then(getJournals)
    }
    

    /*
        You return a context provider which has the
        `locations` state, the `addLocation` function,
        and the `getLocation` function as keys. This
        allows any child elements to access them.
    */
    return (
        <JournalContext.Provider value={{
            journals, getJournals, addJournal, getJournalById, deleteJournal, updateJournal
        }}>
            {props.children}
        </JournalContext.Provider>
    )
}