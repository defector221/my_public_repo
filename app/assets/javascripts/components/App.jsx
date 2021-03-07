import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { BrowserRouter as Router, Route } from "react-router-dom";
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import rootReducer  from '../reducers/rootReducer';
import OKRTreeView from "./OKR";

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
        <div className="okr-container">
            <div className="books-container-header">
              <a href="/home">
                <Header src="/images/logo.png"></Header>
              </a>
            </div>
            <div className="okr-container-body">
              <Route exact={true} path={'/'}>
                <OKRTreeView />
              </Route>
              <Route exact={true} path={'/home'}>
                <OKRTreeView />
              </Route>
              </div>
        </div>
      </div>
    </Router>
  );
}

const getOKR = () => {
  return fetch('https://okrcentral.github.io/sample-okrs/db.json')
    .then(response => response.json())
    .then(json => store.dispatch(resolvedGetOKR(json)))
}

const resolvedGetOKR = (json) => {
  return {
    type: 'RESOLVED_OKR',
    OKR: json.data
  }
}

getOKR();
const rootElement = document.getElementById("root");
ReactDOM.render(<Provider store={store}><App /></Provider>, rootElement);
