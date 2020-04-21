import css from '../assets/css/TopMv.module.scss'

const TopMv = () => (
  <div className={css.topMv}>
    <figure>
      <img src="/static/logo.png" alt=""/>
    </figure>
    <h1>えびがTwitterなどにアップしている<br/>動画のまとめサイトです</h1>
  </div>
);

export default TopMv;