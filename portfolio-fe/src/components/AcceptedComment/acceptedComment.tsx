import { useEffect, useState } from "react";
import { commentsRequestModel } from "../../Models/Comments/commentsRequestModel";
import { fetchAllCommentsToReview } from "../../api/Comments/getAllComments";
import "./acceptedComment.css";

export const AcceptedComment = () => {
    const [comments, setComments] = useState<commentsRequestModel[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [slideDirection, setSlideDirection] = useState<string>("");

    useEffect(() => {
        const loadComments = async () => {
            try {
                const data = await fetchAllCommentsToReview();
                if (data) {
                    const filteredComments = data.filter(comment => comment.commentStatus === "COMMENT_APPROVED");
                    setComments(filteredComments);
                }
            } catch (err) {
                console.error("Error fetching comments:", err);
                setError("Failed to fetch the comments");
            } finally {
                setLoading(false);
            }
        };

        loadComments();
    }, []);

    const commentsPerPage = 2;
    const totalComments = comments.length;
    
    const handlePrev = () => {
        if (currentIndex > 0) {
            setSlideDirection("left"); // Add left slide animation
            setTimeout(() => setCurrentIndex(prev => prev - commentsPerPage), 100); // Delay for animation
        }
    };

    const handleNext = () => {
        if (currentIndex + commentsPerPage < totalComments) {
            setSlideDirection("right"); // Add right slide animation
            setTimeout(() => setCurrentIndex(prev => prev + commentsPerPage), 100); // Delay for animation
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    if (!comments || comments.length === 0) return <p>No comments to review.</p>;

    return (
        <div className="comment-review-container">
            <h1>Comments</h1>

            <div className="carousel-container">
                <button 
                    onClick={handlePrev} 
                    disabled={currentIndex === 0} 
                    className="arrow-button"
                >
                    ⬅
                </button>

                <div 
                    className="comments-list"
                    style={{
                        transform: `translateX(${slideDirection === "right" ? "-15px" : slideDirection === "left" ? "15px" : "0"})`,
                        transition: "transform 0.5s ease-in-out",
                    }}
                >
                    {comments.slice(currentIndex, currentIndex + commentsPerPage).map((comment) => (
                        <div key={comment.commentIdentifier} className="comment-box">
                            <div className="comment-details">
                                <p><strong>Name:</strong> {comment.name}</p>
                                <p><strong>Email:</strong> {comment.email}</p>
                                <p><strong>Comment:</strong> {comment.comment}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <button 
                    onClick={handleNext} 
                    disabled={currentIndex + commentsPerPage >= totalComments} 
                    className="arrow-button"
                >
                    ➡
                </button>
            </div>
        </div>
    );
};
