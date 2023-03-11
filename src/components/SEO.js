import React from 'react'
import { useSiteMetadata } from '../hooks/use-site-metadata'

// eslint-disable-next-line react/prop-types
const SEO = ({ title, description, cover, pathname, children }) => {
  const {
    title: defaultTitle,
    description: defaultDescription,
    image: imagePath,
    siteUrl,
    twitterUsername,
  } = useSiteMetadata()

  const finalTitle = title
    ? `${title} | ${defaultTitle}`
    : `${defaultTitle} | Software Engineer`

  const finalDescription = description || defaultDescription
  const imageURL = `${siteUrl}${cover || imagePath}`
  const url = `${siteUrl}${pathname || '/'}`

  return (
    <>
      <title>{finalTitle}</title>
      <meta name="twitter:title" content={finalTitle} />
      <meta property="og:title" content={finalTitle} />

      <meta name="author" content="Marco Araujo" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta property="og:type" content="article" />

      <meta name="description" content={finalDescription} />
      <meta name="twitter:description" content={finalDescription} />
      <meta property="og:description" content={finalDescription} />

      <meta name="twitter:site" content={twitterUsername} />
      <meta name="twitter:creator" content={twitterUsername} />
      <meta name="twitter:url" content={url} />

      <meta name="twitter:image" content={imageURL} />
      <meta name="og:image" content={imageURL} />

      <meta name="og:image:width" content="1200" />
      <meta name="og:image:height" content="630" />
      <meta name="twitter:image:width" content="1200" />
      <meta name="twitter:image:height" content="630" />
      {children}
    </>
  )
}

export default SEO
