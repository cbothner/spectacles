/**
 * @providesModule Embed
 * @flow
 */

import React from 'react'
import { connect } from 'react-redux'

import { SpectrophotometerChart } from 'components/Filter'

import { getFilter } from 'redux/actions'

import type { ContextRouter } from 'react-router-dom'

import type { State, Filter } from 'redux/state'

import 'embed.css'

var throttle = (type: string, name: string, obj?: HTMLElement) => {
  obj = obj || window
  var running = false
  var func = function() {
    if (running) {
      return
    }
    running = true
    requestAnimationFrame(function() {
      if (obj == null) {
        throw new Error('Obj should not be unmounted between clicks.')
      }

      obj.dispatchEvent(new CustomEvent(name))
      running = false
    })
  }
  obj.addEventListener(type, func)
}

throttle('resize', 'optimizedResize')

type OwnProps = {| ...ContextRouter |}

function mapStateToProps({ filtersById }: State, { match }: OwnProps) {
  return {
    filter: filtersById[Object.keys(filtersById)[0]] || {}
  }
}

type Props = OwnProps & { filter: Filter, getFilter: typeof getFilter }
class Embed extends React.Component<Props> {
  componentDidMount() {
    const { name } = this.props.match.params
    if (name == null) {
      throw new Error('How is this component mounted without a name param?')
    }

    this.props.getFilter(name)

    window.addEventListener('optimizedResize', () => this.forceUpdate())

    document.body && document.body.classList.add('embedded')
  }

  render() {
    const { filter } = this.props
    const doc = document.documentElement
    if (doc == null) return null

    return (
      <div style={{ overflow: 'hidden' }}>
        <SpectrophotometerChart
          embedded
          data={filter.spectrophotometerData}
          width={doc.clientWidth}
          height={doc.clientHeight}
        />
      </div>
    )
  }
}

export default connect(mapStateToProps, { getFilter })(Embed)
