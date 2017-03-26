import React from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'

import { Button, Intent, Tag } from '@blueprintjs/core'

import Schedule from './schedule.js'
import { addSchedule } from '../actions.js'

const mapStateToProps = (state) => {
  return {
    schedules: Object.values(state.schedulesById)
  }
}

const mapDispatchToProps = (dispatch, {history}) => {
  return {
    onAddSchedule: () => dispatch(addSchedule(history))
  }
}

const SchedulesList = ({schedules, match, onAddSchedule}) => {
  return <article style={{marginTop: "2em"}}>
    <div style={{display: 'flex', justifyContent: 'space-between'}}>
      <h4>Specification Schedules</h4>
      <Button intent={Intent.SUCCESS} iconName="add" text="New Filter" onClick={onAddSchedule} />
    </div>
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

    <Route path={`${match.url}/:scheduleId`} component={Schedule} />
  </article>
}

SchedulesList.propTypes = {
  schedules: React.PropTypes.array
}

export default connect(mapStateToProps, mapDispatchToProps)(SchedulesList)




const SchedulesListEntry = ({id, name = "—", suggestions = []}) => {
  return <Route>
    {
      ({history, match}) =>
      <tr onClick={() => history.replace(`${match.url}/${id}`)}>
        <td>{name}</td>
        <td>
          {suggestions.map((suggestion) => {
            return <FilterTag key={suggestion.filterId} filterId={suggestion.filterId} discounted={!!suggestion.specialPrice} />
          })}
        </td>
      </tr>
    }
  </Route>
}

SchedulesListEntry.propTypes = {
  name: React.PropTypes.string,
  suggestions: React.PropTypes.array
}

const FilterTag = connect(
  (state, ownProps) => ({name: (state.filtersById[ownProps.filterId] || {}).name})
)(
  ({name = "???", discounted}) => <Tag intent={discounted && Intent.SUCCESS} style={{marginRight: 5}} className="pt-minimal">{name}</Tag>
)
