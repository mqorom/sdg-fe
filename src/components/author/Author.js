import { Drawer, Button, Form, ButtonToolbar } from 'rsuite'
import 'rsuite/dist/rsuite.min.css'
import '../../App.css'
import React from 'react'
import { editAuthor } from '../../ApiCalls'

export const Author = props => {
    const [formValue, setformValue] = React.useState({
        id: '',
        firstName: '',
        lastName: '',
    });

    const setFirstName = (event) => {
        formValue.firstName = event
    }

    const setLastName = (event) => {
        formValue.lastName = event
    }

    const handleSubmit = async () => {
        await editAuthor({ ...formValue })
        props.setReload(!props.reload)
    }

    // Drawer state
    const [isDrawerOpen, setIsDrawerOpen] = React.useState(false)

    const closeDrawer = () => {
        setIsDrawerOpen(false)
    }

    const getAutherBooksAndOpenDrawer = async () => {
        setformValue({
            id: props.author._id,
            firstName: props.author.firstName,
            lastName: props.author.lastName,
        })
        setIsDrawerOpen(true)
    }
    return (
        <li>
            <div class='card'>
                <div class='clickable' onClick={getAutherBooksAndOpenDrawer}>
                    <p>
                        <strong>{`${props.author.firstName} ${props.author.lastName}`}</strong>
                    </p>
                </div>

                <div>
                    <div>
                        <Drawer
                            open={isDrawerOpen}
                            onClose={closeDrawer}
                        >
                            <Drawer.Header>
                                <Drawer.Title>Edit Author</Drawer.Title>
                            </Drawer.Header>
                            <Drawer.Body>
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group controlId="authorFN">
                                        <Form.ControlLabel>Author First Name</Form.ControlLabel>
                                        <Form.Control name="authorFN" defaultValue={props.author.firstName} onChange={setFirstName} />
                                        <Form.HelpText tooltip>Author First Name is required</Form.HelpText>
                                    </Form.Group>
                                    <Form.Group controlId="authorLN">
                                        <Form.ControlLabel>Author Last Name</Form.ControlLabel>
                                        <Form.Control name="authorLN" defaultValue={props.author.lastName} onChange={setLastName} />
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
                </div>
            </div>
        </li>
    );
};