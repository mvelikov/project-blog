import BlogHero from '@/components/BlogHero';
import CircularColorsDemo from '@/components/CircularColorsDemo';
import CodeSnippet from '@/components/CodeSnippet';
import { loadBlogPost } from '@/helpers/file-helpers';
import { MDXRemote } from 'next-mdx-remote/rsc';
import React from 'react';
import styles from './postSlug.module.css';

const DivisionGroupsDemo = React.lazy(() => import('@/components/DivisionGroupsDemo'));
export async function generateMetadata({ params }) {
  const blogPost = await fetchBlogPost(params.postSlug);

  return {
    title: blogPost.frontmatter.title,
    description: blogPost.frontmatter.abstract,
  };
}

async function BlogPost({params}) {
  const blogPost = await fetchBlogPost(params.postSlug);

  return (
    <article className={styles.wrapper}>
      <BlogHero
        title={blogPost.frontmatter.title}
        publishedOn={blogPost.frontmatter.publishedOn}
      />
      <div className={styles.page}>
        <React.Suspense fallback={<p>Loading...</p>}>
          <MDXRemote source={blogPost.content} components={{pre: CodeSnippet, DivisionGroupsDemo, CircularColorsDemo}} />
        </React.Suspense>
      </div>
    </article>
  );
}

export default BlogPost;

const fetchBlogPost = React.cache(async function(slug) {
  return await loadBlogPost(slug)
})
