import React from 'react'
import ReactDOM from 'react-dom'

class PrintPortal extends React.Component {
  componentDidMount() {
    var x = document.createElement("iframe")
    x.style.visibility = "hidden"
    x.style.position = "fixed"
    x.style.right = "0"
    x.style.bottom = "0"
    document.body.appendChild(x)

    let idoc = x.contentDocument

    var link = idoc.createElement('link')
    link.rel = "stylesheet"
    link.type = "text/css"
    link.href = "https://unpkg.com/@blueprintjs/core@1.6.0/dist/blueprint.css"
    idoc.head.appendChild(link)

    var div = idoc.createElement('div')
    idoc.body.appendChild(div)

    ReactDOM.render(this.props.children, div)
    setTimeout(() => {
      x.contentWindow.print()
      document.body.removeChild(x)
    }, 500)
  }

  render() {
    return null
  }
}

export default PrintPortal
