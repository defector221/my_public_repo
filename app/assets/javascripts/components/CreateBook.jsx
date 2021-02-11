import {Form, InputGroup, Button} from 'react-bootstrap';
import React, { useState } from "react";
import {connect}  from 'react-redux';
import { withRouter } from "react-router-dom";


function CreateBookForm(props) {
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        setValidated(true);
        if (form.checkValidity() === true) {
            var data = {
                name:form.querySelector('#validationCustom01').value,
                description:form.querySelector('#validationCustom02').value,
                publishedDate:form.querySelector('#validationCustom05').value,
                author:form.querySelector('#validationCustom03').value,
                count:form.querySelector('#validationCustom06').value,
                bookType:form.querySelector('#validationCustom04').value         
            }
            createBook(data);
        }  
    };

    const createBook = (data) => {
        props.addBook(data, function(){
            props.history.push('/home');
        });
    }

    return (
        <React.Fragment>
            <Form noValidate validated={validated} onSubmit={handleSubmit} className="form-container-books">
                <Form.Group controlId="validationCustom01">
                    <Form.Control
                        required
                        type="text"
                        placeholder="Enter Book Name"
                    />
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid Book Name.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="validationCustom02">
                    <Form.Control
                        required
                        type="text"
                        placeholder="Enter Book Description"
                    />
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid Book Description.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="validationCustom03">
                    <Form.Control
                        required
                        type="text"
                        placeholder="Enter Author Name"
                    />
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid Author Name.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="validationCustom04">
                    <Form.Label>Select Book Type</Form.Label>
                    <Form.Control as="select">
                        <option value="paperback">Paperback</option>
                        <option value="original">Original</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="validationCustom05">
                    <Form.Control
                        required
                        type="date"
                        placeholder="Enter Publish Date"
                    />
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid Date.
                    </Form.Control.Feedback>
                </Form.Group>
               
                <Form.Group controlId="validationCustom06">
                    <Form.Control type="number" placeholder="No. of Copies" required />
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid input.
                    </Form.Control.Feedback>
                </Form.Group>    
                <Form.Group>
                    <Form.Check
                    required
                    label="Agree to terms and conditions"
                    feedback="You must agree before submitting."
                    />
                </Form.Group>
                <Button type="submit">Proceed</Button>
            </Form>
        </React.Fragment>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        addBook: (data, callback) => {
            addBookToServer(data, function(response){
                dispatch({type:'ADD_BOOK', data : {... data, id:response.bookID}});
                callback();
            })
        }
    }

    function addBookToServer(data, success){
        $.ajax({
            url: '/api/v1/books/add_new',
            method: 'POST',
            data: data,
            success: success,
            error: function(error){
                alert('Internal Server Error , Please try Again');
            }
        })
    }
}


export default connect(null, mapDispatchToProps)(withRouter(CreateBookForm))