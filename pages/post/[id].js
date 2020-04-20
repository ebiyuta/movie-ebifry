import Layout from '../../components/MyLayout';
import { TwitterShareButton, TwitterTweetEmbed } from 'react-twitter-embed';
import ReactPlayer from 'react-player'
import TheHead from "../../components/TheHead";
import fetch from 'node-fetch'
import Link from "next/link";
import css from '../../assets/css/Detail.module.scss'
export async function getStaticPaths() {
  const res = await fetch(`https://movie-ebifry.microcms.io/api/v1/posts?limit=100`, {
    headers: {
      'X-API-KEY': process.env.apiKey
    }});
  const repos = await res.json()
  const paths = repos.contents.map(repo => `/post/${repo.id}`)
  return { paths, fallback: false }
}
export async function getStaticProps({ params }) {
  const response = await fetch(`https://movie-ebifry.microcms.io/api/v1/posts/${params.id}`, {
    headers: {
      'X-API-KEY': process.env.apiKey
    }});
  const data = await response.json()
  return {
    props: {
      data,
      status: response.status,
    }
  }
}
const ExportYoutube = ({id}) => {
  if(!id){return ("")}
  return (
    <div className={css.postMovieWrapper}>
      <ReactPlayer className={css.postMovie} url={`https://www.youtube.com/watch?v=${id}`} width='100%' height='100%' />
    </div>
  )};
const ExportTwitter = ({id}) => {
  if(!id){return ("")}
  return (
    <div className={css.postTweet}>
      <TwitterTweetEmbed
        tweetId={id}
      />
    </div>
  )};
export default function Post({data, status}) {
  if(status === 200){return (
    <div>
      <TheHead title={`${data.title} | えびの動画まとめ`} url={`${process.env.siteRoot}/${data.id}`} ogp={data.img} />
      <Layout>
        <div className={css.postDetailWrapper}>
          <div className={css.pageHeader}>
            <h1 className={css.pageHeader_ttl}>{data.title}</h1>
          </div>
          <section className={css.postDetail}>
            <ExportYoutube id={data.youtube} />
            <ExportTwitter id={data.twitter} />
            <div
              dangerouslySetInnerHTML={{
                __html: `${data.text}`,
              }}
            ></div>
            <div className={css.tweetBtn}>
              <TwitterShareButton
                url={`https://movie.ebifry.jp/${data.id}`}
                options={{ text: `${data.title} | えびの動画まとめ`, via: 'pino_ebiebi' }}
              />
            </div>
            <div className={"hp_tac"}>
              <Link href="/" as={`/`}>
                <a className={"el_btn"}>
                  TOPに戻る
                </a>
              </Link>
            </div>
          </section>
        </div>
      </Layout>
    </div>
  )}else{
    return (
      <p>{data.message}</p>
    )
  }
};