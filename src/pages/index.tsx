import { GetStaticProps } from 'next';
import Link from 'next/link';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { RichText } from 'prismic-dom';
import { AiOutlineCalendar, AiOutlineUser } from 'react-icons/ai';

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

  return (
    <main className={styles.container}>
      {results.map(post => (
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
          onClick={() => console.log('pressed')}
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
    page: 2,
    pageSize: 1,
  });

  console.log(response);

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
        'PPP',
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
