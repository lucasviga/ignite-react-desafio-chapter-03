import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { GetStaticPaths, GetStaticProps } from 'next';
import { RichText } from 'prismic-dom';
import {
  AiOutlineCalendar,
  AiOutlineUser,
  AiOutlineClockCircle,
} from 'react-icons/ai';

import { getPrismicClient } from '../../services/prismic';

import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';

interface Post {
  first_publication_date: string | null;
  data: {
    title: string;
    banner: {
      url: string;
    };
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
}

interface PostProps {
  post: Post;
}

export default function Post({ post }: PostProps): JSX.Element {
  return (
    <>
      <div className={styles.cover}>
        <img src={post.data.banner.url} alt={post.data.title} />
      </div>

      <main className={styles.container}>
        <article className={styles.post}>
          <h1>{post.data.title}</h1>
          <div className={styles.postInfo}>
            <time>
              <AiOutlineCalendar /> {post.first_publication_date}
            </time>
            <span>
              <AiOutlineUser /> {post.data.author}
            </span>
            <time>
              <AiOutlineClockCircle />4 min
            </time>
          </div>

          {/* <div className={styles.postContent} />                     */}
        </article>
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const prismic = getPrismicClient();
  const posts = await prismic.query('');

  const paths = posts.results.map(post => ({
    params: { slug: post.uid },
  }));

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params;

  const prismic = getPrismicClient();
  const response = await prismic.getByUID('posts', String(slug), {});

  const post = {
    first_publication_date: format(
      new Date(response.last_publication_date),
      'PPP',
      {
        locale: ptBR,
      }
    ),
    data: {
      title: RichText.asText(response.data.title),
      banner: {
        url: response.data.banner.url,
      },
      author: RichText.asText(response.data.author),
      content: response.data.content.reduce(item => ({
        heading: RichText.asHtml(item.heading),
        body: { text: RichText.asHtml(item.body) },
      })),
    },
  };

  console.log(post.data.content);

  return {
    props: {
      post,
    },
  };
};
