/* eslint-disable react/prop-types */
import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import GithubFillIcon from 'remixicon-react/GithubFillIcon'
import LinkedinBoxFillIcon from 'remixicon-react/LinkedinBoxFillIcon'
import TwitterFillIcon from 'remixicon-react/TwitterFillIcon'

import Layout from '../components/Layout'
import SEO from '../components/SEO'

import { contactWapper } from '../assets/css/contact.module.css'

export default function Contact({ data: { file } }) {
  return (
    <Layout>
      <h1>Contact me</h1>

      <div className={contactWapper}>
        <div>
          <Img
            fluid={file.childImageSharp.fluid}
            objectFit="cover"
            objectPosition="50% 50%"
            alt="Contact me page image."
          />
        </div>

        <div>
          <p>
            Don't hesitate to contact me using the links below for any queries,
            suggestions or feedback you may have. I am always open to new
            learning opportunities and I look forward to hearing from you.
          </p>

          <p>
            <a
              href="https://github.com/marcoaraujoneves"
              title="Github profile"
              target="_blank"
            >
              <GithubFillIcon color="#35495e" size={24} />
            </a>
            <a
              href="https://www.linkedin.com/in/marco-araujo/"
              title="LinkedIn profile"
              target="_blank"
            >
              <LinkedinBoxFillIcon color="#35495e" size={24} />
            </a>
          </p>
        </div>
      </div>
    </Layout>
  )
}

export const Head = () => <SEO title="Contact me" />

export const pageQuery = graphql`
  query ContactPageImage {
    file(relativePath: { eq: "contact.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 640, maxHeight: 427) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`
