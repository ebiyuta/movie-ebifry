import Head from 'next/head'

const Header = ({title, url, ogp}) => (
  <Head>
    <title>{title}</title>
    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    <meta property="og:type" content="blog" />
    <meta property="og:description" content="えびの動画をまとめたサイトです" />
    <meta property="og:url" content={url} />
    <meta property="og:site_name" content="えびの動画まとめ" />
    <meta property="og:title" content={title} />
    <meta property="og:image" content={ogp} />
    <link rel="icon" href="/static/favicon.ico" />
  </Head>
);

export default Header;