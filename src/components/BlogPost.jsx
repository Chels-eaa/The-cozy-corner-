function BlogPost({ post }) {
  return (
    <article className="blog-post">
      <h2>{post.title}</h2>

      <p className="post-meta">
        By {post.author} · {post.date}
      </p>

      <p className="post-content">{post.content}</p>
    </article>
  );
}

export default BlogPost;
