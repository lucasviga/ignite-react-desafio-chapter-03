import { GetStaticProps, NextPage } from 'next';
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

export default function Home(): JSX.Element {
  return (
    <main className={styles.container}>
      <div className={styles.post}>
        <h1>How to use hooks in React</h1>
        <p>Thinking about synchronization instead of lifecycles.</p>

        <div>
          <span>
            <AiOutlineCalendar />
            19 April 2021
          </span>
          <span>
            <AiOutlineUser />
            Lucas Viga
          </span>
        </div>
      </div>

      <div className={styles.post}>
        <h1>How to use hooks in React</h1>
        <p>Thinking about synchronization instead of lifecycles.</p>

        <div>
          <span>
            <AiOutlineCalendar />
            19 April 2021
          </span>
          <span>
            <AiOutlineUser />
            Lucas Viga
          </span>
        </div>
      </div>

      <div className={styles.post}>
        <h1>How to use hooks in React</h1>
        <p>Thinking about synchronization instead of lifecycles.</p>

        <div>
          <span>
            <AiOutlineCalendar />
            19 April 2021
          </span>
          <span>
            <AiOutlineUser />
            Lucas Viga
          </span>
        </div>
      </div>

      <div className={styles.post}>
        <h1>How to use hooks in React</h1>
        <p>Thinking about synchronization instead of lifecycles.</p>

        <div>
          <span>
            <AiOutlineCalendar />
            19 April 2021
          </span>
          <span>
            <AiOutlineUser />
            Lucas Viga
          </span>
        </div>
      </div>

      <div className={styles.post}>
        <h1>How to use hooks in React</h1>
        <p>Thinking about synchronization instead of lifecycles.</p>

        <div>
          <span>
            <AiOutlineCalendar />
            19 April 2021
          </span>
          <span>
            <AiOutlineUser />
            Lucas Viga
          </span>
        </div>
      </div>

      <button
        type="button"
        className={styles.loadMoreButton}
        onClick={() => console.log('pressed')}
      >
        Load more posts
      </button>
    </main>
  );
}

// export const getStaticProps = async () => {
//   // const prismic = getPrismicClient();
//   // const postsResponse = await prismic.query(TODO);

//   // TODO
// };
