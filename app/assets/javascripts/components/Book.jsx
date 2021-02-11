import React, { Component, useState } from 'react';
import Loader from "./Loader";
import {Card} from 'react-bootstrap';
import {connect}  from 'react-redux';
import { withRouter } from "react-router-dom";

class Book extends Component {
    constructor(props){
        super(props);
        this.renderBook = this.renderBook.bind(this);
    }

    renderBook(){
        var {bookDetails} = this.props;
        return(
            <React.Fragment>
                <div id={bookDetails.id} className="row books_view">
                    <Card>
                        <Card.Img variant="top" src="/images/book.jpg" />
                        <Card.Body>
                            <Card.Title>{bookDetails.name}</Card.Title>
                            <Card.Text>
                            {bookDetails.description}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
            </React.Fragment>
        )

    }
    
    render() {
        return (
            <React.Fragment>
                { this.props.isLoading ?  <Loader /> : this.renderBook()}
            </React.Fragment>
        )
        
    }
}

const mapStateToProps = (state, ownProps) =>{
    let id = ownProps.id
    return {
        bookDetails : state.books.find(book => book.id == id),
        isLoading: state.isLoading
    }
}

export default connect(mapStateToProps)(withRouter(Book));