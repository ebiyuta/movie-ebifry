import Header from './Header';
import Footer from './Footer';

const Layout = props => (
  <div>
    <Header />
    {props.children}
    <Footer />
    <style jsx global>{`
        body{
          margin: 0;
        }
        html{
          font-family: Hiragino Kaku Gothic ProN,ヒラギノ角ゴ ProN W3,メイリオ,Meiryo,-apple-system,BlinkMacSystemFont,Segoe UI,Hiragino Sans,ＭＳ Ｐゴシック,MS PGothic,sans-serif;
        }
      `}</style>
  </div>
);

export default Layout;