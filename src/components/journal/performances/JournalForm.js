import React, { useContext, useEffect, useState } from "react"
import { JournalContext } from "./JournalProvider"
import "./Journal.css"
import { useHistory, useParams } from 'react-router-dom';
import { Button, Checkbox, Dropdown, Form, Input, TextArea } from "semantic-ui-react";

export const JournalForm = (props) => {
    const { addJournal, getJournalById, updateJournal } = useContext(JournalContext)

    const [journal, setJournal] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    const { journalId } = useParams();
    const history = useHistory();

    const handleControlledInputChange = (event) => {
        const newJournal = { ...journal }
        if (event.target.name === "hidden") {
            newJournal[event.target.name] = newJournal.hidden ? false : true
        } else {
            newJournal[event.target.name] = event.target.value
        }
        setJournal(newJournal)
    }

    useEffect(() => {
        if (journalId) {
            getJournalById(journalId)
                .then(journal => {
                    setJournal(journal)
                    setIsLoading(false)
                })
        } else {
            setIsLoading(false)
        }
    }, [])

    const constructJournalObject = () => {
        const userId = parseInt(localStorage.getItem("active_user"))
        setIsLoading(false);
        if (journalId) {
            updateJournal({
                id: journal.id,
                userId: userId,
                concept: journal.concept,
                userApproval: journal.userApproval,
                crowdApproval: journal.crowdApproval,
                date: journal.date,
                url: journal.url,
                userNotes: journal.userNotes,
                hidden: journal.hidden
            })
                .then(() => history.push(`/journals/detail/${journal.id}`))
        } else {
            addJournal({
                concept: journal.concept,
                userId: userId,
                userApproval: journal.userApproval,
                crowdApproval: journal.crowdApproval,
                date: journal.date,
                url: journal.url,
                userNotes: journal.userNotes,
                hidden: journal.hidden
            })
                .then(() => history.push("journals"))
        }
    }

    const userFeel = [
        {
            value: "I bombed",
            text: "I bombed"
        },
        {
            value: "It was terrible",
            text: "It was terrible"
        },
        {
            value: "It was dead silent",
            text: "It was dead silent"
        },
        {
            value: "Pity Laughter",
            text: "Pity Laughter"
        },
        {
            value: "It was fine, needs improvement",
            text: "It was fine, needs improvement"
        },
        {
            value: "I liked it",
            text: "I liked it"
        },
        {
            value: "I loved it",
            text: "I loved it"
        },
        {
            value: "It crushed",
            text: "It crushed"
        },
        {
            value: "Best Moment of my life",
            text: "Best Moment of my life"
        },
    ]

    const DropdownExampleSelection = () => (
        <Dropdown
            placeholder='I felt...'
            fluid
            selection
            options={userFeel}
            name="userApproval"
            onChange={handleControlledInputChange}
        />
    )

    const crowdFeel = [
        {
            value: "They might as well have booed",
            text: "They might as well have booed"
        },
        {
            value: "They didn't like it",
            text: "They didn't like it"
        },
        {
            value: "They were so silent",
            text: "They were so silent"
        },
        {
            value: "They were nonplussed",
            text: "They were nonplussed"
        },
        {
            value: "They laughed so little",
            text: "They laughed so little"
        },
        {
            value: "They were fine with it",
            text: "They were fine with it"
        },
        {
            value: "Decent laughs",
            text: "Decent laughs"
        },
        {
            value: "Good laughter",
            text: "Good laughter"
        },
        {
            value: "They were howling",
            text: "They were howling"
        },
        {
            value: "They loved it more than anything",
            text: "They loved it more than anything"
        },
    ]

    const DropdownExampleSelection2 = () => (
        <Dropdown
            placeholder='They were all...'
            fluid
            selection
            options={crowdFeel}
            name="crowdApproval"
            onChange={handleControlledInputChange}

        />
    )

    return (
        <form className="journalForm">
            <h2 className="journalForm__title">New Journal</h2>
            <Form.Field>
                <div className="form-group">
                    <p htmlFor="concept">Joke Concept: </p>
                    <Input type="text" id="journalConcept" name="concept" required autoFocus
                        placeholder="Journal concept"
                        onChange={handleControlledInputChange}
                        defaultValue={journal.concept} />
                </div>
            </Form.Field>
            <Form.Field inverted>
                <div className="form-group">
                    <p htmlFor="concept">Video of performance: </p>
                    <Input type="text" id="journalURL" name="url" required
                        placeholder="Link here"
                        onChange={handleControlledInputChange}
                        defaultValue={journal.url} />
                </div>
            </Form.Field>
            {/* <Form.Field>
                <div className="form-group">
                    <p htmlFor="entryType">Entry Type: </p>
                    <Form.Field control='select' name="entryType">
                        <option value='Performance'>Performance</option>
                        <option value='jokeIdea'>Joke Idea</option>
                    </Form.Field>
                </div>
            </Form.Field> */}
            <Form.Field inverted>
                <div className="form-group">
                    <p htmlFor="date">Date Performed: </p>
                    <Input type="date" name="date"
                        onChange={handleControlledInputChange}
                    ></Input>
                </div>
            </Form.Field>
            <Form.Field>
                <div className="form-group">
                    <p htmlFor="journalUserApproval">How did you feel about it? </p>
                    {DropdownExampleSelection()}
                </div>
            </Form.Field>
            <Form.Field>
                <div className="form-group">
                    <p htmlFor="journalCrowdApproval">How did the crowd respond to it? </p>
                    {DropdownExampleSelection2()}
                </div>
            </Form.Field>
            <Form.Field>
                <div className="form-group">
                    <p htmlFor="userNotes">Notes: </p>
                    <TextArea type="text" id="journalConcept" name="userNotes" required autoFocus
                        placeholder="Notes about the Joke"
                        onChange={handleControlledInputChange}
                        defaultValue={journal.userNotes} />
                </div>
            </Form.Field>
            <Form.Field>
                Keep it to yourself? <Checkbox name="hidden" value={journal.hidden} checked={journal.hidden}
                    onChange={handleControlledInputChange} />
            </Form.Field>
            <Button
                className="btn btn-primary"
                disabled={isLoading}
                onClick={event => {
                    event.preventDefault() // Prevent browser from submitting the form
                    constructJournalObject()
                }}>
                {journalId ? <>Save Journal</> : <>Add Journal</>}</Button>
        </form>
    )
}