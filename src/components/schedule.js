import React from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'

import { Dialog, AnchorButton, Button, InputGroup, Tag, Intent } from '@blueprintjs/core'

import { updateSchedule, deleteSchedule, changeSelectedFilter} from '../actions.js'
import { update, push, remove } from '../immutable_array.js'

import Printout from './printout.js'
import SchedulePrintout from './schedule_printout.js'
import PrintPortal from './print_portal.js'

const mapStateToProps = (state, {match}) => {
  let schedule = state.schedulesById[match.params.scheduleId]
  return {
    schedule,
    filtersById: state.filtersById,
    selectedFilter: state.ui.selectedFilter,
  }
}

const mapDispatchToProps = (dispatch, {match, history}) => {
  let id = match.params.scheduleId
  return {
    onClose: () => {
      history.replace('/schedules')
      dispatch(changeSelectedFilter(""))
    },
    onChange: (attr) => (e) => dispatch(updateSchedule(id, {[attr]: e.currentTarget.value})),
    onChangeSelectedFilter: e => dispatch(changeSelectedFilter(e.currentTarget.value)),
    setSuggestions: (data) => dispatch(updateSchedule(id, {suggestions: data})),
    onDelete: () => dispatch(deleteSchedule(id, history))
  }
}

const Schedule = ({schedule, filtersById, selectedFilter, onClose, onChange, setSuggestions, onChangeSelectedFilter, onDelete, match, history}) => {
  let { id, name, suggestions } = schedule
  let absentFilters = Object.values(filtersById).filter(f => !suggestions.find(s => s.filterId === f.id))

  return <Dialog isOpen={!!id} onClose={onClose} title="Schedule Details">
    <div className="pt-dialog-body">
      <InputGroup leftIconName='document' placeholder="Schedule Name" value={name} onChange={onChange('name')} />
      <div className="pt-card" style={{marginTop: '1em'}}>
        <h5 style={{marginBottom: '1em'}}>Included Filters</h5>
        { suggestions.map( (s, i) => {
          let filter = filtersById[s.filterId] || {}
          return <div className="pt-control-group" style={{marginTop: '0.5em'}} key={s.filterId}>
            <Button iconName="drag-handle-horizontal" style={{cursor: '-webkit-grab'}} />
            <Tag className="pt-large pt-minimal"
                style={{borderRadius: 0, padding: '4px 10px', border: '1px solid rgba(16, 22, 26, 0.1)'}}>
              <strong>{filter.name || "???"}</strong>
            </Tag>
            <InputGroup leftIconName="dollar" placeholder={`${filter.basePrice} list`} className="flex-grow"
              value={s.specialPrice} type="number"
              step="0.01" onChange={e => setSuggestions(update(suggestions, i, {specialPrice: e.currentTarget.value}))}
              rightElement={
                s.specialPrice && <Tag className="pt-minimal">${filter.basePrice} list</Tag>
                }
            />
            <Button intent={Intent.DANGER} iconName="remove" onClick={() => setSuggestions(remove(suggestions, i))} />
          </div>
        }) }
        { absentFilters.length > 0
          ? <div className="pt-control-group" style={{marginTop: '1em'}}>
              <div className="pt-select">
                <select value={selectedFilter} onChange={onChangeSelectedFilter}>
                  <option value={ NaN } disabled hidden>Choose a filter</option>
                  {absentFilters.map(filter => <option value={filter.id}>{filter.name}</option>)}
                </select>
              </div>
              <Button intent={Intent.SUCCESS} iconName="add" text="Add" disabled={selectedFilter === ""}
                onClick={() => setSuggestions(push(suggestions, {filterId: selectedFilter}))}
              />
            </div>
          : <p className="pt-text-muted" style={{marginTop: '1em'}}>This schedule contains all filters.</p>}
      </div>
    </div>

    <div className="pt-dialog-footer" style={{display: 'flex', justifyContent: 'space-between'}}>
      <div className="pt-dialog-footer-actions">
        <AnchorButton text="Print" onClick={() => history.replace(`${match.url}/print`)} iconName='print' />
        <Button text="Delete" onClick={onDelete} intent={Intent.DANGER} iconName='trash' />
      </div>
      <div className="pt-dialog-footer-actions">
        <Button text="Cancel" onClick={onClose} />
        <Button text="Save" onClick={onClose} intent={Intent.PRIMARY} />
      </div>
    </div>

    <Route path={`${match.url}/print`} render={() => <PrintPortal>
        <Printout>
          <SchedulePrintout schedule={schedule} filtersById={filtersById} />
        </Printout>
    </PrintPortal>} />
  </Dialog>
}

export default connect(mapStateToProps, mapDispatchToProps)(Schedule)
