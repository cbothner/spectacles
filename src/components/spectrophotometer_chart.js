import React from 'react'
import { LineChart, XAxis, YAxis, Legend, Line, Tooltip } from 'recharts'

const SpectrophotometerChart = ({data, forPrint, center, width=500, height=200}) =>
  <LineChart data={data}
    width={width} height={height}
    margin={{top: center ? 15 : 5, right: -30, bottom: -5, left: center ? -30 : -10}}>
    <XAxis dataKey="wavelength" type="number" domain={['dataMin', 'dataMax']} tickCount={16} />
    <YAxis />
    <YAxis yAxisId={1} orientation="right" />
    <Legend />
    <Tooltip />
    <Line name="OD" dataKey="od" dot={false} type="basis" stroke="#137CBD" strokeWidth="2" isAnimationActive={!forPrint} />
    <Line name="%T" dataKey="percentT" yAxisId={1} dot={false} type="basis" stroke="#DB3737" strokeDasharray="4, 4" isAnimationActive={!forPrint} />
  </LineChart>

export default SpectrophotometerChart
