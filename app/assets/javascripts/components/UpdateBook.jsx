import {Form, InputGroup, Button} from 'react-bootstrap';
import React, { useState, useEffect } from "react";
import Loader from "./Loader";
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
            updateBook(data);
        }  
    };

    
    const updateBook = (data) => {
        props.updateBook({
            id:props.id,
            bookData:data
        }, function(){
            props.history.push('/home');
        })
    }

    const generateDate = (dateStr) => {
        var publishDate = new Date(dateStr);
        return `${publishDate.getFullYear()}-${publishDate.getMonth()+1}-${publishDate.getDate()}`
    }

    const renderForm = () => { 
        let book = props.bookDetails;
        return (
        <React.Fragment>
            <Form noValidate validated={validated} onSubmit={handleSubmit} className="form-container-books">
                <Form.Group controlId="validationCustom01">
                    <Form.Control
                        required
                        type="text"
                        defaultValue={book.name}
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
                        defaultValue={book.description}
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
                        defaultValue={book.author}
                        placeholder="Enter Author Name"
                    />
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid Author Name.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="validationCustom04">
                    <Form.Label>Select Book Type</Form.Label>
                    <Form.Control as="select" defaultValue={book.bookType}>
                        <option value="paperback">Paperback</option>
                        <option value="original">Original</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="validationCustom05">
                    <Form.Control
                        required
                        type="date"
                        defaultValue={generateDate(book.publishedDate)}
                        placeholder="Enter Publish Date"
                    />
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid Date.
                    </Form.Control.Feedback>
                </Form.Group>
            
                <Form.Group controlId="validationCustom06">
                    <Form.Control type="number" placeholder="No. of Copies" defaultValue={book.count} required />
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
        )
    }

    return (       
        <React.Fragment>
            { props.isLoading ?  <Loader /> : renderForm()}
        </React.Fragment>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateBook: (data, callback) => {
            updateBookToServer(data, function(response){
                dispatch({type:'UPDATE_BOOK', data : data});
                callback();
            })
        }
    }

    function updateBookToServer(data, success){
        $.ajax({
            url: `/api/v1/books/update/${data.id}`,
            method: 'POST',
            data: data.bookData,
            success: success,
            error: function(error){
                alert('Internal Server Error , Please try Again');
            }
        })
    }
}

const mapStateToProps = (state, ownProps) =>{
    let id = ownProps.id
    return {
        bookDetails : state.books.find(book => book.id == id),
        isLoading: state.isLoading
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CreateBookForm))