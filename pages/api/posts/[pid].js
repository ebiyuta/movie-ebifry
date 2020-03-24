import posts from '../../../static/posts';

export default (req, res) => {
  const {
    query: { pid },
  } = req
  const resPost = posts.filter(post => post.id === pid);

  res.end(`post: ${resPost}`)
}