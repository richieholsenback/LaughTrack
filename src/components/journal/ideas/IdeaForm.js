import React, { useContext, useEffect, useState } from "react"
// import "./Idea.css"
import { useHistory, useParams } from 'react-router-dom';
import { Button, Checkbox, Form, Input, TextArea } from "semantic-ui-react";
import { IdeaContext } from "./IdeaProvider";

export const IdeaForm = (props) => {
    const { addIdea, getIdeaById, updateIdea } = useContext(IdeaContext)

    const [idea, setIdea] = useState({})
    const [isLoading, setIsLoading] = useState(true);

    const { ideaId } = useParams();
    const history = useHistory();

    const handleControlledInputChange = (event) => {
        const newIdea = { ...idea }
        if (event.target.name === "hidden") {
            newIdea[event.target.name] = newIdea.hidden ? false : true
        } else {
            newIdea[event.target.name] = event.target.value
        }
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
        const userId = parseInt(sessionStorage.getItem("active_user"))
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
                note: idea.note,
                hidden: idea.hidden
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
                note: idea.note,
                hidden: idea.hidden
            })
                .then(() => history.push("/journals/ideas"))
        }
    }


    return (
        <form className="ideaForm">
            <h2 className="ideaForm__title">New Idea</h2>
            <Form.Field>
                <p htmlFor="concept">Joke Concept: </p>
                <Input 
                type="text" 
                id="ideaConcept" 
                name="concept" 
                required 
                autoFocus
                placeholder="Joke concept"
                onChange={handleControlledInputChange}
                defaultValue={idea.concept} />
            </Form.Field>
            <Form.Field>
                <p htmlFor="note">Notes: </p>
                <TextArea type="text" id="ideaNote" name="note" required className="form-control"
                    placeholder="Notes about the Joke"
                    style={{ minHeight: 100 }}
                    onChange={handleControlledInputChange}
                    defaultValue={idea.note} />
            </Form.Field>
            <Form.Field>
                Keep it to yourself? <Checkbox name="hidden" value={idea.hidden} checked={idea.hidden}
                    onChange={handleControlledInputChange} />
            </Form.Field>
            <br></br>
            <Button
                className="btn btn-primary"
                disabled={isLoading}
                onClick={event => {
                    event.preventDefault() // Prevent browser from submitting the form
                    constructIdeaObject()
                }}>
                {ideaId ? <>Save Idea</> : <>Add Idea</>}</Button>
        </form>
    )
}