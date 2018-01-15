/**
 * @providesModule App
 * @flow
 */

import React, { Component } from 'react'

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import { HashRouter as Router, Switch, Route } from 'react-router-dom'

import '@blueprintjs/core/dist/blueprint.css'
import '@blueprintjs/labs/dist/blueprint-labs.css'
import './App.css'

import { FocusStyleManager } from '@blueprintjs/core'

import reducer from 'redux/reducers'

import Spectacles from 'components/Spectacles'
import Embed from 'components/Embed'

FocusStyleManager.onlyShowFocusOnTabs()

const store = createStore(reducer, applyMiddleware(thunk))

class App extends Component<{}> {
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
