const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === 'MarkdownRemark') {
    const value = createFilePath({ node, getNode })

    createNodeField({
      name: 'slug',
      node,
      value,
    })
  }
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  const result = await graphql(
    `
      {
        allMarkdownRemark(sort: { fields: [frontmatter___date], order: ASC }) {
          nodes {
            id
            fields {
              slug
            }
            frontmatter {
              cover
              category
              tags
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    reporter.panicOnBuild(
      'There was an error loading your blog posts',
      result.errors
    )

    return
  }

  const posts = result.data.allMarkdownRemark.nodes

  if (posts.length === 0) {
    reporter.warn('No blog posts found')
    return
  }

  const component = path.resolve('./src/components/Post.js')
  console.log('\nGenerating blog posts:')

  posts.forEach((post, index) => {
    const previousPostId = index === 0 ? null : posts[index - 1].id
    const nextPostId = index === posts.length - 1 ? null : posts[index + 1].id

    console.log(`[${index + 1}/${posts.length}]: ${post.fields.slug}`)

    createPage({
      path: post.fields.slug,
      component,
      context: {
        id: post.id,
        previousPostId,
        nextPostId,
        cover: post.frontmatter.cover,
      },
    })
  })

  console.log('')

  const categories = posts.reduce((acc, post) => {
    if (!acc.includes(post.frontmatter.category)) {
      acc.push(post.frontmatter.category)
    }

    return acc
  }, [])

  if (categories.length > 0) {
    console.log('\nGenerating category pages:')
  }

  const categoryComponent = path.resolve('./src/components/Category.js')

  categories.forEach((category, index) => {
    const categoryPath = `/category/${category
      .toLowerCase()
      .replace(/ /g, '-')}/`

    console.log(`[${index + 1}/${categories.length}]: ${categoryPath}`)

    createPage({
      path: categoryPath,
      component: categoryComponent,
      context: {
        category,
      },
    })
  })

  console.log('')

  const tags = posts
    .flatMap(post => post.frontmatter.tags)
    .reduce((acc, tag) => {
      if (!acc.includes(tag)) {
        acc.push(tag)
      }

      return acc
    }, [])

  if (tags.length > 0) {
    console.log('\nGenerating tag pages:')
  }

  const tagComponent = path.resolve('./src/components/Tag.js')

  tags.forEach((tag, index) => {
    const tagPath = `/tag/${tag.toLowerCase().replace(/ /g, '-')}/`

    console.log(`[${index + 1}/${tags.length}]: ${tagPath}`)

    createPage({
      path: tagPath,
      component: tagComponent,
      context: {
        tag,
      },
    })
  })

  console.log('')
}
