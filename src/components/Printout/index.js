/**
 * @providesModule Printout
 * @flow
 */

import * as React from 'react'

const Printout = ({ children }: { children: React.Node }) => (
  <div className="page">
    <header style={styles.header}>
      <div style={styles.colorBar} />
      <div style={styles.headerInfo}>
        <img style={{ height: 40 }} src={require('lasershields.svg')} />
        <div style={styles.address}>
          4975 Technical Drive, Milford, MI 48381 USA
          <br />
          +1 (800) 521-9746 | +1 (734) 769-5565
          <br />
          noirlaser.com
        </div>
      </div>
    </header>
    <main>{children}</main>
  </div>
)

export default Printout

export { default as SchedulePrintout } from './SchedulePrintout'
export { default as SingleFilterPrintout } from './SingleFilterPrintout'

const styles = {
  header: {
    backgroundColor: '#fff',
    borderBottom: '1px solid #CED9E0'
  },

  colorBar: {
    backgroundImage: 'url(/laser-strip.png)',
    backgroundSize: 'contain',
    width: '100%',
    height: 5
  },

  headerInfo: {
    margin: '1.5em 10em',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  address: {
    textAlign: 'right'
  }
}
