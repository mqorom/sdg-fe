import { Drawer, Button, Input, Form, ButtonToolbar } from 'rsuite'
import 'rsuite/dist/rsuite.min.css'
import '../../App.css'
import React from 'react'
import { editBook, getAutherDetails } from '../../ApiCalls'

export const Book = props => {
    const [formValue, setformValue] = React.useState({
        id: '',
        name: '',
        isbn: '',
    });

    const [authorDetails, setAuthorDetails] = React.useState({
        id: '',
        firstName: '',
        lastName: '',
    })

    const setBookName = (event) => {
        setformValue({
            ...formValue,
            name: event
        });
    }

    const setBookIsbn = (event) => {
        setformValue({
            ...formValue,
            isbn: event
        });
    }

    const handleSubmit = async () => {
        await editBook({ ...formValue })
        props.setReload(!props.reload)
    }

    // Drawer state
    const [isDrawerOpen, setIsDrawerOpen] = React.useState(false)

    const closeDrawer = () => {
        setIsDrawerOpen(false)
    }

    const getAuthorDetailsAndOpenDrawer = async () => {
        const RES = await getAutherDetails(props.book.authorId)
        setAuthorDetails(RES)
        setformValue({
            id: props.book._id,
            name: props.book.name,
            isbn: props.book.isbn,
        })
        setIsDrawerOpen(true)
    }
    return (
        <li>
            <div class='card'>
                <div class='clickable' onClick={getAuthorDetailsAndOpenDrawer}>
                    <p>
                        <strong>{props.book.name}</strong>
                    </p>
                </div>

                <div>
                    <div>
                        <Drawer
                            open={isDrawerOpen}
                            onClose={closeDrawer}
                        >
                            <Drawer.Header>
                                <Drawer.Title>Edit Book</Drawer.Title>
                            </Drawer.Header>
                            <Drawer.Body>
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group controlId="name">
                                        <Form.ControlLabel>Name</Form.ControlLabel>
                                        <Form.Control name="name" id='book-name' defaultValue={props.book.name} onChange={setBookName} />
                                        <Form.HelpText tooltip>Name is required</Form.HelpText>
                                    </Form.Group>
                                    <Form.Group controlId="isbn">
                                        <Form.ControlLabel>ISBN</Form.ControlLabel>
                                        <Form.Control name="isbn" id='book-isbn' defaultValue={props.book.isbn} onChange={setBookIsbn} />
                                        <Form.HelpText tooltip>ISBN is required</Form.HelpText>
                                    </Form.Group>
                                    <Form.Group controlId="authorFN">
                                        <Form.ControlLabel>Author First Name</Form.ControlLabel>
                                        <Form.Control name="authorFN" defaultValue={authorDetails.firstName} disabled={true} />
                                        <Form.HelpText tooltip>Author First Name is required</Form.HelpText>
                                    </Form.Group>
                                    <Form.Group controlId="authorLN">
                                        <Form.ControlLabel>Author Last Name</Form.ControlLabel>
                                        <Form.Control name="authorLN" defaultValue={authorDetails.lastName} disabled={true} />
                                        <Form.HelpText tooltip>Author Last Name is required</Form.HelpText>
                                    </Form.Group>
                                    <Form.Group>
                                        <ButtonToolbar class="drawer-action">
                                            <Button onClick={closeDrawer} appearance="primary" type='submit'>Submit</Button>
                                            <Button onClick={closeDrawer} appearance="subtle">Cancel</Button>
                                        </ButtonToolbar>
                                    </Form.Group>
                                </Form>
                            </Drawer.Body>
                        </Drawer>
                    </div>
                </div>
            </div>
        </li>
    );
};