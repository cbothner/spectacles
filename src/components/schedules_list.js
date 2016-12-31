import React from 'react'
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
  return {
    schedules: Object.values(state.schedulesById)
  }
}

const SchedulesList = ({schedules}) => {
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
          return <SchedulesListEntry { ...schedule } />
        })}
      </tbody>
    </table>
  </article>
}

SchedulesList.propTypes = {
  schedules: React.PropTypes.array
}

export default connect(mapStateToProps)(SchedulesList)




const SchedulesListEntry = ({name, suggestions}) => {
  return <tr>
    <td>{name}</td>
    <td>
      {suggestions.map((suggestion) => {
        return <div style={{marginRight: '5px'}} className="pt-tag pt-minimal">{suggestion.filterId}</div>
      })}
    </td>
  </tr>
}

SchedulesListEntry.propTypes = {
  name: React.PropTypes.string,
  suggestions: React.PropTypes.array
}
