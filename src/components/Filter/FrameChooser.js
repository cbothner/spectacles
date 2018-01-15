/**
 * @providesModule FrameChooser
 * @flow
 */

import React from 'react'
import { connect } from 'react-redux'
import { MenuItem } from '@blueprintjs/core'
import { MultiSelect } from '@blueprintjs/labs'

import { getAvailableFrames, updateSelectedFrames } from 'redux/actions'

import type { State } from 'redux/state'

type OwnProps = { id: string }
function mapStateToProps({ filtersById, ui }: State, { id }: OwnProps) {
  const availableFrames = Object.keys(filtersById[id].availableFrames || {})
  const availableFramesLoaded = !!filtersById[id].availableFrames
  const { selectedFrames } = ui
  return { id, availableFrames, availableFramesLoaded, selectedFrames }
}

type Props = OwnProps & {
  id: string,
  availableFrames: string[],
  availableFramesLoaded: boolean,
  selectedFrames: string[],
  getAvailableFrames: typeof getAvailableFrames,
  updateSelectedFrames: typeof updateSelectedFrames
}
class FrameChooser extends React.Component<Props> {
  componentDidMount() {
    this.props.getAvailableFrames(this.props.id)
  }

  render() {
    const {
      availableFrames,
      availableFramesLoaded,
      selectedFrames,
      updateSelectedFrames
    } = this.props
    return (
      <MultiSelect
        resetOnSelect
        className="pt-fill"
        tagInputProps={{
          leftIconName: 'media',
          inputProps: { placeholder: 'Choose frame images to include...' },
          onRemove: (_, index) =>
            updateSelectedFrames(selectedFrames.filter((_, i) => i !== index))
        }}
        popoverProps={{ popoverClassName: 'pt-minimal' }}
        items={availableFrames}
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
        tagRenderer={frame =>
          !availableFramesLoaded || availableFrames.includes(frame)
            ? frame
            : `${frame} (not found)`
        }
        onItemSelect={frame =>
          selectedFrames.indexOf(frame) < 0 &&
          updateSelectedFrames([...selectedFrames, frame])
        }
      />
    )
  }
}

export default connect(mapStateToProps, {
  getAvailableFrames,
  updateSelectedFrames
})(FrameChooser)
