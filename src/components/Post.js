/* eslint-disable react/prop-types */
import React, { useEffect } from 'react'
import { Link, graphql } from 'gatsby'
import Img from 'gatsby-image'
import { defineCustomElements } from '@deckdeckgo/highlight-code/dist/loader'

import Layout from '../components/Layout'
import SEO from '../components/SEO'

import { postDate } from '../assets/css/posts.module.css'
import { badge } from '../assets/css/footer.module.css'
import {
  postArticle,
  postDateCategory,
  postContent,
} from '../assets/css/post.module.css'

const BlogPostTemplate = ({
  data: { previous, next, markdownRemark: post, file },
}) => {
  const getPath = (type, value) => {
    return `/${type}/${value.toLowerCase().replace(/ /g, '-')}`
  }

  useEffect(() => {
    defineCustomElements()
    const tabbedCodeBlocks = document.querySelectorAll('.tabbed-code')

    // if (tabbedCodeBlocks.length > 0) {
    //   for (const tabbedCodeBlock of tabbedCodeBlocks) {
    //     const codeBlocks = [...tabbedCodeBlock.childNodes].filter(
    //       element => element.localName && element.localName.includes('div')
    //     )

    //     let tabsbar = ``

    //     for (const [index, codeBlock] of codeBlocks.entries()) {
    //       const toggleStatement = `event.target.parentNode.parentNode.attributes.active.value = ${index}`
    //       tabsbar += `<button onclick="${toggleStatement}">${codeBlock.attributes.language.value}</button>`
    //     }

    //     const tabsbarElement = document.createElement('section')
    //     tabsbarElement.innerHTML = tabsbar

    //     tabbedCodeBlock.prepend(tabsbarElement)
    //   }
    // }
  }, [])

  return (
    <Layout>
      <article className={postArticle}>
        <section>
          <Img
            fluid={file.childImageSharp.fluid}
            objectFit="cover"
            objectPosition="50% 50%"
            alt={`${post.frontmatter.title} blog post cover.`}
          />

          <h1>{post.frontmatter.title}</h1>

          <p className={`${postDate} ${postDateCategory}`}>
            <Link to={getPath('category', post.frontmatter.category)}>
              <span>{post.frontmatter.category}</span>
            </Link>
            &nbsp;&bull;&nbsp;
            <span>{post.frontmatter.date}</span>
          </p>

          {post.frontmatter.tags ? (
            <div>
              {post.frontmatter.tags.map(tag => (
                <Link key={tag} to={getPath('tag', tag)}>
                  <span className={badge}>{tag}</span>
                </Link>
              ))}
            </div>
          ) : (
            false
          )}
        </section>

        <section
          className={postContent}
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </article>

      <nav>
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export const Head = ({ data: { markdownRemark: post, file, page } }) => {
  return (
    <SEO
      title={post.frontmatter.title}
      description={post.frontmatter.description || post.excerpt}
      pathname={page.fields.slug}
      cover={file.childImageSharp.fluid.src}
    />
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
    $cover: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        category
        cover
        tags
      }
    }
    file(relativePath: { eq: $cover }) {
      childImageSharp {
        fluid(maxWidth: 1600, maxHeight: 800) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    page: markdownRemark(id: { eq: $id }) {
      fields {
        slug
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`
