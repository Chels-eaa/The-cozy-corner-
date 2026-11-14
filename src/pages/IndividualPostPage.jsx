import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router';

function IndividualPostPage() { 
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [author, setAuthor] = useState(null);
  const[comments, setComments] = useState([]);
  const[name, setName] = useState('');
  const[newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);



  
  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      .then(response => {
        if(!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })   
        .then(data => {
            setPost(data);
            setLoading(false);


            fetch(`https://jsonplaceholder.typicode.com/users/${data.userId}`)
            .then(response => response.json())
            .then(userData => setAuthor(userData));
        })
        .catch(error => {
            setError(error);
            setLoading(false);

        });


        fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
        .then(response => response.json())
        .then(data => setComments(data));

        }, [postId]);
    function handleSubmit(event) {
        event.preventDefault();

        if (name == '' || newComment == '') {
            alert('Please fill in both fields before submitting your comment.');
            return;
        }

        fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`, {
            method: 'POST',
            body: JSON.stringify({
                postId: postId,
                name: name,
                email: 'guest@example.com',
                body: newComment
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setComments([...comments, data]);
            setName('');
            setNewComment('');
        });
    }



    
  if (!post) {
    return <p>Loading...</p>;

  }
  if (error) {
    return <p>Error: {error.message}</p>;
  }
  if(!post) {
    return <p>Loading...</p>;
  }
  return (
    <main className="main-content">
      <h2>{post.title}</h2>
      <p>{post.body}</p>
        {author && <p>Written by: {author.name}</p>}

      
      <h3>Leave a Comments</h3>
      <form onSubmit={handleSubmit}>
        <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
        />
        <textarea
            placeholder="Your Comment"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
        />
        <button type="submit">Submit</button>

      </form>
      <h3>Comments</h3>

    
       {  comments.map((comment) => (
        <div key={comment.id} className="comment">
        <h4 >{comment.name}</h4>
        <p>{comment.body}</p>
        <p>By: {comment.email}</p>
        </div>
        ))}

      <Link to="/posts">Back to Posts</Link>
    </main>
    );
}
    export default IndividualPostPage;