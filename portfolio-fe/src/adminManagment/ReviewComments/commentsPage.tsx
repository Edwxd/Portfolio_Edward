import { useEffect, useState } from "react";
import { commentsRequestModel } from "../../Models/Comments/commentsRequestModel";
import { fetchAllCommentsToReview } from "../../api/Comments/getAllComments";
import { acceptComment } from "../../api/Comments/acceptComment";
import { rejectComment } from "../../api/Comments/rejectComments";
import { deleteCommentById } from "../../api/Comments/deleteComment";

import "./commentPage.css";

export const CommentReviewPage = () => {
    const [reviewComments, setReviewComments] = useState<commentsRequestModel[]>([]);
    const [approvedComments, setApprovedComments] = useState<commentsRequestModel[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Load comments under review
    useEffect(() => {
        const loadReviewComments = async () => {
            try {
                const data = await fetchAllCommentsToReview();
                if (data) {
                    const filteredComments = data.filter(comment => comment.commentStatus === "COMMENT_REVIEW");
                    setReviewComments(filteredComments);
                    console.log("Filtered Review Comments:", filteredComments);
                }
            } catch (err) {
                console.error("Error fetching review comments:", err);
                setError("Failed to fetch review comments");
            } finally {
                setLoading(false);
            }
        };

        loadReviewComments();
    }, []);

    // Load approved comments
    useEffect(() => {
        const loadApprovedComments = async () => {
            try {
                const data = await fetchAllCommentsToReview();
                if (data) {
                    const filteredComments = data.filter(comment => comment.commentStatus === "COMMENT_APPROVED");
                    setApprovedComments(filteredComments);
                    console.log("Filtered Approved Comments:", filteredComments);
                }
            } catch (err) {
                console.error("Error fetching approved comments:", err);
                setError("Failed to fetch approved comments");
            } finally {
                setLoading(false);
            }
        };

        loadApprovedComments();
    }, []);

    const handleApprove = async (commentId: string) => {
        try {
            await acceptComment(commentId);
            alert("Comment approved successfully!");

            // Move comment from review list to approved list
            const approvedComment = reviewComments.find(comment => comment.commentIdentifier === commentId);
            if (approvedComment) {
                setReviewComments(prev => prev.filter(comment => comment.commentIdentifier !== commentId));
                setApprovedComments(prev => [...prev, { ...approvedComment, commentStatus: "COMMENT_APPROVED" }]);
            }
        } catch (error) {
            alert("Failed to approve comment.");
            console.error("Error approving comment:", error);
        }
    };

    const handleReject = async (commentId: string) => {
        try {
            await rejectComment(commentId);
            alert("Comment rejected successfully!");

            // Remove from review comments
            setReviewComments(prev => prev.filter(comment => comment.commentIdentifier !== commentId));
        } catch (error) {
            alert("Failed to reject comment.");
            console.error("Error rejecting comment:", error);
        }
    };

    const handleDelete = async (commentId: string) => {
        try {
            await deleteCommentById(commentId);
            alert("Comment deleted successfully!");

            // Remove from approved comments
            setApprovedComments(prev => prev.filter(comment => comment.commentIdentifier !== commentId));
        } catch (error) {
            alert("Failed to delete comment.");
            console.error("Error deleting comment:", error);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h1>Comment Review Page</h1>

            <h2>Review Comments</h2>
            {/* Comments Under Review */}
            <div className="comments-list">
                {reviewComments.length === 0 ? (
                    <p style={{ color: "black" }}>No comments to review</p>
                ) : (
                    reviewComments.map((comment) => (
                        <div key={comment.commentIdentifier} className="comment-box">
                            <div className="comment-details">
                                <p><strong>Name:</strong> {comment.name}</p>
                                <p><strong>Email:</strong> {comment.email}</p>
                                <p><strong>Comment:</strong> {comment.comment}</p>
                            </div>
                            <div className="state-approval">
                                <div className="comment-status-approved">
                                    <button onClick={() => handleApprove(comment.commentIdentifier)}>Approve</button>
                                </div>
                                <div className="comment-status-rejected">
                                    <button onClick={() => handleReject(comment.commentIdentifier)}>Reject</button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <h2>Posted Comments</h2>

            {/* Approved and Posted Comments */}
            <div className="comments-list">
                {approvedComments.length === 0 ? (
                    <p style={{ color: "black" }}>No approved comments</p>
                ) : (
                    approvedComments.map((comment) => (
                        <div key={comment.commentIdentifier} className="comment-box">
                            <div className="comment-details">
                                <p><strong>Name:</strong> {comment.name}</p>
                                <p><strong>Email:</strong> {comment.email}</p>
                                <p><strong>Comment:</strong> {comment.comment}</p>
                            </div>
                            <div className="state-approval">
                                <div className="comment-status-rejected">
                                    <button onClick={() => handleDelete(comment.commentIdentifier)}>Delete</button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};


