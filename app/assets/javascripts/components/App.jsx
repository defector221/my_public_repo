import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import Home from "./Home";
import Book from "./Book";
import CreateBook from "./CreateBook";
import UpdateBook from "./UpdateBook";
import ErrorBoundary from "./ErrorBoundary";
import { BrowserRouter as Router, Route } from "react-router-dom";
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import rootReducer  from '../reducers/rootReducer';

const store = createStore(rootReducer);


const Header = styled.img`
    position: relative;
    width: 200px;
    margin: 8px;
    margin-left: 40px;
    float: left;
    max-height: 45px;
`;

function App(props) {
  return (
    <Router>
      <div className="App">
        <div className="books-container">
          <ErrorBoundary>
            <div className="books-container-header">
              <a href="/home">
                <Header src="/images/logo.png"></Header>
              </a>
            </div>
            <div className="books-container-body">
              <Route exact={true} path={'/'}>
                <Home />
              </Route>
              <Route exact={true} path={'/home'}>
                <Home />
              </Route>
              <Route exact={true} path={'/books/open/:id'} render={({ match }) => ( 
                  <React.Fragment>
                  <div className='form-container row justify-content-md-center'>
                    <Book id={match.params.id} />
                  </div>
                </React.Fragment>
              )}>
              </Route>
              <Route exact={true} path={'/books/edit/:id'} render={({ match }) => ( 
                  <React.Fragment>
                    <div className='form-container row justify-content-md-center'>
                      <UpdateBook id={match.params.id} />
                    </div>
                  </React.Fragment>
              )}>
              </Route>
              <Route exact={true} path={'/books/create/new'}>
                <div className='form-container row justify-content-md-center'>
                    <CreateBook />
                </div>
              </Route>
            </div>
          </ErrorBoundary>
        </div>
      </div>
    </Router>
  );
}

const getBook = () => {
  return fetch('/api/v1/books/all')
    .then(response => response.json())
    .then(json => store.dispatch(resolvedGetBook(json)))
}

const resolvedGetBook = (json) => {
  return {
    type: 'RESOLVED_BOOK',
    books: json.books
  }
}

getBook();
const rootElement = document.getElementById("root");
ReactDOM.render(<Provider store={store}><App /></Provider>, rootElement);
