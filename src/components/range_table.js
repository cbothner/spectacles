import React from 'react'

const RangeTable = ({items, name}) =>
  <div className="pt-card" style={{width: 'calc(50% - 0.5em)'}}>
    <h5>{name}</h5>
    <table className="pt-table pt-condensed" style={{width: '100%'}}>
      <thead>
        <tr>
          <th>Range</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => <tr>
          <td>{item.range}</td>
          <td>{item.value}</td>
        </tr>)}
      </tbody>
    </table>
  </div>

export default RangeTable
