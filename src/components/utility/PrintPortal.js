import React from 'react'
import ReactDOM from 'react-dom'

import { withRouter } from 'react-router-dom'

class PrintPortal extends React.Component {
  componentDidMount() {
    var x = document.createElement('iframe')
    x.style.visibility = 'hidden'
    x.style.position = 'fixed'
    x.style.right = '0'
    x.style.bottom = '0'
    x.style.width = '918px'
    x.style.height = '1188px'
    document.body.appendChild(x)

    let idoc = x.contentDocument
    idoc.body.style.margin = '0'
    idoc.body.style.backgroundColor = '#F5F8FA'

    var blueprintLink = idoc.createElement('link')
    blueprintLink.rel = 'stylesheet'
    blueprintLink.type = 'text/css'
    blueprintLink.href = '/blueprint.css'
    idoc.head.appendChild(blueprintLink)

    var printStylesheetLink = idoc.createElement('link')
    printStylesheetLink.rel = 'stylesheet'
    printStylesheetLink.type = 'text/css'
    printStylesheetLink.media = 'print'
    printStylesheetLink.href = '/print.css'
    idoc.head.appendChild(printStylesheetLink)

    var div = idoc.createElement('div')
    idoc.body.appendChild(div)

    blueprintLink.onload = () => {
      ReactDOM.render(this.props.children, div, () => {
        setTimeout(() => {
          x.contentWindow.print()
          document.body.removeChild(x)

          const { location, history } = this.props
          const match = location.pathname.match(/\/print$/)
          if (match)
            history.replace(location.pathname.substring(0, match.index))
        }, 100)
      })
    }
  }

  render() {
    return null
  }
}

export default withRouter(PrintPortal)
