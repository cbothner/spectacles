import React, { Component } from 'react'

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import { BrowserRouter as Router, Route } from 'react-router-dom'

import "@blueprintjs/core/dist/blueprint.css"
import './App.css'

import { FocusStyleManager  } from "@blueprintjs/core";
FocusStyleManager.onlyShowFocusOnTabs();

import reducer from './reducers.js'
import { getFilters, getSchedules } from './actions.js'

import Spectacles from './components/spectacles.js'

const store = createStore( reducer, applyMiddleware(thunk) )

store.dispatch(getFilters())
store.dispatch(getSchedules())

class App extends Component {
  render() {
    return <Provider store={store}>
      <Router>
        <Route path="/" component={Spectacles} />
      </Router>
    </Provider>
  }
}

export default App
