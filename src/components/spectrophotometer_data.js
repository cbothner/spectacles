import React from 'react'
import { connect } from 'react-redux'

import { LineChart, XAxis, YAxis, Legend, Line } from 'recharts'

const mapStateToProps = (state, ownProps) => {
  return {
    data: state.filtersByName[ownProps.name].spectrophotometerData
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {}
}

const SpectrophotometerData = ({data}) =>
  <div className="pt-card" style={{marginTop: '1em'}}>
    <h5>Spectrophotometer Data</h5>
    <div style={{display: 'flex'}}>
      <textarea style={{flex: 1, height: 200}} value={convertDataToCSV(data)} />
      <div style={{flex: 3}}>
        <LineChart data={data} width={500} height={200}
          margin={{top: 5, right: -30, bottom: -5, left: -10}}
        >
          <XAxis dataKey="wavelength" />
          <YAxis />
          <YAxis yAxisId={1} orientation="right" />
          <Legend />
          <Line name="OD" dataKey="od" dot={false} type="basis" stroke="#137CBD" />
          <Line name="%T" dataKey="percentT" yAxisId={1} dot={false} type="basis" stroke="#DB3737" />
        </LineChart>
      </div>
    </div>
  </div>

export default connect(mapStateToProps, mapDispatchToProps)(SpectrophotometerData)


function convertDataToCSV(data) {
  return data.map((row) => `${row.wavelength},${row.od},${row.percentT}`).join('\n')
}
