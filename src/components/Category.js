/* eslint-disable react/prop-types */
import React from 'react'
import { graphql } from 'gatsby'

import Layout from './Layout'
import PostsWrapper from './PostsWrapper'
import SEO from './SEO'

function Category({
  pageContext,
  data: { allMarkdownRemark: posts, allImageSharp },
}) {
  return (
    <Layout>
      <h1>
        All posts about&nbsp;
        <span>{pageContext.category}</span>
      </h1>

      <PostsWrapper
        posts={posts}
        allImageSharp={allImageSharp}
        highlightFirst={false}
      />
    </Layout>
  )
}

export const Head = ({ pageContext }) => {
  return <SEO title={`Blog posts about ${pageContext.category}`} />
}

export default Category

export const pageQuery = graphql`
  query BlogPostsByCategory($category: String!) {
    allMarkdownRemark(
      filter: { frontmatter: { category: { eq: $category } } }
      sort: { fields: [frontmatter___date], order: DESC }
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
