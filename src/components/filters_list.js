import React from 'react'
import { connect } from 'react-redux'
import Match from 'react-router/Match'
import Link from 'react-router/Link'

import { Button, Intent } from '@blueprintjs/core'

import Filter from './filter.js'
import { addFilter } from '../actions.js'

const mapStateToProps = (state) => {
  return {
    filters: Object.values(state.filtersById).sort((a, b) => a.name > b.name),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAddFilter: () => dispatch(addFilter())
  }
}

const FiltersList = ({ filters = [], pathname, onAddFilter }) => {
  return <article style={{marginTop: "2em"}}>
    <div style={{display: 'flex', justifyContent: 'space-between'}}>
      <h4>Filter specifications</h4>
      <Button intent={Intent.SUCCESS} iconName="add" text="New Filter" onClick={onAddFilter} />
    </div>
    <table className="pt-table pt-interactive" style={{width: '100%'}}>
      <thead>
        <tr>
          <th>Name</th>
          <th>CE</th>
          <th>VLT</th>
          <th>Price</th>
          <th>OD Ranges</th>
          <th>L-Ratings</th>
        </tr>
      </thead>
      <tbody>
        {filters.map((filter) => <FiltersListEntry key={filter.name} {...filter} />)}
      </tbody>
    </table>

    <Match pattern={`${pathname}/:filterId`} component={Filter} />
  </article>
}

FiltersList.propTypes = {
  filters: React.PropTypes.array
}

export default connect(mapStateToProps, mapDispatchToProps)(FiltersList)




const FiltersListEntry = ({id, name, ce, vlt, color, basePrice, ods, lRatings}) => {
  return <Link to={`/filters/${id}`}>{
    ({ onClick}) =>
      <tr onClick={onClick}>
        <td><span className="pt-tag pt-minimal">{name}</span></td>
        <td>{ce ? "Certified" : "Pending"}</td>
        <td>{`${vlt}% ${color}`}</td>
        <td>{`$${parseFloat(basePrice) % 1 ? parseFloat(basePrice).toFixed(2) : parseInt(basePrice, 10)}`}</td>
        <td><RangeList items={ods} /></td>
        <td><RangeList items={lRatings} /></td>
      </tr>
  }</Link>
}

const RangeList = ({ items = [] }) => {
  return <p style={{maxWidth: '30em'}} className="pt-text-overflow-ellipsis">
    {items.map((item, i) => {
      return <span key={i}>
        {i === 0 ? "" : <span className="pt-text-muted"> | </span>}
        {item.range} <strong>{item.value}</strong>
      </span>
      })
    }
  </p>
}

RangeList.propTypes = {
  items: React.PropTypes.array
}

