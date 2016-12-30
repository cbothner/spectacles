import React from 'react'
import { connect } from 'react-redux'

import { Dialog, Button, InputGroup, Tag } from '@blueprintjs/core'

import SpectrophotometerData from './spectrophotometer_data.js'
import RangeTable from './range_table.js'

const mapStateToProps = (state, ownProps) => {
  return {...state.filtersByName[ownProps.params.filterName]}
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClose: () => window.location.hash = '/filters'
  }
}

const Filter = ({ name, ce, basePrice, color, vlt, ods, lRatings, onClose }) =>
  <Dialog isOpen={!!name} onClose={onClose} title={`Filter details: ${name}`} style={{width: 763, top: '15%'}}>
    <div className="pt-dialog-body">

      <div className="Filter__details-control-group pt-control-group">
        <InputGroup leftIconName='flash' placeholder="Name" value={name}
          rightElement={
            <Button
              iconName={ce ? 'tick' : 'time'}
              text={ce ? "EN207 Certified" : "EN207 Pending"}
              className="pt-minimal"
            />
          }
        />
        <InputGroup leftIconName='dollar' placeholder="Base Price" value={basePrice} />
        <InputGroup leftIconName='tint' placeholder="Color" value={color} />
        <InputGroup placeholder="VLT" value={vlt} rightElement={
          <Tag className="pt-minimal">%</Tag>
        } />
      </div>

      <SpectrophotometerData name={name} />

      <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '1em'}}>
        <RangeTable name="OD Ratings" items={ods} />
        <RangeTable name="L-Ratings" items={lRatings} />
      </div>

    </div>
    <div className="pt-dialog-footer">
      <div className="pt-dialog-footer-actions">
        <Button text="Done" onClick={onClose} />
      </div>
    </div>
  </Dialog>

export default connect(mapStateToProps, mapDispatchToProps)(Filter)
