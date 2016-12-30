import React from 'react'
import { connect } from 'react-redux'

import VisibleSchedulesList from './schedules_list.js'
import VisibleFiltersList from './filters_list.js'

const mapStateToProps = (state) => {
  return {
    activeView: state.ui.activeView,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeView: (e) => { dispatch({ type: "CHANGE_VIEW", view: e.currentTarget.innerHTML }) },
  }
}

const Spectacles = ({ activeView, changeView }) =>
  <main style={{margin: "0 auto", maxWidth: "1200px"}}>

    <nav className="pt-navbar pt-dark">
      <div className="pt-navbar-group pt-align-left">
        <div className="pt-navbar-heading">Spectacles</div>
        <span className="pt-navbar-divider"></span>

        { [{name: 'Schedules', icon: 'document'}, {name: 'Filters', icon: 'flash'}]
          .map( (button) => <button
            onClick={changeView}
            className={`pt-button pt-minimal pt-icon-${button.icon} ${activeView === button.name ? 'pt-active' : ''}`}
          >{button.name}</button> )
        }

      </div>
      <div className="pt-navbar-group pt-align-right">
        <input className="pt-input" placeholder={`Search ${activeView.toLowerCase()}...`} type="text" />
      </div>
    </nav>

    { activeView === "Schedules"
      ? <VisibleSchedulesList />
      : <VisibleFiltersList />
    }

  </main>

Spectacles.propTypes = {
  filters: React.PropTypes.array,
  schedules: React.PropTypes.array
}

export default connect(mapStateToProps, mapDispatchToProps)(Spectacles)
