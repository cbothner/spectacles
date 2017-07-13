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
  deleteSchedule
} from '../actions.js'

import { push } from '../immutable_array.js'

import Printout from './printout.js'
import SchedulePrintout from './schedule_printout.js'
import PrintPortal from './print_portal.js'
import SortableList from './sortable_list.js'

function mapStateToProps(state, { match }) {
  let schedule = state.schedulesById[match.params.scheduleId]
  return {
    schedule,
    filtersById: state.filtersById
  }
}

function mapDispatchToProps(dispatch, { match, history }) {
  let id = match.params.scheduleId
  const close = () => history.replace('/schedules')
  return {
    handleCancel: () => {
      dispatch(getSchedules())
      close()
    },

    handleChange: attr => e => {
      dispatch(updateSchedule(id, { [attr]: e.currentTarget.value }))
    },

    setSuggestions: data => dispatch(updateSchedule(id, { suggestions: data })),

    handleSave: data => {
      dispatch(saveSchedule(id, data))
      close()
    },

    handleDelete: () => dispatch(deleteSchedule(id, history))
  }
}

class Schedule extends React.Component {
  state = { selectedFilter: NaN }

  handleChangeSelectedFilter = e =>
    this.setState({ selectedFilter: e.target.value })

  handleAddSuggestion = suggestions => {
    this.setState({ selectedFilter: NaN })
    this.props.setSuggestions(suggestions)
  }

  render() {
    const {
      schedule = {},
      filtersById,
      handleCancel,
      handleChange,
      handleSave,
      handleDelete,
      setSuggestions,
      match,
      history
    } = this.props
    const { id, name, suggestions = [] } = schedule

    const { selectedFilter } = this.state

    const suggestionIds = new Set(suggestions.map(s => s.filterId))
    const absentFilterIds = Object.keys(filtersById).filter(
      f => !suggestionIds.has(f)
    )
    const absentFilters = absentFilterIds.map(id => filtersById[id])

    return (
      <Dialog
        isOpen={!!id}
        onClose={handleCancel}
        title="Schedule Details"
        style={{ top: '10%' }}
      >
        <div className="pt-dialog-body">
          <InputGroup
            leftIconName="document"
            placeholder="Schedule Name"
            value={name}
            onChange={handleChange('name')}
          />

          <div className="pt-card" style={{ marginTop: '1em' }}>
            <h5 style={{ marginBottom: '1em' }}>Included Filters</h5>

            <SortableList items={suggestions} onChange={setSuggestions}>
              {({ item, index, onChangeItem }) => {
                let filter = filtersById[item.filterId] || {}
                return (
                  <span style={{ display: 'flex', flex: 1 }}>
                    <Tag
                      className="pt-large pt-minimal"
                      style={{
                        borderRadius: 0,
                        padding: '4px 10px',
                        border: '1px solid rgba(16, 22, 26, 0.1)'
                      }}
                    >
                      <strong>
                        {filter.name || '???'}
                      </strong>
                    </Tag>

                    <InputGroup
                      leftIconName="dollar"
                      placeholder={`${filter.basePrice} list`}
                      value={item.specialPrice}
                      type="number"
                      step="0.01"
                      className="flex-grow"
                      onChange={e =>
                        onChangeItem({
                          specialPrice: e.currentTarget.value
                        })}
                      rightElement={
                        item.specialPrice &&
                        <Tag className="pt-minimal">
                          ${filter.basePrice} list
                        </Tag>
                      }
                    />
                  </span>
                )
              }}
            </SortableList>

            {absentFilters.length > 0
              ? <div className="pt-control-group" style={{ marginTop: '1em' }}>
                  <div className="pt-select">
                    <select
                      value={selectedFilter}
                      onChange={this.handleChangeSelectedFilter}
                    >
                      <option value={NaN} disabled hidden>
                        Choose a filter
                      </option>
                      {absentFilters.map(filter =>
                        <option key={filter.id} value={filter.id}>
                          {filter.name}
                        </option>
                      )}
                    </select>
                  </div>

                  <Button
                    intent={Intent.SUCCESS}
                    iconName="add"
                    text="Add"
                    disabled={selectedFilter === ''}
                    onClick={() =>
                      this.handleAddSuggestion(
                        push(suggestions, {
                          filterId: selectedFilter,
                          specialPrice: ''
                        })
                      )}
                  />
                </div>
              : <p className="pt-text-muted" style={{ marginTop: '1em' }}>
                  This schedule contains all filters.
                </p>}
          </div>
        </div>

        <div
          className="pt-dialog-footer"
          style={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <div className="pt-dialog-footer-actions">
            <AnchorButton
              text="Print"
              onClick={() => history.replace(`${match.url}/print`)}
              iconName="print"
            />
            <Button
              text="Delete"
              onClick={handleDelete}
              intent={Intent.DANGER}
              iconName="trash"
            />
          </div>
          <div className="pt-dialog-footer-actions">
            <Button text="Cancel" onClick={handleCancel} />
            <Button
              text="Save"
              onClick={() => handleSave(schedule)}
              intent={Intent.PRIMARY}
            />
          </div>
        </div>

        <Route
          path={`${match.url}/print`}
          render={() =>
            <PrintPortal>
              <Printout>
                <SchedulePrintout
                  schedule={schedule}
                  filtersById={filtersById}
                />
              </Printout>
            </PrintPortal>}
        />
      </Dialog>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Schedule)
