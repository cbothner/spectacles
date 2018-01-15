/**
 * @providesModule RangeTablePrintout
 * @flow
 */

import React from 'react'

import type { RangeList } from 'redux/state'

const RangeTablePrintout = ({
  title,
  name,
  items = [],
  first,
  Header = 'h4'
}: {
  title: string,
  name: string,
  items: RangeList,
  first?: boolean,
  Header: string
}) => (
  <div
    style={{ flex: 1, marginLeft: first || '1em', marginRight: first && '1em' }}
  >
    <Header>{title}</Header>
    <table className="pt-table pt-condensed" style={{ width: '100%' }}>
      <thead>
        {' '}
        <tr>
          <th>Wavelength (nm)</th>
          <th style={{ width: '7em' }}>{name}</th>
        </tr>{' '}
      </thead>
      <tbody>
        {items.length === 0 && (
          <tr>
            <td>Pending</td>
            <td />
          </tr>
        )}
        {items.map(row => (
          <tr key={row.range}>
            <td>{row.range}</td> <td>{row.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

export default RangeTablePrintout
