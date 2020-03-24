import Layout from '../components/MyLayout';
import Link from 'next/link';
import TopMv from "../components/TopMv";
import css from "../assets/css/styles.scss"
import useSWR from 'swr';

function fetcher(url) {
  return fetch(url).then(r => r.json());
}

function getPosts() {
  const { data } = useSWR('/api/posts', fetcher);
  const resData = data ? data : []
  return {
    data: resData
  }
}

const PostLink = ({ post }) => {
return (
  <li>
    <Link href="/show/[id]" as={`/show/${post.id}`}>
      <a className={css.moviePost}>
        <img src={`/static/${post.img}`} alt=""/>
        <h2>{post.title}</h2>
      </a>
    </Link>
  </li>
)};

export default function Blog() {
  return (
    <Layout>
      <TopMv />
      <section className={css.moviePostWrapper}>
        <ul className={css.moviePostList}>
          {getPosts().data.map(post => (
            <PostLink key={post.id} post={post} />
          ))}
        </ul>
      </section>
    </Layout>
  );
}