import React from 'react'
import { connect } from 'react-redux'
import Match from 'react-router/Match'
import Link from 'react-router/Link'

import Schedule from './schedule.js'

const mapStateToProps = (state) => {
  return {
    schedules: Object.values(state.schedulesById)
  }
}

const SchedulesList = ({schedules, pathname}) => {
  return <article style={{marginTop: "2em"}}>
    <h4>Specification Schedules</h4>
    <table className="pt-table pt-interactive" style={{width: '100%'}}>
      <thead>
        <tr>
          <th style={{maxWidth: '5em'}}>Schedule Name</th>
          <th>Included Filters</th>
        </tr>
      </thead>
      <tbody>
        {schedules.map((schedule) => {
          return <SchedulesListEntry key={schedule.id} { ...schedule } />
        })}
      </tbody>
    </table>

    <Match pattern={`${pathname}/:scheduleId`} component={Schedule} />
  </article>
}

SchedulesList.propTypes = {
  schedules: React.PropTypes.array
}

export default connect(mapStateToProps)(SchedulesList)




const SchedulesListEntry = ({id, name, suggestions}) => {
  return <Link to={`/schedules/${id}`}>{
    ({onClick}) =>
      <tr onClick={onClick}>
        <td>{name}</td>
        <td>
          {suggestions.map((suggestion) => {
            return <FilterTag key={suggestion.filterId} filterId={suggestion.filterId} />
          })}
        </td>
      </tr>
    }
  </Link>
}

SchedulesListEntry.propTypes = {
  name: React.PropTypes.string,
  suggestions: React.PropTypes.array
}

const FilterTag = connect(
  (state, ownProps) => ({name: (state.filtersById[ownProps.filterId] || {}).name || "???"})
)(
  ({name}) => <div style={{marginRight: 5}} className="pt-tag pt-minimal">{name}</div>
)
