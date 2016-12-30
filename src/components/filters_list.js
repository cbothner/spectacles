import React from 'react'
import { connect } from 'react-redux'
import Match from 'react-router/Match'
import Link from 'react-router/Link'

import Filter from './filter.js'

const mapStateToProps = (state) => {
  return {
    filters: Object.values(state.filtersByName),
  }
}

const FiltersList = ({ filters, pathname }) => {
  return <article style={{marginTop: "2em"}}>
    <h4>Filter specifications</h4>
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
        {filters.map((filter) => <FiltersListEntry {...filter} />)}
      </tbody>
    </table>

    <Match pattern={`${pathname}/:filterName`} component={Filter} />
  </article>
}

FiltersList.propTypes = {
  filters: React.PropTypes.array
}

export default connect(mapStateToProps)(FiltersList)




const FiltersListEntry = ({name, ce, vlt, color, basePrice, ods, lRatings}) => {
  return <Link to={`/filters/${name}`}>{
    ({ onClick}) =>
      <tr onClick={onClick}>
        <td><span className="pt-tag pt-minimal">{name}</span></td>
        <td>{ce ? "Certified" : "Pending"}</td>
        <td>{`${vlt}% ${color}`}</td>
        <td>{`$${basePrice}`}</td>
        <td><RangeList items={ods} /></td>
        <td><RangeList items={lRatings} /></td>
      </tr>
  }</Link>
}

const RangeList = ({ items }) => {
  return <p style={{maxWidth: "30em"}} className="pt-text-overflow-ellipsis">
    {items.map((item, i) => {
      return <span>
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

