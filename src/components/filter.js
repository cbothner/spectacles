import React from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'

import { Dialog, AnchorButton, Button, InputGroup, Tag, Intent } from '@blueprintjs/core'

import SpectrophotometerData from './spectrophotometer_data.js'
import RangeTable from './range_table.js'
import Printout from './printout.js'
import SingleFilterPrintout from './single_filter_printout.js'
import PrintPortal from './print_portal.js'

import { updateFilter, deleteFilter } from '../actions.js'

const mapStateToProps = (state, {match}) => {
  return {
    ...state.filtersById[match.params.filterId],
  }
}

const mapDispatchToProps = (dispatch, {history, match}) => {
  let id = match.params.filterId
  return {
    onClose: () => history.replace('/filters'),
    onChange: (attr) => (e) =>
        dispatch(updateFilter(id, {[attr]: e.currentTarget.value})),
    onToggleCE: (val) => dispatch(updateFilter(id, {ce: val})),
    onDelete: () => dispatch(deleteFilter(id, history)),
  }
}

const Filter = (props) => {
  const { id, name, ce, basePrice, color, vlt, onClose,
    onChange, onToggleCE, onDelete, match, history } = props

  return <Dialog isOpen={!!id} onClose={onClose} title="Filter Details"
      style={{width: 763, top: '15%'}}>
    <div className="pt-dialog-body">

      <div className="pt-control-group">
        <InputGroup leftIconName='flash' placeholder="Name" value={name}
          onChange={onChange('name')}
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
          value={basePrice} onChange={onChange('basePrice')} type="number"
          step="0.01"/>
        <InputGroup leftIconName='tint' placeholder="Color" value={color}
          onChange={onChange('color')} />
        <InputGroup leftIconName='resolve' placeholder="VLT" value={vlt}
          onChange={onChange('vlt')} type="number"
          rightElement={
          <Tag className="pt-minimal">%</Tag>
        } />
      </div>

      <SpectrophotometerData id={id} />

      <div style={{ display: 'flex', justifyContent: 'space-between',
          marginTop: '1em' }}>
        <RangeTable filterId={id} name="OD Ratings" itemsKey="ods" />
        <RangeTable filterId={id} name="L-Ratings" itemsKey="lRatings" />
      </div>

    </div>
    <div className="pt-dialog-footer" style={{display: 'flex',
        justifyContent: 'space-between'}}>
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
          <SingleFilterPrintout filter={props} />
        </Printout>
    </PrintPortal>} />
  </Dialog>
  }

export default connect(mapStateToProps, mapDispatchToProps)(Filter)
