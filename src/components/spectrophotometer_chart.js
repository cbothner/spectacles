import React from 'react';
import {LineChart, XAxis, YAxis, Legend, Line, Tooltip} from 'recharts';

function SpectrophotometerChart(
  {data, forPrint, embedded, center, width = 500, height = 200},
) {
  const margins = embedded
    ? {top: 0, right: 0, bottom: 10, left: 0}
    : {
        top: center ? 15 : 5,
        right: -20,
        bottom: -5,
        left: center ? -25 : -10,
      };
  return (
    <LineChart data={data} width={width} height={height} margin={margins}>

      <XAxis
        dataKey="wavelength"
        type="number"
        domain={['dataMin', 'dataMax']}
        tickCount={16}
      />
      <YAxis />
      <YAxis yAxisId={1} orientation="right" tickFormatter={x => `${x}%`} />
      <Legend wrapperStyle={forPrint ? {bottom: 5} : {}} />
      <Tooltip />

      <Line
        name="OD"
        dataKey="od"
        dot={false}
        type="basis"
        stroke="#137CBD"
        strokeWidth="2"
        isAnimationActive={!forPrint}
      />

      <Line
        name="%T"
        dataKey="transmittance"
        yAxisId={1}
        dot={false}
        type="basis"
        stroke="#DB3737"
        strokeDasharray="4, 4"
        isAnimationActive={!forPrint}
      />

    </LineChart>
  );
}

export default SpectrophotometerChart;
