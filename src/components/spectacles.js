import React from 'react';
import {connect} from 'react-redux';
import {Switch, Route, NavLink, Redirect} from 'react-router-dom';

import VisibleSchedulesList from './schedules_list.js';
import VisibleFiltersList from './filters_list.js';

import {getFilters, getSchedules} from '../actions.js';

class Spectacles extends React.Component {
  constructor(props) {
    super(props);
    props.getFilters();
    props.getSchedules();
  }

  render() {
    return (
      <main style={{margin: '0 auto', maxWidth: '1200px'}}>

        <nav className="pt-navbar pt-dark">
          <div className="pt-navbar-group pt-align-left">
            <div className="pt-navbar-heading">Spectacles</div>
            <span className="pt-navbar-divider" />

            <NavLink
              to="/schedules"
              className="pt-button pt-minimal pt-icon-document"
              activeClassName="pt-active"
            >
              Schedules
            </NavLink>
            <NavLink
              to="/filters"
              className="pt-button pt-minimal pt-icon-flash"
              activeClassName="pt-active"
            >
              Filters
            </NavLink>

          </div>
          <div className="pt-navbar-group pt-align-right">
            <input
              className="pt-input"
              placeholder={`Search Spectacles...`}
              type="text"
            />
          </div>
        </nav>

        <Switch>
          <Route path="/filters" component={VisibleFiltersList} />
          <Route path="/schedules" component={VisibleSchedulesList} />
          <Redirect to="/filters" />
        </Switch>

      </main>
    );
  }
}

Spectacles.propTypes = {
  filters: React.PropTypes.array,
  schedules: React.PropTypes.array,
};

export default connect(null, {getFilters, getSchedules})(Spectacles);
