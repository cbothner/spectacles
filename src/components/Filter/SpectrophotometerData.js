/**
 * @providesModule SpectrophotometerData
 * @flow
 */
import React from 'react'
import { connect } from 'react-redux'

import { NonIdealState } from '@blueprintjs/core'

import SpectrophotometerChart from './SpectrophotometerChart'
import { updateFilter } from 'redux/actions'

import type { Dispatch } from 'redux/actions'
import type { State, SpectrophotometerReading } from 'redux/state'

type OwnProps = { id: string }
const mapStateToProps = ({ filtersById }: State, { id }: OwnProps) => {
  return {
    data: filtersById[id].spectrophotometerData
  }
}

const mapDispatchToProps = (dispatch: Dispatch, ownProps: OwnProps) => {
  return {
    onChange: (e: SyntheticInputEvent<*>) => {
      dispatch(
        updateFilter(ownProps.id, {
          spectrophotometerData: convertCSVToData(e.target.value)
        })
      )
    }
  }
}

type Props = {
  data: SpectrophotometerReading[],
  onChange: (SyntheticInputEvent<*>) => Promise<mixed>
}
const SpectrophotometerData = ({ data, onChange }: Props) => (
  <div className="pt-card" style={{ marginTop: '1em' }}>
    <h5>Spectrophotometer Data</h5>
    <div style={{ display: 'flex' }}>
      <textarea
        style={{ flex: 1, height: 200 }}
        value={convertDataToCSV(data)}
        onChange={onChange}
      />
      <div
        style={{
          flex: 3,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}
      >
        {data ? (
          <SpectrophotometerChart data={data} />
        ) : (
          <NonIdealState
            title="No Data"
            description="Paste wavelength, OD, and %T data from Excel."
            visual="timeline-line-chart"
          />
        )}
      </div>
    </div>
  </div>
)

export default connect(mapStateToProps, mapDispatchToProps)(
  SpectrophotometerData
)

function convertDataToCSV(data = []) {
  return data
    .map(row => `${row.wavelength},${row.od},${row.transmittance}`)
    .join('\n')
}

function convertCSVToData(csv: string): SpectrophotometerReading[] {
  return csv
    .split('\n')
    .map(row => {
      let x = row.split(/[, \t]+/)
      return x.length === 3 && !isNaN(x[0])
        ? {
            wavelength: parseInt(x[0], 10),
            od: parseFloat(x[1]),
            transmittance: parseFloat(x[2])
          }
        : null
    })
    .filter(Boolean)
}
