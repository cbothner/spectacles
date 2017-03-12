import React from 'react'

import SpectrophotometerChart from './spectrophotometer_chart.js'

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
    <Table title="CE Rating" name="L-Ratings" items={filter.lRatings} first />
    <Table title="Optical Density" name="ODs" items={filter.ods} />
  </div>

  <div style={{marginTop: '1em'}}>
    <h4>Spectrophotometer Data</h4>
    <div style={{display: 'flex', justifyContent: 'center'}}>
      <SpectrophotometerChart data={filter.spectrophotometerData} printout />
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

const Table = ({title, name, items, first}) =>
  <div style={{flex: 1, marginLeft: first || '1em', marginRight: first && '1em'}}>
    <h4>{title}</h4>
    <table className="pt-table pt-condensed" style={{width: '100%'}}>
      <thead> <tr>
          <th>Wavelength (nm)</th>
          <th style={{width: '7em'}}>{name}</th>
      </tr> </thead>
      <tbody>
        { items.map( row => <tr key={row.range}>
          <td>{row.range}</td> <td>{row.value}</td>
        </tr>) }
      </tbody>
    </table>
  </div>
