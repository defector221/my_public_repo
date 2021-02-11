import React, { Component } from 'react'
import Loader from "./Loader";
import BookTile from "./BookTile";
import SearchBar from "./SearchBar";
import CreateBookButton from "./CreateButton";
import {connect}  from 'react-redux';

class Home extends Component {
    constructor(props){
        super(props);
        this.searchByName = this.searchByName.bind(this);
        this.state = {
            searchKey : ""
        }
    }

    searchByName(searchKey) {
        this.setState({
            searchKey
        })
    }

    filterAndRenderLobbies(){
        var books = this.props.books;
        var {searchKey} = (this.state);
        var self = this;
        var list =  books.filter(function(book){
            return searchKey.length >=1 ? book.name.indexOf(searchKey) != -1 : true;
        }).map((book, i) => {
           return (<BookTile info={book} key={book.id} deleteBook = {this.props.deleteBook} />)
        });

        return list.length >= 1 ? list : "";
    }

    render() {
        return (
            <React.Fragment>
                <div className="books-container-flex">
                    <img src="/images/banner.jpg" />
                </div>
                <div>
                    {this.props.isLoading ? <Loader /> : (
                        (<React.Fragment>
                            <div className="controls">
                                <SearchBar keyword={this.state.searchKey} setKeyword={this.searchByName}/>
                            </div>
                            <div>
                                <CreateBookButton />
                                {this.filterAndRenderLobbies()}
                            </div>
                        </React.Fragment>
                        )
                    )}
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        books: state.books,
        isLoading: state.isLoading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteBook: (id) => {
            deleteBookToServer(id, function(){
                dispatch({type:'DELETE_BOOK', id});
            })
        }
    }

    function deleteBookToServer(id, success){
        $.ajax({
            url: `/api/v1/books/${id}`,
            method: 'DELETE',
            success: success,
            error: function(error){
                alert('Internal Server Error , Please try Again');
            }
        })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);


