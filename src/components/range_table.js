import React from 'react'
import { connect } from 'react-redux'

import { Button, Intent } from '@blueprintjs/core'

import { updateFilter } from '../actions.js'

import { update, push, remove } from '../immutable_array.js'

const mapStateToProps = (state, ownProps) => {
  return {
    items: state.filtersById[ownProps.filterId][ownProps.itemsKey],
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  let {filterId, itemsKey} = ownProps
  return {
    setItems: (data) => dispatch(updateFilter(filterId, {[itemsKey]: data}))
  } }

const RangeTable = ({items = [], name, setItems}) =>
  <div className="pt-card" style={{width: 'calc(50% - 0.5em)'}}>
    <h5>{name}</h5>
    {items.map((item, i) => <div key={i} className='pt-control-group' style={{marginBottom: '0.5em'}}>
      <Button iconName="drag-handle-horizontal" style={{cursor: '-webkit-grab'}} />
      <input className="pt-input" placeholder='Range' value={item.range} style={{width: 177}}
        onChange={(e) => setItems(update(items, i, {range: e.currentTarget.value}))}/>
      <input className="pt-input" placeholder='Value' value={item.value} style={{width: 80}}
        onChange={(e) => setItems(update(items, i, {value: e.currentTarget.value}))}/>
      <Button intent={Intent.DANGER} iconName="remove" onClick={() => setItems(remove(items, i))} />
    </div>)}
    <Button intent={Intent.SUCCESS} iconName="add" text="Add"
      onClick={() => setItems(push(items, {range: '', value: ''}))}
      />
  </div>

export default connect(mapStateToProps, mapDispatchToProps)(RangeTable)


