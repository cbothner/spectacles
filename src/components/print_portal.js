import React from 'react'
import ReactDOM from 'react-dom'

import { withRouter } from 'react-router-dom'

class PrintPortal extends React.Component {
  componentDidMount() {
    var x = document.createElement("iframe")
    x.style.visibility = "hidden"
    x.style.position = "fixed"
    x.style.right = "0"
    x.style.bottom = "0"
    x.style.width = "918px"
    x.style.height = "1188px"
    document.body.appendChild(x)

    let idoc = x.contentDocument
    idoc.body.style.margin = "0"
    idoc.body.style.backgroundColor = "#F5F8FA"

    var link = idoc.createElement('link')
    link.rel = "stylesheet"
    link.type = "text/css"
    link.href = "https://unpkg.com/@blueprintjs/core@1.6.0/dist/blueprint.css"
    idoc.head.appendChild(link)

    link = idoc.createElement('link')
    link.rel = "stylesheet"
    link.type = "text/css"
    link.media = "print"
    link.href = "/print.css"
    idoc.head.appendChild(link)

    var div = idoc.createElement('div')
    idoc.body.appendChild(div)

    ReactDOM.render(this.props.children, div)
    setTimeout(() => {
      x.contentWindow.print()
      document.body.removeChild(x)

      const { location, history } = this.props
      const match = location.pathname.match(/\/print$/)
      if (match)  history.replace(location.pathname.substring(0, match.index))
    }, 50)
  }

  render() {
    return null
  }
}

export default withRouter(PrintPortal)