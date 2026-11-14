import { useState } from 'react';

function CommentSection() {
  const [comments, setComments] = useState([
    {
      id: 1,
      name: 'Alex',
      text: 'Such a lovely reminder!',
    },
    {
      id: 2,
      name: 'Jordan',
      text: 'I really enjoyed reading this post.',
    },
  ]);

  const [commentText, setCommentText] = useState('');

  function handleSubmit(event) {
    event.preventDefault();

    if (commentText.trim() === '') {
      return;
    }

    const newComment = {
      id: Date.now(),
      name: 'Guest',
      text: commentText.trim(),
    };

    setComments([...comments, newComment]);
    setCommentText('');
  }

  return (
    <section className="comment-section">
      <h3>Comments ({comments.length})</h3>

      <form onSubmit={handleSubmit}>
        <label htmlFor="comment">Leave a comment</label>

        <textarea
          id="comment"
          value={commentText}
          onChange={(event) => setCommentText(event.target.value)}
          placeholder="Write your thoughts..."
          rows="4"
        />

        <button type="submit">Submit Comment</button>
      </form>

      <div className="comment-list">
        {comments.map((comment) => (
          <div className="comment" key={comment.id}>
            <strong>{comment.name}</strong>
            <p>{comment.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default CommentSection;
