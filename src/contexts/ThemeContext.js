/* eslint-disable react/prop-types */
import React, { useState, useEffect, createContext } from 'react'

export const ThemeContext = createContext({
  colorMode: 'light',
  setColorMode: () => {},
})

export const ThemeProvider = ({ children }) => {
  const [colorMode, rawSetColorMode] = useState(undefined)

  useEffect(() => {
    const root = window.document.documentElement

    const initialColorValue = root.style.getPropertyValue(
      '--initial-color-mode'
    )

    rawSetColorMode(initialColorValue)
  }, [])

  const setColorMode = value => {
    const root = window.document.documentElement

    rawSetColorMode(value)
    localStorage.setItem('color-mode', value)

    root.style.setProperty(
      '--background-color',
      `var(--${value}-background-color)`
    )

    root.style.setProperty(
      '--background-color-soft',
      `var(--${value}-background-color-soft)`
    )

    root.style.setProperty(
      '--navlink-text-color',
      `var(--${value}-navlink-text-color)`
    )

    root.style.setProperty(
      '--heading-link-color',
      `var(--${value}-heading-link-color)`
    )

    root.style.setProperty(
      '--heading-text-color',
      `var(--${value}-heading-text-color)`
    )

    root.style.setProperty(
      '--body-text-color',
      `var(--${value}-body-text-color)`
    )

    root.style.setProperty(
      '--badge-text-color',
      `var(--${value}-badge-text-color)`
    )

    root.style.setProperty(
      '--badge-border-color',
      `var(--${value}-badge-border-color)`
    )
  }

  return (
    <ThemeContext.Provider value={{ colorMode, setColorMode }}>
      {children}
    </ThemeContext.Provider>
  )
}
