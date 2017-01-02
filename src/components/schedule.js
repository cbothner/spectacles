import React from 'react'
import { connect } from 'react-redux'

import { Dialog, Button, InputGroup, Tag, Intent } from '@blueprintjs/core'

const mapStateToProps = (state, ownProps) => {
  let schedule = state.schedulesById[ownProps.params.scheduleId]
  return {
    ...schedule,
    filtersById: state.filtersById,
    absentFilters: Object.values(state.filtersById).filter(filter => schedule.suggestions.find(x => x.filterId !== filter.id).legnth > 0),
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClose: () => window.location.hash = '/schedules',
    onChange: (attr) => (e) => null,
  }
}

const Schedule = ({id, name, suggestions, filtersById, absentFilters, onClose, onChange}) =>
  <Dialog isOpen={!!id} onClose={onClose} title="Schedule Details">
    <div className="pt-dialog-body">
      <InputGroup leftIconName='document' placeholder="Schedule Name" value={name} onChange={onChange('name')} />
      <div className="pt-card" style={{marginTop: '1em'}}>
        <h5 style={{marginBottom: '1em'}}>Included Filters</h5>
        { suggestions.map( s => {
          let filter = filtersById[s.filterId] || {}
          return <div className="pt-control-group" style={{marginTop: '0.5em'}}>
            <Button iconName="drag-handle-horizontal" style={{cursor: '-webkit-grab'}} />
            <Tag className="pt-large pt-minimal"
                style={{borderRadius: 0, padding: '4px 10px', border: '1px solid rgba(16, 22, 26, 0.1)'}}>
              <strong>{filter.name || "???"}</strong>
            </Tag>
            <InputGroup leftIconName="dollar" placeholder={`${filter.basePrice} list`} className="flex-grow"
              value={s.specialPrice} type="number"
              step="0.01"
              rightElement={
                s.specialPrice && <Tag className="pt-minimal">${filter.basePrice} list</Tag>
                }
            />
            <Button intent={Intent.DANGER} iconName="remove" onClick={() => {}} />
          </div>
        }) }
        { absentFilters.length > 0
          ? <label className="pt-label pt-inline" style={{marginTop: '1em'}}>
            Add a filter:
            {" "}
            <div className="pt-control-group" style={{display: 'inline-block'}}>
              <div className="pt-select">
                <select value={1}>
                  {absentFilters.map(filter => <option value={filter.id}>{filter.name}</option>)}
                </select>
              </div>
              <Button intent={Intent.SUCCESS} iconName="add" text="Add" />
            </div>
          </label>
          : <p className="pt-text-muted" style={{marginTop: '1em'}}>This schedule contains all filters.</p>}
      </div>
    </div>
    <div className="pt-dialog-footer" style={{display: 'flex', justifyContent: 'space-between'}}>
      <Button text="Delete" onClick={onClose} intent={Intent.DANGER} />
      <div className="pt-dialog-footer-actions">
        <Button text="Cancel" onClick={onClose} />
        <Button text="Save" onClick={onClose} intent={Intent.PRIMARY} />
      </div>
    </div>
  </Dialog>

export default connect(mapStateToProps, mapDispatchToProps)(Schedule)
