import { useEffect, useState } from "react";
import { commentsRequestModel } from "../../Models/Comments/commentsRequestModel";
import { fetchAllCommentsToReview } from "../../api/Comments/getAllComments";
import { acceptComment } from "../../api/Comments/acceptComment";
import { rejectComment } from "../../api/Comments/rejectComments";
import "./commentPage.css";


export const CommentReviewPage = () => {
    const [comments, setComments] = useState<commentsRequestModel[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadComments = async () => {
            try {
                const data = await fetchAllCommentsToReview();
                if (data) {
                    const filteredComments = data.filter(comment => comment.commentStatus === "COMMENT_REVIEW");
                    setComments(filteredComments);
                    console.log("Filtered Comments:", filteredComments);
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

    const handleApprove = async (commentId: string) => {
        try {
            await acceptComment(commentId); // Call API to approve the comment
            alert("Comment approved successfully!");
            
            // Update state to remove approved comment
            setComments(prevComments => prevComments?.filter(comment => comment.commentStatus !== "COMMENT_REVIEW") || []);
            window.location.reload(); // Refresh the page to reflect the changes
        } catch (error) {
            alert("Failed to approve comment.");
            console.error("Error approving comment:", error);
        }
    };


    const handleReject = async (commentId: string) => {
        try {
            await rejectComment(commentId); // Call API to reject the comment
            alert("Comment rejected successfully!");

            setComments(prevComments => prevComments?.filter(comment => comment.commentStatus !== "COMMENT_REVIEW") || []);
            window.location.reload(); // Refresh the page to reflect the changes
        } catch (error) {
            alert("Failed to rejec comment.");
            console.error("Error approving comment:", error);
        }
    };


    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    if (!comments || comments.length === 0) return <p style={{color:"black"}}>No comments to review</p>;

    return (
        <div>
            <h1>Comment Review Page</h1>
            <div className="comments-list">
                {comments.map((comment) => (
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
                ))}
            </div>
        </div>
    );
};
