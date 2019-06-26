/**
 * @providesModule PrintPortal
 * @flow
 */

import * as React from 'react'
import ReactDOM from 'react-dom'

import { withRouter } from 'react-router-dom'

import type { ContextRouter } from 'react-router-dom'

class PrintPortal extends React.Component<{
  ...ContextRouter,
  children: React.Element<*>
}> {
  componentDidMount() {
    let x = document.createElement('iframe')
    x.style.visibility = 'hidden'
    x.style.position = 'fixed'
    x.style.right = '0'
    x.style.bottom = '0'
    x.style.width = '918px'
    x.style.height = '1188px'
    document.body && document.body.appendChild(x)

    let idoc = x.contentDocument
    idoc.body && (idoc.body.style.margin = '0')
    idoc.body && (idoc.body.style.backgroundColor = '#F5F8FA')

    let blueprintLink = idoc.createElement('link')
    blueprintLink.rel = 'stylesheet'
    blueprintLink.type = 'text/css'
    blueprintLink.href = '/blueprint.css'
    idoc.head && idoc.head.appendChild(blueprintLink)

    let printStylesheetLink = idoc.createElement('link')
    printStylesheetLink.rel = 'stylesheet'
    printStylesheetLink.type = 'text/css'
    printStylesheetLink.media = 'print'
    printStylesheetLink.href = '/print.css'
    idoc.head && idoc.head.appendChild(printStylesheetLink)

    let div = idoc.createElement('div')
    idoc.body && idoc.body.appendChild(div)

    blueprintLink.onload = () => {
      ReactDOM.render(this.props.children, div, () => {
        setTimeout(() => {
          x.contentWindow.print()
          document.body && document.body.removeChild(x)

          const { location, history } = this.props
          const index = location.pathname.lastIndexOf('/print')
          if (index >= 0) history.replace(location.pathname.substring(0, index))
        }, 100)
      })
    }
  }

  render() {
    return null
  }
}

export default withRouter(PrintPortal)
