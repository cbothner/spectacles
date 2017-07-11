import React, { Component } from 'react'

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import { HashRouter as Router, Switch, Route } from 'react-router-dom'

import '@blueprintjs/core/dist/blueprint.css'
import './App.css'

import { FocusStyleManager } from '@blueprintjs/core'
FocusStyleManager.onlyShowFocusOnTabs()

import reducer from './reducers.js'

import Spectacles from './components/spectacles.js'
import Embed from './components/embed.js'

const store = createStore(reducer, applyMiddleware(thunk))

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <Route path="/embed/:name" component={Embed} />
            <Route path="/" component={Spectacles} />
          </Switch>
        </Router>
      </Provider>
    )
  }
}

export default App
