/* eslint-disable react/prop-types */
import React from 'react'
import { graphql } from 'gatsby'

import Layout from './Layout'
import PostsWrapper from './PostsWrapper'
import SEO from './SEO'

function Tag({
  pageContext,
  data: { allMarkdownRemark: posts, allImageSharp },
}) {
  return (
    <Layout>
      <h1>
        All posts about&nbsp;
        <span>{pageContext.tag}</span>
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
  return <SEO title={`Blog posts about ${pageContext.tag}`} />
}

export default Tag

export const pageQuery = graphql`
  query BlogPostsByTag($tag: String!) {
    allMarkdownRemark(
      filter: { frontmatter: { tags: { in: [$tag] } } }
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
