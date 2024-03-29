import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

import Header from './header'

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
            description
            theme
            keywords
            author
            navbarVariant
          }
        }
      }
    `}
    render={data => (
      <>
        <Helmet
          title={data.site.siteMetadata.title}
          meta={[
            { name: 'theme-color', content: data.site.siteMetadata.theme },
            {
              name: 'description',
              content: data.site.siteMetadata.description,
            },
            { name: 'application-name', content: data.site.siteMetadata.title },
            { name: 'author', content: data.site.siteMetadata.author },
            { name: 'keywords', content: data.site.siteMetadata.keywords },
          ]}
        >
          <html lang="en" />
        </Helmet>
        <Header siteData={data.site.siteMetadata} />
        {children}
        <footer>
          Copyright unix<span>MiB</span> 2019 - Creative Commons
          Attribution-ShareAlike <span>4.0</span> International
        </footer>
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
