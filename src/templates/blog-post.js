import React from 'react';
import { graphql } from 'gatsby';

import SEO from '@components/seo';
import Layout from '@components/Layout/Layout';

import BlogLayout from '@components/Blog/BlogLayout';
import SocialShareSection from '@components/Blog/SocialShareSection';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { BlogDateAndReadTime } from '@components/Blog/BlogCard';
import { DiscussionEmbed } from 'disqus-react';

import { siteUrl, disqusShortName } from '../../config/website';

const BlogPost = ({ data, pageContext }) => {
  const { title, date } = data.markdownRemark.frontmatter;
  const { timeToRead, html, excerpt, id } = data.markdownRemark;

  const baseSlugUrl = 'https://github.com/birth-days/sujithvi' + pageContext.slug;
  const disqusConfig = {
    identifier: id,
    title: title,
    url: baseSlugUrl,
  };

  const githubLink = `https://github.com/birth-days/sujithvi/tree/develop/content${pageContext.slug}/index.md`;

  return (
    <Layout>
      <SEO
        isBlogPost
        title={title}
        description={excerpt}
        slug={pageContext.slug}
      />

      <BlogLayout
        sharerSection={
          <div>
            <h4>Share on</h4>
            <SocialShareSection baseSlugUrl={baseSlugUrl} title={title} />
            <hr style={{ margin: '25px 0' }} />
            
          </div>
        }
      >
        <BlogDateAndReadTime date={date} readtime={timeToRead} />
        <h1>{title}</h1>
        <article
          className="markdown-content"
          dangerouslySetInnerHTML={{ __html: html }}
        />
        {/* <DiscussionEmbed shortname={disqusShortName} config={disqusConfig} /> */}
      </BlogLayout>
    </Layout>
  );
};

export const query = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      excerpt
      html
      timeToRead
      id
      frontmatter {
        date(formatString: "MMMM DD, YYYY", locale: "en")
        title
      }
    }
  }
`;

export default BlogPost;
