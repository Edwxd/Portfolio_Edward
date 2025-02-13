// import { useEffect, useState } from "react";
// import { commentsRequestModel } from "../../Models/Comments/commentsRequestModel";
// import { fetchAllCommentsToReview } from "../../api/Comments/getAllComments";
// import { acceptComment } from "../../api/Comments/acceptComment";
// import { rejectComment } from "../../api/Comments/rejectComments";
// import "./commentPage.css";


// interface EditCommentProps {
//   comment: commentsRequestModel;

// }
// export const CommentReviewPage = (props: EditCommentProps) => {
//     const [comments, setComments] = useState<commentsRequestModel[] | null>(null);
//     const [loading, setLoading] = useState<boolean>(true);
//     const [error, setError] = useState<string | null>(null);

//     useEffect(() => {
//         const loadComments = async () => {
//             try {
//                 const data = await fetchAllCommentsToReview();
//                 if (data) {
//                     const filteredComments = data.filter(comment => comment.commentStatus === "COMMENT_REVIEW");
//                     setComments(filteredComments);
//                     console.log("Filtered Comments:", filteredComments);
//                 }
//             } catch (err) {
//                 console.error("Error fetching comments:", err);
//                 setError("Failed to fetch the comments");
//             } finally {
//                 setLoading(false);
//             }
//         };

//         loadComments();
//     }, []);

//     const handleApprove = async (comment: string) => {
//         try {
//             await acceptComment(comment); // Call API to approve the comment
//             alert("Comment approved successfully!");
            
//             // Update state to remove approved comment
//             setComments(prevComments => prevComments?.filter(comment => comment.commentIdentifier !== commentId) || []);
//             window.location.reload(); // Refresh the page to reflect the changes
//         } catch (error) {
//             alert("Failed to approve comment.");
//             console.error("Error approving comment:", error);
//         }
//     };

//     if (loading) return <p>Loading...</p>;
//     if (error) return <p>{error}</p>;
//     if (!comments || comments.length === 0) return <p>No comments to review.</p>;

//     return (
//         <div>
//             <h1>Comment Review Page</h1>
//             <div className="comments-list">
//                 {comments.map((comment) => (
//                     <div key={comment.commentIdentifier} className="comment-box">
//                       <div className="comment-details">
//                         <p><strong>Name:</strong> {comment.name}</p>
//                         <p><strong>Email:</strong> {comment.email}</p>
//                         <p><strong>Comment:</strong> {comment.comment}</p>

//                         </div>
//                         <div className="state-approval">
//                             <div className="comment-status-approved">
//                                 <button onClick={() => handleApprove(comment.commentIdentifier)}>Approve</button>
//                             </div>
//                             <div className="comment-status-rejected">
//                                 <button onClick={() => rejectComment(comment.commentIdentifier)}>Reject</button>
//                             </div>
//                         </div>


       
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };
