import Link from 'next/link';
import css from "../assets/css/styles.scss"

const Header = () => (
  <div className={css.header}>
    <Link href="/">
      <a><img src="/static/ebifry.svg" alt=""/></a>
    </Link>
  </div>
);

export default Header;