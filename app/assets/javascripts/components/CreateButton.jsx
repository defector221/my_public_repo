import React, { Component } from 'react'
import {Link} from "react-router-dom";
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button';

export default class CreateLobbyButton extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <div className="tile">
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src="/images/create_book.gif" />
                      <Card.Body>
                        <Card.Text>
                            Create, Configure New Book    
                        </Card.Text>
                        <Link to={`/books/create/new`}>
                          <Button variant="primary">Add New Book</Button>
                        </Link>
                    </Card.Body>
                </Card>          
            </div>
        )
    }
}