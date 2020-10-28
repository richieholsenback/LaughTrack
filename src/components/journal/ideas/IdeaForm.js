import React, { useContext, useEffect, useState } from "react"
// import "./Idea.css"
import { useHistory, useParams } from 'react-router-dom';
import { Button, Form, Input, Label } from "semantic-ui-react";
import { IdeaContext } from "./IdeaProvider";

export const IdeaForm = (props) => {
    const { addIdea, getIdeaById, updateIdea } = useContext(IdeaContext)

    const [idea, setIdea] = useState({})
    const [isLoading, setIsLoading] = useState(true);

    const { ideaId } = useParams();
    const history = useHistory();

    const handleControlledInputChange = (event) => {
        const newIdea = { ...idea }
        newIdea[event.target.name] = event.target.value
        setIdea(newIdea)
    }

    useEffect(() => {
        if (ideaId) {
            getIdeaById(ideaId)
                .then(idea => {
                    setIdea(idea)
                    setIsLoading(false)
                })
        } else {
            setIsLoading(false)
        }
    }, [])

    const constructIdeaObject = () => {
        const userId = parseInt(localStorage.getItem("active_user"))
        setIsLoading(false);
        if (ideaId) {
            updateIdea({
                id: idea.id,
                userId: userId,
                concept: idea.concept,
                date: new Intl.DateTimeFormat('en-US', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit'
                })
                    .format(Date.now()),
                note: idea.note
            })
                .then(() => history.push(`/journals/ideas/detail/${idea.id}`))
        } else {
            addIdea({
                concept: idea.concept,
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
                note: idea.note
            })
                .then(() => history.push("/journals/ideas"))
        }
    }




    return (
        <form className="ideaForm">
            <h2 className="ideaForm__title">New Idea</h2>
            <Form.Field>
                <div className="form-group">
                    <Label htmlFor="concept">Joke Concept: </Label>
                    <input type="text" id="ideaConcept" name="concept" required autoFocus className="form-control"
                        placeholder="Joke concept"
                        onChange={handleControlledInputChange}
                        defaultValue={idea.concept} />
                </div>
            </Form.Field>
            <Form.Field>
                <div className="form-group">
                    <Label htmlFor="note">Notes: </Label>
                    <textarea type="text" id="ideaNote" name="note" required autoFocus className="form-control"
                        placeholder="Notes about the Joke"
                        onChange={handleControlledInputChange}
                        defaultValue={idea.note} />
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
                    constructIdeaObject()
                }}>
                {ideaId ? <>Save Idea</> : <>Submit</>}</Button>
        </form>
    )
}