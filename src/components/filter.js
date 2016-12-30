import React from 'react'
import { connect } from 'react-redux'

import { Dialog, Button, InputGroup, Tag } from '@blueprintjs/core'

import SpectrophotometerData from './spectrophotometer_data.js'

const mapStateToProps = (state, ownProps) => {
  return {...state.filtersByName[ownProps.params.filterName]}
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClose: () => window.location.hash = '/filters'
  }
}

const Filter = ({ name, ce, color, vlt, onClose }) =>
  <Dialog isOpen={!!name} onClose={onClose} title={`Filter details: ${name}`} style={{width: 763}}>
    <div className="pt-dialog-body">

      <div className="pt-control-group">
        <InputGroup leftIconName='flash' placeholder="Name" value={name}
          rightElement={
            <Button
              iconName={ce ? 'tick' : 'time'}
              text={ce ? "EN207 Certified" : "EN207 Pending"}
              className="pt-minimal"
            />
          }
        />
        <InputGroup leftIconName='tint' placeholder="Color" value={color} />
        <InputGroup placeholder="VLT" value={vlt} rightElement={
          <Tag className="pt-minimal">%</Tag>
        } />
      </div>

      <SpectrophotometerData name={name} />

      <div style={{display: 'flex', marginTop: '1em'}}>
        <div className="pt-card" style={{flex: 1}}>
          <h5>OD Ratings</h5>
        </div>
        <div className="pt-card" style={{flex: 1, marginLeft: '1em'}}>
          <h5>L-Ratings</h5>
        </div>
      </div>

    </div>
    <div className="pt-dialog-footer">
      <div className="pt-dialog-footer-actions">
        <Button text="Done" onClick={onClose} />
      </div>
    </div>
  </Dialog>

export default connect(mapStateToProps, mapDispatchToProps)(Filter)
