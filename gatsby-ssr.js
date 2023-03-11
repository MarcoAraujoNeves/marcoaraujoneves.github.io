/* eslint-disable no-undef */
import React from 'react'

const ThemeScriptTag = () => {
  const codeToRunOnClient = `
(function() {
  let colorMode = 'light'

  const persistedColorPreference = window.localStorage.getItem('color-mode')
  const hasPersistedPreference = typeof persistedColorPreference === 'string'
  
  if (hasPersistedPreference) {
    colorMode = persistedColorPreference
  }

  const mql = window.matchMedia('(prefers-color-scheme: dark)')
  const hasMediaQueryPreference = typeof mql.matches === 'boolean'

  if (!hasPersistedPreference && hasMediaQueryPreference) {
    colorMode = mql.matches ? 'dark' : 'light'
  }
  
  const root = document.documentElement
  root.style.setProperty(
    '--background-color',
    'var(--' + colorMode + '-background-color)'
  )

  root.style.setProperty(
    '--background-color-soft',
    'var(--' + colorMode + '-background-color-soft)'
  )

  root.style.setProperty(
    '--navlink-text-color',
    'var(--' + colorMode + '-navlink-text-color)'
  )

  root.style.setProperty(
    '--heading-link-color',
    'var(--' + colorMode + '-heading-link-color)'
  )

  root.style.setProperty(
    '--heading-text-color',
    'var(--' + colorMode + '-heading-text-color)'
  )

  root.style.setProperty(
    '--body-text-color',
    'var(--' + colorMode + '-body-text-color)'
  )

  root.style.setProperty(
    '--badge-text-color',
    'var(--' + colorMode + '-badge-text-color)'
  )

  root.style.setProperty(
    '--badge-border-color',
    'var(--' + colorMode + '-badge-border-color)'
  )

  root.style.setProperty('--initial-color-mode', colorMode);
})()`
  // eslint-disable-next-line react/no-danger
  return <script dangerouslySetInnerHTML={{ __html: codeToRunOnClient }} />
}

export const onRenderBody = ({ setPreBodyComponents }) => {
  setPreBodyComponents(<ThemeScriptTag />)
}
