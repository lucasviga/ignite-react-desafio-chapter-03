import { GetStaticPaths, GetStaticProps } from 'next';

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

export default function Post(): JSX.Element {
  return (
    <>
      <div className={styles.cover}>
        <img src="https://images.unsplash.com/photo-1617042375876-a13e36732a04?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" />
      </div>

      <main className={styles.container}>
        <article className={styles.post}>
          <h1>How to use React hooks</h1>
          <div className={styles.postInfo}>
            <time>15 Mar 2022</time>
            <span>Lucas Viga</span>
            <time>4 min</time>
          </div>

          <div className={styles.postContent}>
            <p>
              O tempo estimado de leitura deve ser calculado manualmente por
              você. Mas não se assuste, a ideia é simples. Basicamente você deve
              calcular todas as palavras dentro do texto do seu post, dividir
              pela média de palavras que um ser humano lê por minuto e
              arredondar para cima. Para esse desafio, utilize que o ser humano
              leia, em média, 200 palavras por minuto. Então se o seu texto
              possuir 805 palavras, você irá dividir por 200 e arredondar o
              resultado para cima, chegando assim no valor de 5 minutos
              estimados para leitura do post.
            </p>
          </div>
        </article>
      </main>
    </>
  );
}

// export const getStaticPaths = async () => {
//   const prismic = getPrismicClient();
//   const posts = await prismic.query(TODO);

//   // TODO
// };

// export const getStaticProps = async context => {
//   const prismic = getPrismicClient();
//   const response = await prismic.getByUID(TODO);

//   // TODO
// };
