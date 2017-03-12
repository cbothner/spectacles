import React from 'react'

const Printout = ({children}) => <div className="page">
  <header style={styles.header}>
    <div style={styles.colorBar} />
    <div style={styles.headerInfo}>
      <img style={{height: '4em'}} src="http://noirlaser.com/media/images/default/logo.png" />
      <div style={styles.address}>
        PO Box 159, South Lyon, MI 48178
        <br />
        +1 (800) 521-9746  | +1 (734) 769-5565
        <br />
        noirlaser.com
      </div>
    </div>
  </header>
  <main>
    {children}
  </main>
</div>

export default Printout

const styles = {
  header: {
    backgroundColor: '#fff',
    borderBottom: '1px solid #CED9E0',
  },

  colorBar: {
    backgroundImage: 'url(http://noirlaser.com/skin/frontend/lookbook/noirlaser/images/laser-strip.png)',
    backgroundSize: 'contain',
    width: '100%',
    height: 5,
  },

  headerInfo: {
    margin: '1.5em 10em',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  address: {
    textAlign: 'right',
  },
}
