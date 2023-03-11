/* eslint-disable react/prop-types */
import React from 'react'

import PostCard from './PostCard'

import { postsWrapper, noMatches } from '../assets/css/posts.module.css'

const PostsWrapper = ({ posts, allImageSharp, highlightFirst, search }) => {
  const getCoverFluid = (images, cover) => {
    const filteredArray = images.nodes.filter(({ fluid }) =>
      fluid.src.includes(cover)
    )

    return filteredArray[0].fluid
  }

  const mappedPosts = posts.nodes.map(({ frontmatter, fields }) => ({
    ...frontmatter,
    path: fields.slug,
    coverFluid: getCoverFluid(allImageSharp, frontmatter.cover),
  }))

  const filteredPosts = search
    ? mappedPosts.filter(
        post =>
          post.title.toLowerCase().includes(search) ||
          post.description.toLowerCase().includes(search)
      )
    : mappedPosts

  return (
    <div className={postsWrapper}>
      {filteredPosts.length > 0 ? (
        filteredPosts.map((post, index) => (
          <PostCard
            key={post.path}
            post={post}
            highlighted={highlightFirst ? index === 0 : null}
          />
        ))
      ) : (
        <h2 className={noMatches}>No matches found</h2>
      )}
    </div>
  )
}

export default PostsWrapper
