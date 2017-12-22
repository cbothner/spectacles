import React from 'react'
import MultiFilterPrintout from './multi_filter_printout.js'

const SchedulePrintout = ({ schedule, filtersById }) =>
  <div>
    <div style={{ margin: '1.5em 10em' }}>
      <div style={{ marginTop: '1rem' }}>
        <p style={{ fontSize: 20, marginBottom: '0.25em' }}>
          Specifications Schedule
        </p>
        <h2 style={{ fontWeight: 700 }}>
          {schedule.name}
        </h2>
      </div>
    </div>
    <MultiFilterPrintout
      suggestions={schedule.suggestions}
      filtersById={filtersById}
    />
  </div>

export default SchedulePrintout
