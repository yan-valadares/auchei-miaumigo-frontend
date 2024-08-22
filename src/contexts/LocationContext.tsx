'use client'

import React, { createContext, ReactNode, useEffect, useState } from 'react'

import { ibgeAPI } from '@/lib/axios'

interface State {
  id: number
  sigla: string
  nome: string
}

interface City {
  id: number
  nome: string
}

interface LocationType {
  states: State[]
  cities: City[]
  selectedState: string
  setSelectedState: (state: string) => void
}

const LocationContext = createContext({} as LocationType)

interface LocationProviderProps {
  children: ReactNode
}

export function LocationProvider({ children }: LocationProviderProps) {
  const [states, setStates] = useState([])
  const [selectedState, setSelectedState] = useState('')
  const [cities, setCities] = useState([])

  useEffect(() => {
    ibgeAPI.get('/').then((response) => {
      const sortedStates = response.data.sort((a: State, b: State) =>
        a.sigla.localeCompare(b.sigla),
      )
      setStates(sortedStates)
    })
  }, [])

  useEffect(() => {
    if (selectedState) {
      ibgeAPI.get(`/${selectedState}/municipios`).then((response) => {
        setCities(response.data)
      })
    }
  }, [selectedState])

  return (
    <LocationContext.Provider
      value={{ states, cities, selectedState, setSelectedState }}
    >
      {children}
    </LocationContext.Provider>
  )
}

export default LocationContext
