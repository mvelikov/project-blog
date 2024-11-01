
import BlogSummaryCard from '@/components/BlogSummaryCard';
import { BLOG_TITLE } from '@/constants';
import { getBlogPostList } from '@/helpers/file-helpers';
import styles from './homepage.module.css';

export async function generateMetadata() {

  return {
    title: BLOG_TITLE,
  };
}

async function Home() {
  const data = await getBlogPostList()

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.mainHeading}>
        Latest Content:
      </h1>

      {data.map(post => {
        return <BlogSummaryCard
          key={post.slug}
          slug={post.slug}
          title={post.title}
          abstract={post.abstract}
          publishedOn={new Date(post.publishedOn)}
        />
      })}

    </div>
  );
}

export default Home;
