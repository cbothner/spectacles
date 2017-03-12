import React from 'react'

import RangeTablePrintout from './range_table_printout.js'
import SpectrophotometerChart from './spectrophotometer_chart.js'

const MultiFilterPrintout = ({filters}) => <div style={{margin: '1.5em 2em'}}>
  {filters.map( filter => <div className="pt-card" style={{marginBottom: '1em'}}>
    <div style={{display: 'flex', justifyContent: 'space-between'}}>
      <div>
        <p>
          <strong style={{fontSize: 20, marginRight: '0.5em'}}>{filter.name}</strong>
          <span className="pt-text-muted">${filter.basePrice} per pair</span>
        </p>
      </div>
      <div style={{textAlign: 'right'}}>
        <p>
          EN207 {filter.ce ? 'Certified' : 'Pending'}
          <br />
          Luminous transmittance: {filter.vlt}% {filter.color}
        </p>
      </div>
    </div>

    <div style={{display: "flex", alignItems: 'flex-start'}}>
      <RangeTablePrintout title="CE Rating" name="L-Ratings" items={filter.lRatings} first Header="h5"/>
      <RangeTablePrintout title="Optical Density" name="ODs" items={filter.ods} Header="h5" />
      <div style={{flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', marginLeft: '1em'}}>
        <h5>Spectrophotometer Data</h5>
        <SpectrophotometerChart data={filter.spectrophotometerData} forPrint center width={290} height={140} />
      </div>
    </div>
  </div>)}
</div>

export default MultiFilterPrintout
