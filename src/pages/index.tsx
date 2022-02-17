import next, { GetStaticProps } from 'next';
import Link from 'next/link';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { RichText } from 'prismic-dom';
import { AiOutlineCalendar, AiOutlineUser } from 'react-icons/ai';

import { useState } from 'react';
import { getPrismicClient } from '../services/prismic';

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

export default function Home({ postsPagination }: HomeProps): JSX.Element {
  const { next_page, results } = postsPagination;
  const [posts, setPosts] = useState(results);

  async function loadMorePosts(): Promise<void> {
    console.log(next_page);

    const response = await fetch(next_page);
    const data = await response.json();

    const post = {
      uid: data.results[0].uid,
      data: {
        title: RichText.asText(data.results[0].data.title),
        subtitle: RichText.asText(data.results[0].data.subtitle),
        author: RichText.asText(data.results[0].data.author),
      },
      first_publication_date: format(
        new Date(data.results[0].last_publication_date),
        'PP',
        {
          locale: ptBR,
        }
      ),
    };

    console.log(post);

    setPosts([...posts, post]);
  }

  console.log(posts, 'useState');

  return (
    <main className={styles.container}>
      {posts.map(post => (
        <div key={post.uid} className={styles.post}>
          <Link href={`/post/${post.uid}`}>
            <a>{post.data.title}</a>
          </Link>
          <p>{post.data.subtitle}</p>

          <div>
            <time>
              <AiOutlineCalendar />
              {post.first_publication_date}
            </time>
            <span>
              <AiOutlineUser />
              {post.data.author}
            </span>
          </div>
        </div>
      ))}

      {next_page && (
        <button
          type="button"
          className={styles.loadMoreButton}
          onClick={() => loadMorePosts()}
        >
          Carregar mais posts
        </button>
      )}
    </main>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();
  const response = await prismic.query('', {
    page: 1,
    pageSize: 1,
  });

  const posts = response.results.map(post => {
    return {
      uid: post.uid,
      data: {
        title: RichText.asText(post.data.title),
        subtitle: RichText.asText(post.data.subtitle),
        author: RichText.asText(post.data.author),
      },
      first_publication_date: format(
        new Date(post.last_publication_date),
        'PP',
        {
          locale: ptBR,
        }
      ),
    };
  });

  return {
    props: {
      postsPagination: {
        results: posts,
        next_page: response.next_page,
      },
    }, // will be passed to the page component as props
  };
};
