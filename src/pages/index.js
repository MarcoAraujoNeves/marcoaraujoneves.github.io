/* eslint-disable react/prop-types */
import React from 'react'
import { graphql, Link } from 'gatsby'
import Img from 'gatsby-image'
import GithubFillIcon from 'remixicon-react/GithubFillIcon'
import LinkedinBoxFillIcon from 'remixicon-react/LinkedinBoxFillIcon'
import TwitterFillIcon from 'remixicon-react/TwitterFillIcon'

import Layout from '../components/Layout'
import PostsWrapper from '../components/PostsWrapper'
import SEO from '../components/SEO'

import {
  heroWrapper,
  heroRow,
  heroContentWrapper,
  heroImageWrapper,
  latestPosts,
  morePosts,
} from '../assets/css/home.module.css'

export default function Home({
  data: { allMarkdownRemark: posts, allImageSharp, file },
}) {
  return (
    <Layout>
      <div className={heroWrapper}>
        <div className={heroRow}>
          <div className={heroContentWrapper}>
            <h1>
              <span>Hello World,</span>
              welcome to my blog!
            </h1>

            <p>
              Here I share some experiences and insights as a computer engineer
              and software developer. My goal is to write articles and tips on a
              range of topics related to technology, from Javascript and Node.js
              to Arduino, robotics, and AI.
            </p>

            <p>
              Feel free to get in touch if you have any feedback or new
              insights!
            </p>

            <p>
              Follow me on:
              <a
                href="https://github.com/marcoaraujoneves"
                title="Github"
                target="_blank"
              >
                <GithubFillIcon color="#35495e" size={18} />
              </a>
              <a
                href="https://www.linkedin.com/in/marco-araujo/"
                title="LinkedIn"
                target="_blank"
              >
                <LinkedinBoxFillIcon color="#35495e" size={18} />
              </a>
            </p>
          </div>

          <div className={heroImageWrapper}>
            <Img
              fluid={file.childImageSharp.fluid}
              objectFit="cover"
              objectPosition="50% 50%"
              alt="Home page hero image."
            />
          </div>
        </div>
      </div>

      <div className={latestPosts}>
        <h2>Latest posts</h2>

        <PostsWrapper
          posts={posts}
          allImageSharp={allImageSharp}
          highlightFirst={false}
        />

        <div className={morePosts}>
          <p>
            <Link to="/posts/">More posts</Link>
          </p>
        </div>
      </div>
    </Layout>
  )
}

export const Head = () => <SEO />

export const pageQuery = graphql`
  query LatestBlogPosts {
    file(relativePath: { eq: "hero.png" }) {
      childImageSharp {
        fluid(maxWidth: 800, maxHeight: 1017) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 3
    ) {
      nodes {
        fields {
          slug
        }
        frontmatter {
          title
          date(formatString: "MMMM DD, YYYY")
          description
          category
          cover
          tags
        }
      }
    }
    allImageSharp {
      nodes {
        fluid(maxWidth: 1600, maxHeight: 800) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`
