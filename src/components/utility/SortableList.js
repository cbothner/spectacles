import React from 'react'
import { Button, Intent } from '@blueprintjs/core'
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
  arrayMove
} from 'react-sortable-hoc'

import { update, push, remove } from 'shared/immutableArray'

const Handle = SortableHandle(() => (
  <span
    className="pt-button pt-icon-drag-handle-horizontal"
    style={{ paddingLeft: 7 }}
  />
))

const Item = SortableElement(
  ({ item, index, children, onChangeItem, onRemove }) => (
    <div className="pt-control-group" style={{ marginBottom: '0.5em' }}>
      <Handle />

      {children({ item, index, onChangeItem })}

      <Button intent={Intent.DANGER} iconName="remove" onClick={onRemove} />
    </div>
  )
)

const Container = SortableContainer(({ items, children, onChange }) => (
  <div>
    {items.map((item, i) => (
      <Item
        key={i}
        index={i}
        item={item}
        children={children}
        onChangeItem={attrs => onChange(update(items, i, attrs))}
        onRemove={() => onChange(remove(items, i))}
      />
    ))}
  </div>
))

const SortableList = props => (
  <Container
    {...props}
    onSortEnd={({ oldIndex, newIndex }) =>
      props.onChange(arrayMove(props.items, oldIndex, newIndex))
    }
    useDragHandle={true}
    transitionDuration={100}
    helperClass="sortable-helper"
  />
)

export default SortableList
