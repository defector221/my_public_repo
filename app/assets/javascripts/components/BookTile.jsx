import React, { Component } from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button';
import { withRouter } from "react-router-dom";

class BookTile extends Component {
    constructor(props){
        super(props);
        this.openBook = this.openBook.bind(this);
        this.deleteBook = this.deleteBook.bind(this);
        this.editBook = this.editBook.bind(this);
    }

    openBook(){
        var {info} = this.props;
        this.props.history.push(`/books/open/${info.id}`);
    }

    deleteBook(){
        var {info} = this.props;
        this.props.deleteBook(info.id);
    }

    editBook(){
        var {info} = this.props;
        this.props.history.push(`/books/edit/${info.id}`);
    }

    renderButtons(){
        return (
            <React.Fragment>
                <Button variant="danger" onClick={this.deleteBook}>Delete</Button>
                <Button variant="secondary" onClick={this.editBook}>Edit</Button>
                <Button variant="primary" onClick={this.openBook}>Go Inside</Button>
            </React.Fragment>
        );
    }
    render() {
        var {info} = this.props;
        return (
            <div id={info.id} className="tile">
                <Card style={{ width: '22rem' }}>
                    <Card.Img variant="top" src="/images/book.jpg" />
                      <Card.Body>
                        {info.bookType.toLowerCase() != "paperback" ? <span className="badge badge-success">{info.bookType}</span> : <span className="badge badge-info">{info.bookType}</span> }
                        <Card.Title>{info.name}</Card.Title>
                        <Card.Subtitle >By {info.author}</Card.Subtitle>
                        <Card.Text>
                             {info.description}
                        </Card.Text>
                            {this.renderButtons()}
                    </Card.Body>
                </Card>          
            </div>
        )
    }
}


export default withRouter(BookTile);
