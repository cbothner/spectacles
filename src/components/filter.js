import React from 'react'
import { connect } from 'react-redux'

import { Dialog, Button, InputGroup, Tag, Intent } from '@blueprintjs/core'

import SpectrophotometerData from './spectrophotometer_data.js'
import RangeTable from './range_table.js'

import { updateFilter, deleteFilter } from '../actions.js'

const mapStateToProps = (state, ownProps) => {
  return {...state.filtersById[ownProps.params.filterId]}
}

const mapDispatchToProps = (dispatch, ownProps) => {
  let id = ownProps.params.filterId
  return {
    onClose: () => window.location.hash = '/filters',
    onChange: (attr) => (e) => dispatch(updateFilter(id, {[attr]: e.currentTarget.value})),
    onToggleCE: (val) => dispatch(updateFilter(id, {ce: val})),
    onDelete: () => dispatch(deleteFilter(id)),
  }
}

const Filter = ({ id, name, ce, basePrice, color, vlt, ods, lRatings, onClose, onChange, onToggleCE, onDelete }) =>
  <Dialog isOpen={!!id} onClose={onClose} title={`Filter details: ${name}`} style={{width: 763, top: '15%'}}>
    <div className="pt-dialog-body">

      <div className="Filter__details-control-group pt-control-group">
        <InputGroup leftIconName='flash' placeholder="Name" value={name} onChange={onChange('name')}
          rightElement={
            <Button
              iconName={ce ? 'tick' : 'time'}
              text={ce ? "EN207 Certified" : "EN207 Pending"}
              className="pt-minimal"
              onClick={() => onToggleCE(!ce)}
            />
          }
        />
        <InputGroup leftIconName='dollar' placeholder="Base Price"
          value={basePrice} onChange={onChange('basePrice')} type="number" step="0.01"/>
        <InputGroup leftIconName='tint' placeholder="Color" value={color} onChange={onChange('color')} />
        <InputGroup leftIconName='resolve' placeholder="VLT" value={vlt}
          onChange={onChange('vlt')} type="number"
          rightElement={
          <Tag className="pt-minimal">%</Tag>
        } />
      </div>

      <SpectrophotometerData id={id} />

      <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '1em'}}>
        <RangeTable filterId={id} name="OD Ratings" itemsKey="ods" />
        <RangeTable filterId={id} name="L-Ratings" itemsKey="lRatings" />
      </div>

    </div>
    <div className="pt-dialog-footer" style={{display: 'flex', justifyContent: 'space-between'}}>
      <Button text="Delete" onClick={onDelete} intent={Intent.DANGER} />
      <div className="pt-dialog-footer-actions">
        <Button text="Cancel" onClick={onClose} />
        <Button text="Save" onClick={onClose} intent={Intent.PRIMARY} />
      </div>
    </div>
  </Dialog>

export default connect(mapStateToProps, mapDispatchToProps)(Filter)
