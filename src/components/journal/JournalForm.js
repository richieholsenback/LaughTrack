import React, { useContext, useEffect, useState } from "react"
import { JournalContext } from "../journal/JournalProvider"
import "./Journal.css"
import { useHistory, useParams } from 'react-router-dom';
import { Button, Form, Input, Label } from "semantic-ui-react";

export const JournalForm = (props) => {
    const { addJournal, getJournalById, updateJournal } = useContext(JournalContext)

    const [journal, setJournal] = useState({})
    const [isLoading, setIsLoading] = useState(true);

    const { journalId } = useParams();
    const history = useHistory();

    const handleControlledInputChange = (event) => {
        const newJournal = { ...journal }
        newJournal[event.target.name] = event.target.value
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
            })
                .then(() => history.push("journals"))
        }
    }




    return (
        <form className="journalForm">
            <h2 className="journalForm__title">New Journal</h2>
            <Form.Field>
                <div className="form-group">
                    <Label htmlFor="concept">Journal Concept: </Label>
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
                    <Form.Field control='select' name="userApproval">
                        <option>I bombed</option>
                        <option>It was terrible</option>
                        <option>It was dead silent</option>
                        <option>Pity laughter</option>
                        <option>It was fine, needs improvement</option>
                        <option>I feel alright about it</option>
                        <option>I liked it</option>
                        <option>I loved it</option>
                        <option>Big laughs</option>
                        <option>It crushed!</option>
                    </Form.Field>
                </div>
            </Form.Field>
            <Form.Field>
                <div className="form-group">
                    <Label htmlFor="journalCrowdApproval">How did the crowd respond to it? </Label>
                    <Form.Field control='select' name="crowdApproval">
                        <option>They might as well have booed</option>
                        <option>They didn't like it</option>
                        <option>They were so silent</option>
                        <option>They were nonplussed</option>
                        <option>They laughed so little</option>
                        <option>They were fine with it</option>
                        <option>Decent laughs</option>
                        <option>Good laughter</option>
                        <option>They were howling</option>
                        <option>They loved it more than anything</option>
                    </Form.Field>
                </div>
            </Form.Field>
            {/* <Form.Group grouped>
                <Label>Keep it to yourself?</Label>
                <Form.Field
                    label="true"
                    control='input'
                    type='radio'
                    name='public'
                />
                <Form.Field
                    label="false"
                    control='input'
                    type='radio'
                    name='public'
                />
            </Form.Group> */}
            <Button type="submit"
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