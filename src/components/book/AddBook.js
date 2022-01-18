import React from "react";
import { Button, ButtonToolbar, Drawer, Dropdown, Form } from "rsuite";
import { createBook, getAuthors } from "../../ApiCalls";
import '../../App.css'


export const AddBook = (props) => {
    const [selectedAuthor, setSelectedAuthor] = React.useState({
        _id: '',
        firstName: 'Select',
        lastName: 'Author',
    })

    const [authors, setAuthors] = React.useState([
        {
            _id: '',
            firstName: '',
            lastName: '',
        }
    ])

    const [formValue, setformValue] = React.useState({
        name: '',
        isbn: '',
        authorId: '',
    });

    // Drawer state
    const [isDrawerOpen, setIsDrawerOpen] = React.useState(false)

    const closeDrawer = () => {
        setIsDrawerOpen(false);
    }

    const openDrawerAndGetAuthors = async () => {
        const RES = await getAuthors()
        setAuthors(RES)
        setformValue({
            name: '',
            isbn: '',
            authorId: '',
        })
        setSelectedAuthor({
            _id: '',
            firstName: 'Select',
            lastName: 'Author',
        })
        setIsDrawerOpen(true);
    }

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
        await createBook({ ...formValue })
        props.setReload(!props.reload)
    }

    const handleSelectAuthor = (eventKey) => {
        for (let author of authors) {
            if (author._id == eventKey) {
                setSelectedAuthor(author)
                formValue.authorId = eventKey
            }
        }
    }

    return (
        <div>
            <button class="add-btn" onClick={openDrawerAndGetAuthors}>Add Book</button>

            <Drawer
                open={isDrawerOpen}
                onClose={closeDrawer}
            >
                <Drawer.Header>
                    <Drawer.Title>Add Book</Drawer.Title>
                </Drawer.Header>
                <Drawer.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="name">
                            <Form.ControlLabel>Name</Form.ControlLabel>
                            <Form.Control name="name" id='book-name' onChange={setBookName} />
                            <Form.HelpText tooltip>Name is required</Form.HelpText>
                        </Form.Group>
                        <Form.Group controlId="isbn">
                            <Form.ControlLabel>ISBN</Form.ControlLabel>
                            <Form.Control name="isbn" id='book-isbn' onChange={setBookIsbn} />
                            <Form.HelpText tooltip>ISBN is required</Form.HelpText>
                        </Form.Group>

                        <Dropdown onSelect = {handleSelectAuthor} title={`${selectedAuthor.firstName} ${selectedAuthor.lastName}`}>
                            {
                                authors.map(author => {
                                    return <div>
                                        <Dropdown.Item eventKey={author._id}>{`${author.firstName} ${author.lastName}`}</Dropdown.Item>
                                    </div>
                                })
                            }
                        </Dropdown>

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