import { useState, useEffect } from 'react';
import { Link } from 'react-router';

function BlogPostsPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => {
      if(!response.ok) {
        throw new Error('Network response was not ok');
        }

        return response.json();
    })
        .then(data => {
            setPosts(data);
            setLoading(false);
        })
        .catch(error => {
            setError(error);
            setLoading(false);
        });

  } , [] );
  
  if (loading) {
    return <p>Loading...</p>;
    }
    if (error) {
        return <p>Error: {error.message}</p>;
    }


  return (
    <main className="main-content">
      <h2>Latest Stories</h2>

      {posts.map((post) => (
        <article key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
          <Link to={`/posts/${post.id}`}>Read More</Link>
        </article>
      ))}
    </main>
  );
}
export default BlogPostsPage;
