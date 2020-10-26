import React, { useContext, useEffect, useState } from "react"
// import "./JournalIdea.css"
import { useHistory, useParams } from 'react-router-dom';
import { Button, Form, Input, Label } from "semantic-ui-react";
import { JournalIdeaContext } from "./JournalIdeaProvider";

export const JournalIdeaForm = (props) => {
    const { addJournalIdea, getJournalIdeaById, updateJournalIdea } = useContext(JournalIdeaContext)

    const [journalIdea, setJournalIdea] = useState({})
    const [isLoading, setIsLoading] = useState(true);

    const { journalIdeaId } = useParams();
    const history = useHistory();

    const handleControlledInputChange = (event) => {
        const newJournalIdea = { ...journalIdea }
        newJournalIdea[event.target.name] = event.target.value
        setJournalIdea(newJournalIdea)
    }

    useEffect(() => {
        if (journalIdeaId) {
            getJournalIdeaById(journalIdeaId)
                .then(journalIdea => {
                    setJournalIdea(journalIdea)
                    setIsLoading(false)
                })
        } else {
            setIsLoading(false)
        }
    }, [])

    const constructJournalIdeaObject = () => {
        const userId = parseInt(localStorage.getItem("active_user"))
        setIsLoading(false);
        if (journalIdeaId) {
            updateJournalIdea({
                id: journalIdea.id,
                userId: userId,
                concept: journalIdea.concept,
                date: new Intl.DateTimeFormat('en-US', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit'
                })
                    .format(Date.now()),
                note: journalIdea.note
            })
                .then(() => history.push(`/journals/ideas/detail/${journalIdea.id}`))
        } else {
            addJournalIdea({
                concept: journalIdea.concept,
                userId: userId,
                date: new Intl.DateTimeFormat('en-US', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit'
                })
                    .format(Date.now()),
                note: journalIdea.note
            })
                .then(() => history.push("/journals/ideas"))
        }
    }




    return (
        <form className="journalIdeaForm">
            <h2 className="journalIdeaForm__title">New JournalIdea</h2>
            <Form.Field>
                <div className="form-group">
                    <Label htmlFor="concept">Joke Concept: </Label>
                    <input type="text" id="journalIdeaConcept" name="concept" required autoFocus className="form-control"
                        placeholder="Joke concept"
                        onChange={handleControlledInputChange}
                        defaultValue={journalIdea.concept} />
                </div>
            </Form.Field>
            <Form.Field>
                <div className="form-group">
                    <Label htmlFor="note">Notes: </Label>
                    <textarea type="text" id="journalIdeaNote" name="note" required autoFocus className="form-control"
                        placeholder="Notes about the Joke"
                        onChange={handleControlledInputChange}
                        defaultValue={journalIdea.note} />
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
                    constructJournalIdeaObject()
                }}>
                {journalIdeaId ? <>Save JournalIdea</> : <>Submit</>}</Button>
        </form>
    )
}