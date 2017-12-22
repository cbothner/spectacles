import React from 'react'

import { SpectrophotometerChart } from 'components/Filter'
import RangeTablePrintout from './RangeTablePrintout'

const SingleFilterPrintout = ({ filter, selectedFrames }) => {
  const frameImages = selectedFrames
    .map(frame => ({ image: filter.availableFrames[frame], frame }))
    .filter(x => x.image)
  return (
    <div style={{ margin: '1.5em 10em' }}>
      <div style={styles.titleRow}>
        <div>
          <p style={{ fontSize: 20, marginBottom: '0.25em' }}>
            Product Specification
          </p>
          <h1 style={{ fontWeight: 700 }}>{filter.name}</h1>
        </div>
        <div style={{ textAlign: 'right' }}>
          <p>
            EN207 {filter.ce ? 'Certified' : 'Pending'}
            <br />
            Luminous transmittance: {filter.vlt}% {filter.color}
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', marginTop: '2em' }}>
        <RangeTablePrintout
          first
          title="CE Rating"
          name="L-Ratings"
          items={filter.lRatings}
        />
        <RangeTablePrintout
          title="Optical Density"
          name="ODs"
          items={filter.ods}
        />
      </div>

      <div style={{ marginTop: '1em' }}>
        <h4>Spectrophotometer Data</h4>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <SpectrophotometerChart
            data={filter.spectrophotometerData}
            forPrint
            center
            width={600}
            height={225}
          />
        </div>
      </div>
      {frameImages.length > 0 && (
        <div
          style={{
            margin: '2em -4em',
            border: '1px solid rgb(206, 217, 224)',
            background: 'white',
            padding: 10
          }}
        >
          <div
            style={{
              display: 'grid',
              gridGap: 20,
              gridTemplateColumns: `repeat(${numberOfColumns(
                frameImages.length
              )}, 1fr)`
            }}
          >
            {frameImages.map(({ frame, image }) => (
              <div style={{ alignSelf: 'end' }}>
                <img
                  key={frame}
                  src={image}
                  style={{
                    width: '100%',
                    height: 'auto',
                    maxHeight: '100px',
                    objectFit: 'contain'
                  }}
                />
                <figcaption
                  style={{
                    textAlign: 'center',
                    marginTop: '0.5em'
                  }}
                >
                  {`#${frame.toUpperCase()}`}
                </figcaption>
              </div>
            ))}
          </div>
          <figcaption
            style={{
              textAlign: 'center',
              marginTop: '0.5em'
            }}
          >
            See our website for all frame options
          </figcaption>
        </div>
      )}
    </div>
  )
}

export default SingleFilterPrintout

const styles = {
  titleRow: {
    marginTop: '2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  }
}

const numberOfColumns = numberOfFrames =>
  numberOfFrames > 4
    ? numberOfFrames > 10
      ? Math.ceil(numberOfFrames / 3)
      : Math.ceil(numberOfFrames / 2)
    : numberOfFrames
