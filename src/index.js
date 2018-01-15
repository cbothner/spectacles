/**
 * @flow
 */

import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'

const container = document.getElementById('root')
if (container != null) ReactDOM.render(<App />, container)
