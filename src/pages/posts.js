/* eslint-disable react/prop-types */
import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import PostsWrapper from '../components/PostsWrapper'
import SEO from '../components/SEO'

export default function Posts({
  data: { allMarkdownRemark: posts, allImageSharp },
  location,
}) {
  const params = new URLSearchParams(location.search)
  const search = params.get('search') && params.get('search').toLowerCase()

  return (
    <Layout>
      <h1>{search ? `Results for "${search}"` : 'All posts'}</h1>

      <PostsWrapper
        posts={posts}
        allImageSharp={allImageSharp}
        highlightFirst={!search}
        search={search}
      />
    </Layout>
  )
}

export const Head = () => <SEO title="Posts" />

export const pageQuery = graphql`
  query BlogPosts {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
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
