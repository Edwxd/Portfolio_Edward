import { useEffect, useState } from "react";
import { commentsRequestModel } from "../../Models/Comments/commentsRequestModel";
import { fetchAllCommentsToReview } from "../../api/Comments/getAllComments";
import "./acceptedComment.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight, faComment, faUser, faEnvelope } from "@fortawesome/free-solid-svg-icons";

export const AcceptedComment = () => {
    const [comments, setComments] = useState<commentsRequestModel[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [animation, setAnimation] = useState<string>("");

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
            setAnimation("slide-out-right");
            setTimeout(() => {
                setCurrentIndex(prev => prev - commentsPerPage);
                setAnimation("slide-in-left");
            }, 300);
            
            setTimeout(() => {
                setAnimation("");
            }, 600);
        }
    };

    const handleNext = () => {
        if (currentIndex + commentsPerPage < totalComments) {
            setAnimation("slide-out-left");
            setTimeout(() => {
                setCurrentIndex(prev => prev + commentsPerPage);
                setAnimation("slide-in-right");
            }, 300);
            
            setTimeout(() => {
                setAnimation("");
            }, 600);
        }
    };

    if (loading) return <div className="loading-state">Loading comments...</div>;
    if (error) return <div className="error-state">{error}</div>;
    if (!comments || comments.length === 0) return <div className="empty-state">No comments to display.</div>;

    return (
        <div className="comments-section">
            <div className="comments-container">
                <div className="section-header">
                    <h2 className="section-title">
                        <FontAwesomeIcon icon={faComment} className="section-icon" /> 
                        Visitor Comments
                    </h2>
                    <div className="comment-counter">
                        Showing {Math.min(currentIndex + 1, totalComments)} - {Math.min(currentIndex + commentsPerPage, totalComments)} of {totalComments}
                    </div>
                </div>
                
                <div className="divider"></div>
                
                <div className="carousel-container">
                    <button 
                        onClick={handlePrev} 
                        disabled={currentIndex === 0} 
                        className="nav-button prev-button"
                        aria-label="Previous comments"
                    >
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </button>

                    <div className={`comments-list ${animation}`}>
                        {comments.slice(currentIndex, currentIndex + commentsPerPage).map((comment) => (
                            <div key={comment.commentIdentifier} className="comment-card">
                                <div className="comment-header">
                                    <div className="commenter-info">
                                        <div className="commenter-name">
                                            <FontAwesomeIcon icon={faUser} className="info-icon" /> 
                                            {comment.name}
                                        </div>
                                        <div className="commenter-email">
                                            <FontAwesomeIcon icon={faEnvelope} className="info-icon" /> 
                                            {comment.email}
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="comment-body">
                                    <p>{comment.comment}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button 
                        onClick={handleNext} 
                        disabled={currentIndex + commentsPerPage >= totalComments} 
                        className="nav-button next-button"
                        aria-label="Next comments"
                    >
                        <FontAwesomeIcon icon={faChevronRight} />
                    </button>
                </div>
                
                <div className="pagination-dots">
                    {Array.from({ length: Math.ceil(totalComments / commentsPerPage) }).map((_, index) => (
                        <span 
                            key={index} 
                            className={`page-dot ${currentIndex / commentsPerPage === index ? 'active' : ''}`}
                            onClick={() => {
                                setAnimation(index < currentIndex / commentsPerPage ? "slide-out-right" : "slide-out-left");
                                setTimeout(() => {
                                    setCurrentIndex(index * commentsPerPage);
                                    setAnimation(index < currentIndex / commentsPerPage ? "slide-in-left" : "slide-in-right");
                                }, 300);
                                
                                setTimeout(() => {
                                    setAnimation("");
                                }, 600);
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};