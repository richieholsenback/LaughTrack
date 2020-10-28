import React, { useContext, useEffect, useState } from "react"
import { JournalContext } from "./JournalProvider"
import "./Journal.css"
import { useHistory, useParams } from 'react-router-dom';
import { Button, Form, Input, Label } from "semantic-ui-react";

export const JournalForm = (props) => {
    const { addJournal, getJournalById, updateJournal } = useContext(JournalContext)

    const [journal, setJournal] = useState({})
    const [isLoading, setIsLoading] = useState(true);
    const [hidden, setHidden] = useState(false)

    const { journalId } = useParams();
    const history = useHistory();

    const handleControlledInputChange = (event) => {
        debugger
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




    return (
        <form className="journalForm">
            <h2 className="journalForm__title">New Journal</h2>
            <Form.Field>
                <div className="form-group">
                    <Label htmlFor="concept">Joke Concept: </Label>
                    <input type="text" id="journalConcept" name="concept" required autoFocus className="form-control"
                        placeholder="Journal concept"
                        onChange={handleControlledInputChange}
                        defaultValue={journal.concept} />
                </div>
            </Form.Field>
            <Form.Field inverted>
                <div className="form-group">
                    <Label htmlFor="concept">Video of performance: </Label>
                    <input type="text" id="journalURL" name="url" required className="form-control"
                        placeholder="Link here"
                        onChange={handleControlledInputChange}
                        defaultValue={journal.url} />
                </div>
            </Form.Field>
            {/* <Form.Field>
                <div className="form-group">
                    <Label htmlFor="entryType">Entry Type: </Label>
                    <Form.Field control='select' name="entryType">
                        <option value='Performance'>Performance</option>
                        <option value='jokeIdea'>Joke Idea</option>
                    </Form.Field>
                </div>
            </Form.Field> */}
            <fieldset inverted>
                <div className="form-group">
                    <Label htmlFor="date">Date Performed: </Label>
                    <input type="date" name="date" className="form-control"
                        onChange={handleControlledInputChange}
                    ></input>
                </div>
            </fieldset>
            <Form.Field>
                <div className="form-group">
                    <Label htmlFor="journalUserApproval">How did you feel about it? </Label>
                    <Form.Field control='select' name="userApproval" placeholder="Select and option"
                        onChange={handleControlledInputChange}>
                        <option value="I bombed">I bombed</option>
                        <option value="It was terrible">It was terrible</option>
                        <option value="It was dead silent">It was dead silent</option>
                        <option value="Pity laughter">Pity laughter</option>
                        <option value="It was fine, needs improvement">It was fine, needs improvement</option>
                        <option value="I feel alright about it">I feel alright about it</option>
                        <option value="I liked it">I liked it</option>
                        <option value="I loved it">I loved it</option>
                        <option value="Big laughs">Big laughs</option>
                        <option value="It crushed!">It crushed!</option>
                    </Form.Field>
                </div>
            </Form.Field>
            <Form.Field>
                <div className="form-group">
                    <Label htmlFor="journalCrowdApproval">How did the crowd respond to it? </Label>
                    <Form.Field control='select' name="crowdApproval" placeholder="Select and option"
                        onChange={handleControlledInputChange}>
                        <option value="They might as well have booed">They might as well have booed</option>
                        <option value="They didn't like it">They didn't like it</option>
                        <option value="They were so silent">They were so silent</option>
                        <option value="They were nonplussed">They were nonplussed</option>
                        <option value="They laughed so little">They laughed so little</option>
                        <option value="They were fine with it">They were fine with it</option>
                        <option value="Decent laughs">Decent laughs</option>
                        <option value="Good laughter">Good laughter</option>
                        <option value="They were howling">They were howling</option>
                        <option value="They loved it more than anything">They loved it more than anything</option>
                    </Form.Field>
                </div>
            </Form.Field>
            <Form.Field>
                <div className="form-group">
                    <Label htmlFor="userNotes">Notes: </Label>
                    <textarea type="text" id="journalConcept" name="userNotes" required autoFocus className="form-control"
                        placeholder="Notes about the Joke"
                        onChange={handleControlledInputChange}
                        defaultValue={journal.userNotes} />
                </div>
                </Form.Field>
                <Form.Field>
                    Keep it to yourself? <input type="checkbox" name="hidden" value={journal.hidden} checked={journal.hidden}
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