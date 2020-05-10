import Layout from '../components/MyLayout';
import Link from 'next/link';
import TopMv from "../components/TopMv";
import TheHead from "../components/TheHead";
import fetch from 'node-fetch'
import css from '../assets/css/TopPage.module.scss'
import { useState, useEffect } from "react";

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
  const [posts, setPosts] = useState(resData);
  const [listIndex, setListIndex] = useState(3);

  const filteredData = (val, index) => {
    setListIndex(index)
    if(val === '全て') return setPosts(resData)
    const filtered = resData.filter(data => data.category.categoryName === val)
    setPosts(filtered)
  }
  return (
    <div>
      <TheHead title={"えびの動画まとめ | えびがTwitterなどにアップしている動画のまとめサイト"} url={process.env.siteRoot} ogp={`${process.env.siteRoot}/static/ogp.jpg`} />
      <Layout>
        <TopMv />
        <ul className={css.buttonList}>
          <li><button className={listIndex === 0 ? `${css.is_active} ${css.filterButton} ${css.filterButton__all}` : `${css.filterButton} ${css.filterButton__all}`} onClick={() => filteredData("全て", 0)}>全て</button></li>
          <li><button className={listIndex === 1 ? `${css.is_active} ${css.filterButton} ${css.filterButton__weeklyEbi}` : `${css.filterButton} ${css.filterButton__weeklyEbi}`} onClick={() => filteredData("今週のエビ君", 1)}>今週のエビ君</button></li>
          <li><button className={listIndex === 2 ? `${css.is_active} ${css.filterButton} ${css.filterButton__saisokuXD}` : `${css.filterButton} ${css.filterButton__saisokuXD}`} onClick={() => filteredData("最速XD", 2)}>最速XD</button></li>
          <li><button className={listIndex === 3 ? `${css.is_active} ${css.filterButton} ${css.filterButton__other}` : `${css.filterButton} ${css.filterButton__other}`} onClick={() => filteredData("その他", 3)}>その他</button></li>
        </ul>
        <section className={css.moviePostWrapper}>
          <ul className={css.moviePostList}>
            {posts.map(post => (
              <PostLink key={post.id} post={post} />
            ))}
          </ul>
        </section>
      </Layout>
    </div>
  );
}