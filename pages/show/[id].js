import Layout from '../../components/MyLayout';
import css from "../../assets/css/styles.scss";
import Markdown from 'react-markdown';
import { useRouter } from 'next/router';
import useSWR from 'swr'

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

export default function Post() {
  const router = useRouter();
  const posts = getPosts().data.filter(post => (
    post.id === router.query.id
  ));
  if(posts.length < 1) return (
    <Layout>
      <div>
        now loading
      </div>
    </Layout>
  );
  const data = posts[0]
  return (
    <Layout>
      <div className={css.postDetailWrapper}>
        <section className={css.postDetail}>
          <h1 className={css.postDetail_ttl}>{data.title}</h1>
          <div className={css.postMovie}>
            <iframe width="560" height="315" src={`https://www.youtube.com/embed/${data.youtube}`} frameBorder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen></iframe>
          </div>
          <Markdown source={data.text} renderers={{link: props => <a href={props.href} target="_blank">{props.children}</a>}} breaks={true}></Markdown>
        </section>
      </div>
    </Layout>
  );
};