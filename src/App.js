import React, { Component } from 'react'

import { createStore } from 'redux'
import { Provider } from 'react-redux'

import Spectacles from './components/spectacles.js'

import './App.css'
import "@blueprintjs/core/dist/blueprint.css"

const reducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE_VIEW': return {...state, ui: {...state.ui, activeView: action.view}}
    default: return state
  }
}

const store = createStore( reducer, {
  filtersByName: {
    PBG: {
      name: 'PBG',
      ce: true,
      basePrice: "77.50",
      color: 'orange',
      vlt: 49,
      spectrophotometerData: [],
      ods: [
        {range: '190–400', value: '5+'},
        {range: '445–450', value: '1.5+'},
        {range: '520', value: '2+'},
        {range: '532', value: '2.5+'},
      ],
      lRatings: [
        {range: '0.01W 2*10E-6J 445–450', value: 'RB1'},
        {range: '0.1W 2*10E-5J 520–532', value: 'RB2'},
      ],
    },
  },
  schedulesById: {
    '1': {
      name: "Apple, Inc.",
      suggestions: [
        {filterName: 'PBG', specialPrice: 65 },
      ],
    },
  },
  ui: {
    activeView: "Filters",
  },
})

class App extends Component {
  render() {
    return <Provider store={store} >
      <Spectacles />
    </Provider>
  }
}

export default App
