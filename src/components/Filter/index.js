import React from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'

import DocumentTitle from 'react-document-title'
import {
  Dialog,
  AnchorButton,
  Button,
  InputGroup,
  Tag,
  Intent
} from '@blueprintjs/core'

import FrameChooser from './FrameChooser'
import RangeTable from './RangeTable'
import SpectrophotometerData from './SpectrophotometerData'
import Printout, { SingleFilterPrintout } from 'components/Printout'
import PrintPortal from 'components/utility/PrintPortal'

import {
  getFilters,
  updateFilter,
  saveFilter,
  deleteFilter
} from 'redux/actions'

function mapStateToProps({ filtersById, ui }, { match }) {
  return {
    filter: filtersById[match.params.filterId],
    selectedFrames: ui.selectedFrames
  }
}

function mapDispatchToProps(dispatch, { history, match }) {
  let id = match.params.filterId
  const close = () => history.replace('/filters')
  return {
    handleChange: attr => e =>
      dispatch(updateFilter(id, { [attr]: e.currentTarget.value })),
    handleToggleCE: val => dispatch(updateFilter(id, { ce: val })),
    handleDelete: () => dispatch(deleteFilter(id, history)),
    handleSave: data => {
      dispatch(saveFilter(id, data))
      close()
    },
    handleCancel: () => {
      dispatch(getFilters())
      close()
    }
  }
}

class Filter extends React.Component {
  images = {}

  _preloadFrameImages = () => {
    const { filter, selectedFrames } = this.props
    if (!filter || !filter.availableFrames) return
    selectedFrames.map(frame => {
      if (this.images[frame]) return
      const img = document.createElement('img')
      img.src = filter.availableFrames[frame] || ''
      this.images[frame] = img
    })
  }

  componentDidMount() {
    this._preloadFrameImages()
  }

  componentDidUpdate() {
    this._preloadFrameImages()
  }

  render() {
    const {
      filter,
      selectedFrames,
      match,
      history,
      handleChange,
      handleToggleCE,
      handleDelete,
      handleSave,
      handleCancel
    } = this.props
    const { id, name, ce, basePrice, color, vlt } = filter || {}

    return (
      <DocumentTitle title={`Filter #${name || ''} — Spectacles`}>
        <Dialog
          isOpen={!!id}
          onClose={handleCancel}
          title="Filter Details"
          style={{ width: 763, top: '15%' }}
        >
          <div className="pt-dialog-body">
            <div className="pt-control-group">
              <InputGroup
                leftIconName="flash"
                placeholder="Name"
                value={name}
                onChange={handleChange('name')}
                rightElement={
                  <Button
                    iconName={ce ? 'tick' : 'time'}
                    text={ce ? 'EN207 Certified' : 'EN207 Pending'}
                    className="pt-minimal"
                    onClick={() => handleToggleCE(!ce)}
                  />
                }
              />
              <InputGroup
                leftIconName="dollar"
                placeholder="Base Price"
                value={basePrice}
                onChange={handleChange('basePrice')}
                type="number"
                step="0.01"
              />
              <InputGroup
                leftIconName="tint"
                placeholder="Color"
                value={color}
                onChange={handleChange('color')}
              />
              <InputGroup
                leftIconName="resolve"
                placeholder="VLT"
                value={vlt}
                onChange={handleChange('vlt')}
                type="number"
                rightElement={<Tag className="pt-minimal">%</Tag>}
              />
            </div>

            <SpectrophotometerData id={id} />

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: '1em'
              }}
            >
              <RangeTable filterId={id} name="OD Ratings" itemsKey="ods" />
              <RangeTable filterId={id} name="L-Ratings" itemsKey="lRatings" />
            </div>
            <div
              className="pt-control-group"
              style={{
                display: 'flex',
                marginTop: '1em',
                alignItems: 'stretch'
              }}
            >
              <FrameChooser id={id} />
              <AnchorButton
                text="Print"
                onClick={() => history.replace(`${match.url}/print`)}
                iconName="print"
                disabled={!filter || !filter.availableFrames}
                style={{ minWidth: 72 }}
              />
            </div>
          </div>
          <div
            className="pt-dialog-footer"
            style={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <div className="pt-dialog-footer-actions">
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
                onClick={() => handleSave(filter)}
                intent={Intent.PRIMARY}
              />
            </div>
          </div>

          <Route
            path={`${match.url}/print`}
            render={() => (
              <DocumentTitle title={`${filter.name.toLowerCase()}-spec`}>
                <PrintPortal>
                  <Printout>
                    <SingleFilterPrintout
                      filter={filter}
                      selectedFrames={selectedFrames}
                    />
                  </Printout>
                </PrintPortal>
              </DocumentTitle>
            )}
          />
        </Dialog>
      </DocumentTitle>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter)

export { default as SpectrophotometerChart } from './SpectrophotometerChart'
