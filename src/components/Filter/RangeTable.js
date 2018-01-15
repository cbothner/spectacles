/**
 * @providesModule RangeTable
 * @flow
 */

import React from 'react'
import { connect } from 'react-redux'

import { Button, Intent } from '@blueprintjs/core'

import SortableList from 'components/utility/SortableList'

import { updateFilter } from 'redux/actions'
import { push } from 'shared/immutableArray'

import type { Dispatch } from 'redux/actions'
import type { State, RangeList } from 'redux/state'

function fixRangeTypography(range: string) {
  return range.replace(/([^Ee])-/g, '$1–')
}

type OwnProps = { name: string, filterId: string, itemsKey: 'lRatings' | 'ods' }
function mapStateToProps(
  { filtersById }: State,
  { filterId, itemsKey }: OwnProps
) {
  return {
    items: filtersById[filterId][itemsKey]
  }
}

function mapDispatchToProps(
  dispatch: Dispatch,
  { filterId, itemsKey }: OwnProps
) {
  return {
    setItems: (data: RangeList) =>
      dispatch(updateFilter(filterId, { [itemsKey]: data }))
  }
}

type Props = OwnProps & { items: RangeList } & {
  setItems: RangeList => Promise<mixed>
}
function RangeTable({ items = [], name, setItems }: Props) {
  return (
    <div className="pt-card" style={{ width: 'calc(50% - 0.5em)' }}>
      <h5>{name}</h5>

      <SortableList items={items} onChange={setItems}>
        {({ item, onChangeItem }) => (
          <span style={{ display: 'flex' }}>
            <input
              className="pt-input"
              placeholder="Range"
              value={item.range}
              style={{ width: 176 }}
              onChange={e => {
                const range = fixRangeTypography(e.currentTarget.value)
                onChangeItem({ range })
              }}
            />

            <input
              className="pt-input"
              placeholder="Value"
              value={item.value}
              style={{ width: 80 }}
              onChange={e => {
                onChangeItem({ value: e.currentTarget.value })
              }}
            />
          </span>
        )}
      </SortableList>

      <Button
        intent={Intent.SUCCESS}
        iconName="add"
        text="Add"
        onClick={() => setItems(push(items, { range: '', value: '' }))}
      />
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(RangeTable)
