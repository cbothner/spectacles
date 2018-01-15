/**
 * @providesModule FilterPrintout
 * @flow
 */

import React from 'react'

import { Button, InputGroup, Tag } from '@blueprintjs/core'

import { SpectrophotometerChart } from 'components/Filter'

import type { Filter } from 'redux/state'

const FilterPrintouts = ({ filters }: { filters: Filter[] }) => (
  <main>
    {filters.map(filter => (
      <div className="page">
        <div style={{ display: 'flex' }}>
          <div className="pt-control-group pt-vertical">
            <InputGroup
              leftIconName="flash"
              placeholder="Name"
              value={filter.name}
              rightElement={
                <Button
                  iconName={filter.ce ? 'tick' : 'time'}
                  text={filter.ce ? 'EN207 Certified' : 'EN207 Pending'}
                  className="pt-minimal"
                />
              }
            />
            <InputGroup
              leftIconName="dollar"
              placeholder="Base Price"
              value={filter.basePrice}
              type="number"
              step="0.01"
            />
            <InputGroup
              leftIconName="tint"
              placeholder="Color"
              value={filter.color}
            />
            <InputGroup
              leftIconName="resolve"
              placeholder="VLT"
              value={filter.vlt}
              type="number"
              rightElement={<Tag className="pt-minimal">%</Tag>}
            />
          </div>
          <div
            style={{
              flex: 3,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}
          >
            <SpectrophotometerChart
              forPrint
              data={filter.spectrophotometerData}
            />
          </div>
        </div>
      </div>
    ))}
  </main>
)

export default FilterPrintouts
