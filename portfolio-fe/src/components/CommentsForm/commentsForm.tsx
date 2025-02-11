import React, { useState } from "react";
import { addComment } from "../../api/Comments/createComment";
import { commentsRequestModel } from "../../Models/Comments/commentsRequestModel";  
import "./commentsForm.css";  

export default function CommentForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [error, setError] = useState<string | null>(null);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !comment.trim()) {
      setError("All fields are required!");
      return;
    }

    const newComment: commentsRequestModel = { name, email, comment };

    try {
      await addComment(newComment);
      setName("");
      setEmail("");
      setComment("");
      setError(null);
      alert("Comment submitted successfully!");
    } catch (err) {
      setError("Failed to submit comment");
    }
  };

  return (
    <div className="comment-form-container">
      <h2 className="comment-form-heading">Add a Comment</h2>
      <form onSubmit={handleSubmit} className="comment-form">
        <input
          type="text"
          className="comment-form-input"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          className="comment-form-input"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <textarea
          className="comment-form-textarea"
          placeholder="Your Comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button type="submit" className="comment-form-button">Submit</button>
      </form>

      {error && <p className="comment-form-error">{error}</p>}
    </div>
  );
}
