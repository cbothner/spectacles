import React from 'react'
import { connect } from 'react-redux'
import { MenuItem } from '@blueprintjs/core'
import { MultiSelect } from '@blueprintjs/labs'

import { getAvailableFrames, updateSelectedFrames } from '../actions'

function mapStateToProps({ filtersById, ui }, { id }) {
  const availableFrames = filtersById[id].availableFrames || {}
  const { selectedFrames } = ui
  return { id, availableFrames, selectedFrames }
}

class FrameChooser extends React.Component {
  componentDidMount() {
    this.props.getAvailableFrames(this.props.id)
  }

  render() {
    const { availableFrames, selectedFrames, updateSelectedFrames } = this.props
    return (
      <MultiSelect
        resetOnSelect
        className="pt-fill"
        tagInputProps={{
          leftIconName: 'media',
          inputProps: { placeholder: 'Choose frame images to include...' },
          onRemove: (_frame, index) =>
            updateSelectedFrames(
              selectedFrames.filter((_frame, i) => i !== index)
            )
        }}
        popoverProps={{ popoverClassName: 'pt-minimal' }}
        items={Object.keys(availableFrames)}
        itemPredicate={(query, item) => item.indexOf(query) >= 0}
        selectedItems={selectedFrames}
        itemRenderer={({ handleClick, isActive, item: frame }) => (
          <MenuItem
            className={isActive ? 'pt-active pt-intent-primary' : ''}
            iconName={selectedFrames.indexOf(frame) >= 0 ? 'tick' : 'blank'}
            key={frame}
            onClick={handleClick}
            text={frame}
            shouldDismissPopover={false}
          />
        )}
        noResults={<MenuItem disabled text="No results." />}
        tagRenderer={frame => frame}
        onItemSelect={frame =>
          selectedFrames.indexOf(frame) < 0 &&
          updateSelectedFrames([...selectedFrames, frame])}
      />
    )
  }
}

export default connect(mapStateToProps, {
  getAvailableFrames,
  updateSelectedFrames
})(FrameChooser)
