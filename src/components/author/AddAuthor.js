import React from "react";
import { Button, ButtonToolbar, Drawer, Form } from "rsuite";
import { createAuthor, createBook } from "../../ApiCalls";
import '../../App.css'


export const AddAuthor = (props) => {
    const [formValue, setformValue] = React.useState({
        firstName: '',
        lastName: ''
    });

    // Drawer state
    const [isDrawerOpen, setIsDrawerOpen] = React.useState(false)

    const closeDrawer = () => {
        setIsDrawerOpen(false)
    }

    const openDrawer = () => {
        setformValue({
            firstName: '',
            lastName: ''
        })
        setIsDrawerOpen(true)
    }

    const setFirstName = (event) => {
        formValue.firstName = event
    }

    const setLastName = (event) => {
        formValue.lastName = event
    }

    const handleSubmit = async () => {
        await createAuthor({ ...formValue })
        props.setReload(!props.reload)
    }

    return (
        <div>
            <button class="add-btn" onClick={openDrawer}>Add Author</button>

            <Drawer
                open={isDrawerOpen}
                onClose={closeDrawer}
            >
                <Drawer.Header>
                    <Drawer.Title>Add Author</Drawer.Title>
                </Drawer.Header>
                <Drawer.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="authorFN">
                            <Form.ControlLabel>Author First Name</Form.ControlLabel>
                            <Form.Control name="authorFN" onChange={setFirstName} />
                            <Form.HelpText tooltip>Author First Name is required</Form.HelpText>
                        </Form.Group>
                        <Form.Group controlId="authorLN">
                            <Form.ControlLabel>Author Last Name</Form.ControlLabel>
                            <Form.Control name="authorLN" onChange={setLastName} />
                            <Form.HelpText tooltip>Author Last Name is required</Form.HelpText>
                        </Form.Group>

                        <div class="drawer-action">
                            <Form.Group>
                                <ButtonToolbar>
                                    <Button onClick={closeDrawer} appearance="primary" type='submit'>Submit</Button>
                                    <Button onClick={closeDrawer} appearance="subtle">Cancel</Button>
                                </ButtonToolbar>
                            </Form.Group>
                        </div>

                    </Form>
                </Drawer.Body>
            </Drawer>
        </div>
    )
}