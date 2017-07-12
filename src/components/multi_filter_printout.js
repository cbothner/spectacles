import React from 'react'

import RangeTablePrintout from './range_table_printout.js'
import SpectrophotometerChart from './spectrophotometer_chart.js'

import { Colors } from '@blueprintjs/core'

const MultiFilterPrintout = ({ suggestions, filtersById }) => {
  return (
    <div style={{ margin: '1.5em 2em' }}>
      {suggestions.map(suggestion => {
        const filter = filtersById[suggestion.filterId]
        return (
          <div className="pt-card" style={{ marginBottom: '1em' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <p>
                  <strong style={{ fontSize: 20, marginRight: '0.5em' }}>
                    {filter.name}
                  </strong>
                  <span
                    className="pt-text-muted"
                    style={{
                      textDecoration: suggestion.specialPrice
                        ? 'line-through'
                        : 'none'
                    }}
                  >
                    ${filter.basePrice} per pair
                  </span>{' '}
                  {suggestion.specialPrice &&
                    <span style={{ color: Colors.GREEN1 }}>
                      Your price: ${suggestion.specialPrice}
                    </span>}
                </p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p>
                  EN207 {filter.ce ? 'Certified' : 'Pending'}
                  <br />
                  Luminous transmittance: {filter.vlt}% {filter.color}
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start' }}>
              <RangeTablePrintout
                title="CE Rating"
                name="L-Ratings"
                items={filter.lRatings}
                first
                Header="h5"
              />
              <RangeTablePrintout
                title="Optical Density"
                name="ODs"
                items={filter.ods}
                Header="h5"
              />
              <div
                style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  marginLeft: '1em',
                  marginTop: '-1em',
                  marginBottom: '-1em'
                }}
              >
                <SpectrophotometerChart
                  data={filter.spectrophotometerData}
                  forPrint
                  center
                  width={290}
                  height={140}
                />
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default MultiFilterPrintout
