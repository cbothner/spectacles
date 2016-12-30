import React, { Component } from 'react'

import { createStore } from 'redux'
import { Provider } from 'react-redux'

import Router from 'react-router/HashRouter'

import Spectacles from './components/spectacles.js'

import "@blueprintjs/core/dist/blueprint.css"
import './App.css'

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
      spectrophotometerData: [
        {wavelength: 190 , od:  6.3223  , percentT: 0.00005},
        {wavelength: 200 , od:  6.82858 , percentT:  0.00001},
        {wavelength: 210 , od:  6.64589 , percentT:  0.00002},
        {wavelength: 220 , od:  6.24215 , percentT:  0.00006},
        {wavelength: 230 , od:  6.49441 , percentT:  0.00003},
        {wavelength: 240 , od:  6.19341 , percentT:  0.00006},
        {wavelength: 250 , od:  6.5011  , percentT: 0.00003},
        {wavelength: 260 , od:  6.30472 , percentT:  0.00005},
        {wavelength: 270 , od:  6.32239 , percentT:  0.00005},
        {wavelength: 280 , od:  6.33925 , percentT:  0.00005},
        {wavelength: 290 , od:  6.27161 , percentT:  0.00005},
        {wavelength: 300 , od:  6.28554 , percentT:  0.00005},
        {wavelength: 310 , od:  6.70537 , percentT:  0.00002},
        {wavelength: 320 , od:  6.39517 , percentT:  0.00004},
        {wavelength: 330 , od:  6.19605 , percentT:  0.00006},
        {wavelength: 340 , od:  6.23221 , percentT:  0.00006},
        {wavelength: 350 , od:  6.02641 , percentT:  0.00009},
        {wavelength: 360 , od:  6.32251 , percentT:  0.00005},
        {wavelength: 370 , od:  6.09234 , percentT:  0.00008},
        {wavelength: 380 , od:  6.06446 , percentT:  0.00009},
        {wavelength: 390 , od:  6.01974 , percentT:  0.0001},
        {wavelength: 400 , od:  5.91462 , percentT:  0.00012},
        {wavelength: 410 , od:  5.75362 , percentT:  0.00018},
        {wavelength: 420 , od:  5.7146  , percentT: 0.00019},
        {wavelength: 430 , od:  5.66654 , percentT:  0.00022},
        {wavelength: 440 , od:  3.14795 , percentT:  0.07113},
        {wavelength: 450 , od:  1.14334 , percentT:  7.18886},
        {wavelength: 460 , od:  0.86303 , percentT:  13.70787},
        {wavelength: 470 , od:  0.66369 , percentT:  21.69252},
        {wavelength: 480 , od:  0.5202  , percentT: 30.18561},
        {wavelength: 490 , od:  0.49876 , percentT:  31.7132},
        {wavelength: 500 , od:  0.42071 , percentT:  37.95684},
        {wavelength: 510 , od:  0.70582 , percentT:  19.68702},
        {wavelength: 520 , od:  2.05502 , percentT:  0.88101},
        {wavelength: 530 , od:  2.81628 , percentT:  0.15266},
        {wavelength: 540 , od:  1.09264 , percentT:  8.07904},
        {wavelength: 550 , od:  0.39412 , percentT:  40.35339},
        {wavelength: 560 , od:  0.41181 , percentT:  38.74271},
        {wavelength: 570 , od:  0.22486 , percentT:  59.58542},
        {wavelength: 580 , od:  0.08412 , percentT:  82.39104},
        {wavelength: 590 , od:  0.05423 , percentT:  88.26123},
        {wavelength: 600 , od:  0.05025 , percentT:  89.0738},
        {wavelength: 610 , od:  0.05083 , percentT:  88.95493},
        {wavelength: 620 , od:  0.05178 , percentT:  88.76055},
        {wavelength: 630 , od:  0.05248 , percentT:  88.6176},
        {wavelength: 640 , od:  0.04861 , percentT:  89.4108},
        {wavelength: 650 , od:  0.0423  , percentT: 90.71936},
        {wavelength: 660 , od:  0.03797 , percentT:  91.62838},
        {wavelength: 670 , od:  0.03712 , percentT:  91.80789},
        {wavelength: 680 , od:  0.03964 , percentT:  91.27671},
        {wavelength: 690 , od:  0.04398 , percentT:  90.36911},
        {wavelength: 700 , od:  0.04887 , percentT:  89.35729},
        {wavelength: 710 , od:  0.05051 , percentT:  89.02049},
        {wavelength: 720 , od:  0.04794 , percentT:  89.54885},
        {wavelength: 730 , od:  0.043   , percentT:90.57326},
        {wavelength: 740 , od:  0.03786 , percentT:  91.65159},
        {wavelength: 750 , od:  0.0341  , percentT: 92.44853},
        {wavelength: 760 , od:  0.03269 , percentT:  92.74916},
        {wavelength: 770 , od:  0.03463 , percentT:  92.33578},
        {wavelength: 780 , od:  0.0375  , percentT: 91.72759},
        {wavelength: 790 , od:  0.04031 , percentT:  91.13601},
        {wavelength: 800 , od:  0.04375 , percentT:  90.41698},
        {wavelength: 810 , od:  0.04713 , percentT:  89.71602},
        {wavelength: 820 , od:  0.04654 , percentT:  89.83798},
        {wavelength: 830 , od:  0.04592 , percentT:  89.96633},
        {wavelength: 840 , od:  0.04168 , percentT:  90.84897},
        {wavelength: 850 , od:  0.04003 , percentT:  91.19478},
        {wavelength: 860 , od:  0.0359  , percentT: 92.06615},
        {wavelength: 870 , od:  0.0322  , percentT: 92.85387},
        {wavelength: 880 , od:  0.02888 , percentT:  93.56642},
        {wavelength: 890 , od:  0.0306  , percentT: 93.19659},
        {wavelength: 900 , od:  0.03292 , percentT:  92.70006},
        {wavelength: 910 , od:  0.03541 , percentT:  92.17009},
        {wavelength: 920 , od:  0.03518 , percentT:  92.21891},
        {wavelength: 930 , od:  0.0361  , percentT: 92.02377},
        {wavelength: 940 , od:  0.03663 , percentT:  91.91153},
        {wavelength: 950 , od:  0.03733 , percentT:  91.76351},
        {wavelength: 960 , od:  0.03789 , percentT:  91.64526},
        {wavelength: 970 , od:  0.03801 , percentT:  91.61994},
        {wavelength: 980 , od:  0.03783 , percentT:  91.65792},
        {wavelength: 990 , od:  0.03818 , percentT:  91.58408},
        {wavelength: 1000, od:   0.03848, percentT:   91.52084},
        {wavelength: 1010, od:   0.03847, percentT:   91.52295},
        {wavelength: 1020, od:   0.038  , percentT: 91.62205},
        {wavelength: 1030, od:   0.03743, percentT:   91.74238},
        {wavelength: 1040, od:   0.03699, percentT:   91.83537},
        {wavelength: 1050, od:   0.03651, percentT:   91.93693},
        {wavelength: 1060, od:   0.0358 , percentT:  92.08736},
        {wavelength: 1070, od:   0.03529, percentT:   92.19556},
        {wavelength: 1080, od:   0.03419, percentT:   92.42937},
        {wavelength: 1090, od:   0.03407, percentT:   92.45491},
        {wavelength: 1100, od:   0.03505, percentT:   92.24652},
      ],
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
      <Router>
        <Spectacles />
      </Router>
    </Provider>
  }
}

export default App
