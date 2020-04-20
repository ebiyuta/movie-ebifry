import Layout from '../components/MyLayout';
import Link from 'next/link';
import TopMv from "../components/TopMv";
import TheHead from "../components/TheHead";
import fetch from 'node-fetch'
import css from '../assets/css/TopPage.module.scss'
export async function getStaticProps() {
  const response = await fetch('https://movie-ebifry.microcms.io/api/v1/posts?limit=100', {
    headers: {
      'X-API-KEY': process.env.apiKey
    }});
  const posts = await response.json()
  const resData = posts ? posts.contents : []
  return {
    props: { resData }
  }
}
const PostLink = ({ post }) => {
  return (
    <li>
      <Link href="post/[id]" as={`post/${post.id}`}>
        <a className={css.moviePost}>
          <img src={post.img ? `${post.img.url}?w=700` : "https://placehold.jp/16/ffa600/ffffff/500x400.png?text=%E3%81%88%E3%81%B3%E3%81%B5%E3%82%89%E3%81%84"} alt=""/>
          <span className={`el_label el_label__${post.category.categoryID}`}>{post.category.categoryName}</span>
          <h2>{post.title}</h2>
        </a>
      </Link>
    </li>
  )};
export default function Blog({resData}) {
  return (
    <div>
      <TheHead title={"えびの動画まとめ | えびがTwitterなどにアップしている動画のまとめサイト"} url={process.env.siteRoot} ogp={`${process.env.siteRoot}/static/ogp.jpg`} />
      <Layout>
        <TopMv />
        <section className={css.moviePostWrapper}>
          <ul className={css.moviePostList}>
            {resData.map(post => (
              <PostLink key={post.id} post={post} />
            ))}
          </ul>
        </section>
      </Layout>
    </div>
  );
}