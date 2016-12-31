import React from 'react'
import { connect } from 'react-redux'

import { NonIdealState } from '@blueprintjs/core'
import { LineChart, XAxis, YAxis, Legend, Line } from 'recharts'

import { updateFilter } from '../actions.js'

const mapStateToProps = (state, ownProps) => {
  return {
    data: state.filtersById[ownProps.id].spectrophotometerData,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onChange: (e) => {
      dispatch(updateFilter(ownProps.id, {
        spectrophotometerData: convertCSVToData(e.currentTarget.value)
      }))
    }
  }
}

const SpectrophotometerData = ({data, onChange}) =>
  <div className="pt-card" style={{marginTop: '1em'}}>
    <h5>Spectrophotometer Data</h5>
    <div style={{display: 'flex'}}>
      <textarea style={{flex: 1, height: 200}} value={convertDataToCSV(data)} onChange={onChange} />
      <div style={{flex: 3, display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
        { data
          ? <LineChart data={data} width={500} height={200}
              margin={{top: 5, right: -30, bottom: -5, left: -10}}>
              <XAxis dataKey="wavelength" />
              <YAxis />
              <YAxis yAxisId={1} orientation="right" />
              <Legend />
              <Line name="%T" dataKey="percentT" yAxisId={1} dot={false} type="basis" stroke="#DB3737" strokeDasharray="4, 4" />
              <Line name="OD" dataKey="od" dot={false} type="basis" stroke="#137CBD" strokeWidth="2" />
            </LineChart>
          : <NonIdealState
              title="No Data"
              description="Paste wavelength, OD, and %T data from Excel."
              visual="timeline-line-chart" />
        }
      </div>
    </div>
  </div>

export default connect(mapStateToProps, mapDispatchToProps)(SpectrophotometerData)


function convertDataToCSV(data = []) {
  return data.map((row) => `${row.wavelength},${row.od},${row.percentT}`).join('\n')
}

function convertCSVToData(csv) {
  return csv.split('\n').map((row) => {
    let x = row.split(/[, \t]+/)
    return x.length === 3 && !isNaN(x[0])
      ? { wavelength: parseInt(x[0], 10), od: parseFloat(x[1]), percentT: parseFloat(x[2]) }
      : null
  }).filter(x => x)
}
