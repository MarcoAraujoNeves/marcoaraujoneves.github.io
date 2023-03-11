import React from 'react'

import Footer from './Footer'
import Navbar from './Navbar'

import '../assets/css/base.css'

// eslint-disable-next-line react/prop-types
const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  )
}

export default Layout
