import React from 'react';
import { connect } from 'react-redux';

import { Button, Intent } from '@blueprintjs/core';

import SortableList from './sortable_list.js';

import { updateFilter } from '../actions.js';

import { push } from '../immutable_array.js';

function fixRangeTypography(range) {
  return range.replace(/([^Ee])-/g, '$1–');
}

function mapStateToProps({ filtersById }, { filterId, itemsKey }) {
  return {
    items: filtersById[filterId][itemsKey]
  };
}

function mapDispatchToProps(dispatch, { filterId, itemsKey }) {
  return {
    setItems: data => dispatch(updateFilter(filterId, { [itemsKey]: data }))
  };
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  const { items } = stateProps;
  const { setItems } = dispatchProps;
  return {
    ...ownProps,
    ...stateProps,
    ...dispatchProps
  };
}

function RangeTable({ items = [], name, setItems }) {
  return (
    <div className="pt-card" style={{ width: 'calc(50% - 0.5em)' }}>

      <h5>{name}</h5>

      <SortableList items={items} onChange={setItems}>
        {({ item, onChangeItem }) => (
          <span>
            <input
              className="pt-input"
              placeholder="Range"
              value={item.range}
              style={{ width: 176 }}
              onChange={e => {
                const range = fixRangeTypography(e.currentTarget.value);
                onChangeItem({ range });
              }}
            />

            <input
              className="pt-input"
              placeholder="Value"
              value={item.value}
              style={{ width: 80 }}
              onChange={e => {
                onChangeItem({ value: e.currentTarget.value });
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
  );
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(
  RangeTable
);
