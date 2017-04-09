import React from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'

import {
  Dialog,
  AnchorButton,
  Button,
  InputGroup,
  Tag,
  Intent
} from '@blueprintjs/core'

import {
  getSchedules,
  updateSchedule,
  saveSchedule,
  deleteSchedule,
  changeSelectedFilter
} from '../actions.js'

import { update, push, remove } from '../immutable_array.js'

import Printout from './printout.js'
import SchedulePrintout from './schedule_printout.js'
import PrintPortal from './print_portal.js'

function mapStateToProps(state, {match}) {
  let schedule = state.schedulesById[match.params.scheduleId]
  return {
    schedule,
    filtersById: state.filtersById,
    selectedFilter: state.ui.selectedFilter,
  }
}

function mapDispatchToProps(dispatch, {match, history}) {
  let id = match.params.scheduleId
  const close = () => history.replace('/schedules')
  return {
    handleCancel: () => {
      dispatch(getSchedules())
      close()
    },

    handleChange: attr => e => {
      dispatch(updateSchedule(id, {[attr]: e.currentTarget.value}))
    },

    handleChangeSelectedFilter: e => {
      dispatch(changeSelectedFilter(e.currentTarget.value))
    },

    setSuggestions: data => dispatch(updateSchedule(id, {suggestions: data})),

    handleSave: data => {
      dispatch(saveSchedule(id, data))
      close()
    },

    handleDelete: () => dispatch(deleteSchedule(id, history))
  }
}

function Schedule({
  schedule = {},
  filtersById,
  selectedFilter,
  handleCancel,
  handleChange,
  handleSave,
  setSuggestions,
  handleChangeSelectedFilter,
  handleDelete,
  match,
  history
}) {
  const { id, name, suggestions = [] } = schedule

  const suggestionIds = new Set(suggestions.map(s => s.filterId))
  const absentFilterIds = Object.keys(filtersById)
    .filter(f => !suggestionIds.has(parseInt(f, 10)))
  const absentFilters = absentFilterIds.map( id => filtersById[id])

  return (
    <Dialog isOpen={!!id} onClose={handleCancel} title="Schedule Details">

      <div className="pt-dialog-body">

        <InputGroup
          leftIconName="document"
          placeholder="Schedule Name"
          value={name}
          onChange={handleChange('name')}
        />

        <div className="pt-card" style={{marginTop: '1em'}}>
          <h5 style={{marginBottom: '1em'}}>Included Filters</h5>

          { suggestions.map( (s, i) => {
            let filter = filtersById[s.filterId] || {}
            return (
              <div className="pt-control-group" style={{marginTop: '0.5em'}}>
                <Button
                  iconName="drag-handle-horizontal"
                  style={{cursor: '-webkit-grab'}}
                />

                <Tag
                  className="pt-large pt-minimal"
                  style={{
                    borderRadius: 0,
                    padding: '4px 10px',
                    border: '1px solid rgba(16, 22, 26, 0.1)'
                  }}
                >
                  <strong>{filter.name || "???"}</strong>
                </Tag>

                <InputGroup
                  leftIconName="dollar"
                  placeholder={`${filter.basePrice} list`}
                  className="flex-grow"
                  value={s.specialPrice}
                  type="number"
                  step="0.01"
                  onChange={e => setSuggestions(
                    update(
                      suggestions,
                      i,
                      {specialPrice: e.currentTarget.value}
                    )
                  )}
                  rightElement={
                    s.specialPrice && (
                      <Tag className="pt-minimal">
                        ${filter.basePrice} list
                      </Tag>
                    )
                  }
                />

                <Button
                  intent={Intent.DANGER}
                  iconName="remove"
                  onClick={() => setSuggestions(remove(suggestions, i))}
                />
              </div>
            );
          }) }

          { absentFilters.length > 0 ? (
            <div className="pt-control-group" style={{marginTop: '1em'}}>
              <div className="pt-select">
                <select value={selectedFilter} onChange={handleChangeSelectedFilter}>
                  <option value={ NaN } disabled hidden>Choose a filter</option>
                  {absentFilters.map(filter => (
                    <option value={filter.id}>{filter.name}</option>
                  ))}
                </select>
              </div>

              <Button
                intent={Intent.SUCCESS}
                iconName="add"
                text="Add"
                disabled={selectedFilter === ""}
                onClick={() => setSuggestions(push(
                  suggestions,
                  {filterId: selectedFilter}
                ))}
              />
            </div>
          ) : (
            <p className="pt-text-muted" style={{marginTop: '1em'}}>
              This schedule contains all filters.
            </p>
          ) }
          </div>
        </div>

        <div
          className="pt-dialog-footer"
          style={{display: 'flex', justifyContent: 'space-between'}}
        >
          <div className="pt-dialog-footer-actions">
            <AnchorButton
              text="Print"
              onClick={() => history.replace(`${match.url}/print`)}
              iconName='print'
            />
            <Button
              text="Delete"
              onClick={handleDelete}
              intent={Intent.DANGER}
              iconName='trash'
            />
          </div>
          <div className="pt-dialog-footer-actions">
            <Button text="Cancel" onClick={handleCancel} />
            <Button text="Save" onClick={() => handleSave(schedule)} intent={Intent.PRIMARY} />
          </div>
        </div>

        <Route path={`${match.url}/print`} render={() => (
          <PrintPortal>
            <Printout>
              <SchedulePrintout schedule={schedule} filtersById={filtersById} />
            </Printout>
            </PrintPortal>
          )}
        />
    </Dialog>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Schedule)
