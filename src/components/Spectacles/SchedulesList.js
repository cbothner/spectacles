/**
 * @providesModule SchedulesList
 * @flow
 */

import React from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'

import { Button, Intent, Tag } from '@blueprintjs/core'

import Schedule from 'components/Schedule'
import { createSchedule } from 'redux/actions'

import type { ContextRouter } from 'react-router-dom'

import type { State, Schedule as ScheduleT, Suggestion } from 'redux/state'
import type { Dispatch } from 'redux/actions'

type OwnProps = { ...ContextRouter }

function mapStateToProps(state: State) {
  return {
    schedules: Object.keys(state.schedulesById).map(x => state.schedulesById[x])
  }
}

function mapDispatchToProps(dispatch: Dispatch, { history }: OwnProps) {
  return {
    handleAddSchedule: () =>
      dispatch(createSchedule()).then(id => history.replace(`/schedules/${id}`))
  }
}

type Props = OwnProps & { schedules: ScheduleT[] } & {
  handleAddSchedule: () => any
}
const SchedulesList = ({ schedules, match, handleAddSchedule }: Props) => {
  return (
    <article style={{ marginTop: '2em' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h4>Specification Schedules</h4>
        <Button
          intent={Intent.SUCCESS}
          iconName="add"
          text="New Schedule"
          onClick={handleAddSchedule}
        />
      </div>
      <table
        className="pt-table pt-interactive"
        style={{ width: '100%', tableLayout: 'fixed', overflow: 'hidden' }}
      >
        <thead>
          <tr>
            <th style={{ width: '15em' }}>Schedule Name</th>
            <th>Included Filters</th>
          </tr>
        </thead>
        <tbody>
          {schedules.map(schedule => {
            return <SchedulesListEntry key={schedule.id} {...schedule} />
          })}
        </tbody>
      </table>

      <Route path={`${match.url}/:scheduleId`} component={Schedule} />
    </article>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(SchedulesList)

const SchedulesListEntry = ({
  id,
  name = '—',
  suggestions = []
}: {
  id: string,
  name: string,
  suggestions: Suggestion[]
}) => {
  return (
    <Route>
      {({ history, match }) => (
        <tr onClick={() => history.replace(`${match.url}/${id}`)}>
          <td>{name}</td>
          <td style={{ lineHeight: 1.8, paddingTop: 8 }}>
            {suggestions.map(suggestion => {
              return (
                <FilterTag
                  key={suggestion.filterId}
                  filterId={suggestion.filterId}
                  discounted={!!suggestion.specialPrice}
                />
              )
            })}
          </td>
        </tr>
      )}
    </Route>
  )
}

const FilterTag = connect(
  (state: State, ownProps: { filterId: string, discounted: boolean }) => ({
    name: (state.filtersById[ownProps.filterId] || {}).name
  }),
  {}
)(({ name = '???', discounted }: { name?: string, discounted: boolean }) => (
  <Tag
    intent={discounted && Intent.SUCCESS}
    style={{ marginRight: 5 }}
    className="pt-minimal"
  >
    {name}
  </Tag>
))
