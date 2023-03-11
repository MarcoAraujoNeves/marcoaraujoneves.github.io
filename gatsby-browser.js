import React from 'react'

import { ThemeProvider } from './src/contexts/ThemeContext'

export const wrapRootElement = ({ element }) => (
  <ThemeProvider>{element}</ThemeProvider>
)
