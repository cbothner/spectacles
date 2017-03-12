import React from 'react'

import SpectrophotometerChart from './spectrophotometer_chart.js'
import RangeTablePrintout from './range_table_printout.js'

const SingleFilterPrintout = ({filter}) => <div style={{margin: '1.5em 10em'}}>
  <div style={styles.titleRow}>
    <div>
      <p style={{fontSize: 20, marginBottom: '0.25em'}}>Product Specification</p>
      <h1 style={{fontWeight: 700}}>{filter.name}</h1>
    </div>
    <div style={{textAlign: 'right'}}>
      <p>
        EN207 {filter.ce ? 'Certified' : 'Pending'}
        <br />
        Luminous transmittance: {filter.vlt}% {filter.color}
      </p>
    </div>
  </div>

  <div style={{display: 'flex', marginTop: '2em'}}>
    <RangeTablePrintout title="CE Rating" name="L-Ratings" items={filter.lRatings} first />
    <RangeTablePrintout title="Optical Density" name="ODs" items={filter.ods} />
  </div>

  <div style={{marginTop: '1em'}}>
    <h4>Spectrophotometer Data</h4>
    <div style={{display: 'flex', justifyContent: 'center'}}>
      <SpectrophotometerChart data={filter.spectrophotometerData} forPrint center width={600} height={225} />
    </div>
  </div>
</div>

export default SingleFilterPrintout

const styles = {
  titleRow: {
    marginTop: '2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
}
