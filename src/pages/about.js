/* eslint-disable react/prop-types */
import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'

import Layout from '../components/Layout'
import SEO from '../components/SEO'

import { subtitle } from '../assets/css/about.module.css'

export default function About({ data: { file } }) {
  return (
    <Layout>
      <h1>About me</h1>

      <Img
        fluid={file.childImageSharp.fluid}
        objectFit="cover"
        objectPosition="50% 50%"
        alt="About me page cover."
      />

      <h3 className={subtitle}>
        Hello, I&apos;m&nbsp;
        <strong>Marco Araujo</strong>
      </h3>

      <div>
        <p>
          I'm a computer engineer from Brazil. With over 4 years of experience
          working as a software developer, I have worked on lots of projects and
          my main areas of expertise include Javascript, Node.js, Firebase,
          React, and Vue. Additionally, I have worked on projects using C/C++
          and Python.
        </p>

        <p>
          I am passionate about technology and the tech market in general. I
          like to spend some time with small robotics and electronics projects
          in my free time, mostly using Arduino. I'm very interested in Machine
          Learning and AI as well.
        </p>

        <p>
          Through this blog, I hope to share some experiences, knowledge, and
          insights with the community, so I invite you to join me on this
          journey!
        </p>
      </div>
    </Layout>
  )
}

export const Head = () => <SEO title="About me" />

export const pageQuery = graphql`
  query AboutPageImage {
    file(relativePath: { eq: "about.png" }) {
      childImageSharp {
        fluid(maxWidth: 1110, maxHeight: 390) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`
