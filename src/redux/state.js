/**
 * @providesModule State
 * @flow
 */

export type State = {
  token: TokenState,
  filtersById: FiltersState,
  schedulesById: SchedulesState,
  ui: UiState
}

export type TokenState = string | null
export type FiltersState = { [Key]: Filter }
export type SchedulesState = { [Key]: Schedule }
export type UiState = {
  selectedFrames: string[]
}

export type Filter = {
  availableFrames?: { [string]: string },
  basePrice: string,
  ce: boolean,
  color: string,
  createdAt: Date,
  id: Key,
  lRatings: RangeList,
  name: string,
  ods: RangeList,
  spectrophotometerData: SpectrophotometerReading[],
  updatedAt: Date,
  url: string,
  vlt: number
}

export type RangeList = Array<{ range: string, value: string }>

export type Schedule = {
  createdAt: Date,
  id: Key,
  name: string,
  suggestions: Suggestion[],
  updatedAt: Date,
  url: string
}

export type SpectrophotometerReading = {
  od: number,
  transmittance: number,
  wavelength: number
}

export type Suggestion = {
  filterId: Key,
  specialPrice: string
}

export type Key = string
