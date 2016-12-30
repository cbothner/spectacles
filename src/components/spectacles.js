import React from 'react'
import Match from 'react-router/Match'
import Link from 'react-router/Link'
import Redirect from 'react-router/Redirect'

import VisibleSchedulesList from './schedules_list.js'
import VisibleFiltersList from './filters_list.js'

const Spectacles = () => {
  return <main style={{margin: "0 auto", maxWidth: "1200px"}}>

    <nav className="pt-navbar pt-dark">
      <div className="pt-navbar-group pt-align-left">
        <div className="pt-navbar-heading">Spectacles</div>
        <span className="pt-navbar-divider"></span>

        <Link to="/schedules" className="pt-button pt-minimal pt-icon-document" activeClassName="pt-active">Schedules</Link>
        <Link to="/filters" className="pt-button pt-minimal pt-icon-flash" activeClassName="pt-active">Filters</Link>

      </div>
      <div className="pt-navbar-group pt-align-right">
        <input className="pt-input" placeholder={`Search Spectacles...`} type="text" />
      </div>
    </nav>

    <Match exactly pattern="/" render={() => <Redirect to="/filters" />} />
    <Match pattern="/filters" component={VisibleFiltersList} />
    <Match pattern="/schedules" component={VisibleSchedulesList} />

  </main>
}

Spectacles.propTypes = {
  filters: React.PropTypes.array,
  schedules: React.PropTypes.array
}

export default Spectacles
