import { useState, useEffect } from "react";
import { checkAuth } from "../Lib/CheckAuth";
import Alert from "./Alert";
import {
  collection,
  addDoc,
  Timestamp,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db, auth } from "../Firebase/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import useSWR, { useSWRConfig } from "swr";
import { useSelector } from "react-redux";
import { AiFillDelete, AiOutlineLoading } from "react-icons/ai";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

function Comments({ id }) {
  const [comment, setComment] = useState("");
  const [viewAlert, setViewAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const [textAreaHeight, setTextAreaHeight] = useState(100);
  const [isPosting, setIsPosting] = useState(false);
  const [deletingCommentId, setDeletingCommentId] = useState(null);

  const { mutate } = useSWRConfig();
  const { data, error } = useSWR(`/api/comments/${id}`, fetcher);
  const user = useSelector((state) => state.user);
  
  // Use Firebase Auth hook for real-time auth state
  const [firebaseUser, loading, authError] = useAuthState(auth);

  const showAlert = (message, type) => {
    setAlertMessage(message);
    setAlertType(type);
    setViewAlert(true);
    
    setTimeout(() => {
      setViewAlert(false);
    }, 3000);
  };

  // Helper function to get user profile image
  const getUserProfileImage = (user) => {
    // Try different sources for profile image
    const sources = [
      user?.photoURL,
      user?.picture,
      user?.avatar_url,
      // If using Redux user state
      user?.photo,
      user?.profilePicture
    ];

    // Return the first valid URL
    for (const source of sources) {
      if (source && typeof source === 'string' && source.trim() !== '') {
        return source;
      }
    }

    // Fallback to a default avatar or generate one based on email
    if (user?.email) {
      // Generate a Gravatar URL based on email
      const emailHash = btoa(user.email.toLowerCase().trim()).replace(/[^a-zA-Z0-9]/g, '');
      return `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || user.name || user.email)}&background=6366f1&color=fff&size=128`;
    }

    return '/default-avatar.png'; // Ultimate fallback
  };

  // Helper function to get user display name
  const getUserDisplayName = (user) => {
    const names = [
      user?.displayName,
      user?.name,
      user?.email?.split('@')[0], // Use email username as fallback
      'Anonymous User'
    ];

    for (const name of names) {
      if (name && typeof name === 'string' && name.trim() !== '') {
        return name;
      }
    }

    return 'Anonymous User';
  };

  const handleDeleteComment = async (commentId) => {
    if (!firebaseUser) {
      showAlert("Please Sign In to delete comments", "error");
      return;
    }

    const commentToDelete = data?.comments?.find(c => c.id === commentId);
    if (!commentToDelete || commentToDelete.userId !== firebaseUser.uid) {
      showAlert("You can only delete your own comments", "error");
      return;
    }

    setDeletingCommentId(commentId);

    try {
      const ref = doc(db, "posts", id, "comments", commentId);
      await deleteDoc(ref);
      
      showAlert("Comment deleted successfully", "success");
      mutate(`/api/comments/${id}`);
    } catch (error) {
      console.error("Error deleting comment:", error);
      showAlert("Failed to delete comment: " + error.message, "error");
    } finally {
      setDeletingCommentId(null);
    }
  };

  const handlePost = async (e) => {
    e.preventDefault();
    
    if (!comment.trim()) {
      showAlert("Please enter a comment", "error");
      return;
    }

    if (!firebaseUser) {
      showAlert("Please Sign In to comment", "error");
      return;
    }

    setIsPosting(true);

    try {
      // Get the best available profile image and name
      const userImage = getUserProfileImage(firebaseUser);
      const userName = getUserDisplayName(firebaseUser);

      console.log('=== POSTING COMMENT DEBUG ===');
      console.log('Firebase User:', {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        displayName: firebaseUser.displayName,
        photoURL: firebaseUser.photoURL,
        emailVerified: firebaseUser.emailVerified
      });
      console.log('Selected user image:', userImage);
      console.log('Selected user name:', userName);
      
      const docData = {
        userName: userName,
        userImage: userImage,
        comment: comment.trim(),
        date: Timestamp.now(),
        userId: firebaseUser.uid,
        // Store additional metadata for debugging
        originalPhotoURL: firebaseUser.photoURL,
        originalDisplayName: firebaseUser.displayName,
        createdAt: new Date().toISOString(),
      };

      console.log('Comment data to be saved:', docData);

      const ref = collection(db, "posts", id, "comments");
      const docRef = await addDoc(ref, docData);
      
      console.log('Comment posted successfully with ID:', docRef.id);
      
      setComment("");
      setTextAreaHeight(100);
      showAlert("Comment posted successfully", "success");
      mutate(`/api/comments/${id}`);
      
    } catch (error) {
      console.error('=== COMMENT POST ERROR ===');
      console.error('Error:', error);
      showAlert(`Failed to post comment: ${error.message}`, "error");
    } finally {
      setIsPosting(false);
    }
  };

  const handleTextareaChange = (e) => {
    setComment(e.target.value);
    const newHeight = e.target.scrollHeight > 100 ? e.target.scrollHeight : 100;
    setTextAreaHeight(Math.min(newHeight, 300));
  };

  const handleReset = (e) => {
    e.preventDefault();
    setComment("");
    setTextAreaHeight(100);
  };

  // Image error handler
  const handleImageError = (e, fallbackName = 'User') => {
    console.log('Image failed to load:', e.target.src);
    
    // Try generated avatar as fallback
    const generatedAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(fallbackName)}&background=6366f1&color=fff&size=128`;
    
    if (e.target.src !== generatedAvatar) {
      e.target.src = generatedAvatar;
    } else {
      // If generated avatar also fails, use a solid color div
      e.target.style.display = 'none';
      const parent = e.target.parentElement;
      if (parent && !parent.querySelector('.fallback-avatar')) {
        const fallbackDiv = document.createElement('div');
        fallbackDiv.className = 'fallback-avatar mt-2 rounded-full w-8 h-8 sm:w-10 sm:h-10 bg-indigo-500 flex items-center justify-center text-white font-semibold text-sm';
        fallbackDiv.textContent = fallbackName.charAt(0).toUpperCase();
        parent.appendChild(fallbackDiv);
      }
    }
  };

  // Error state
  if (error) {
    return (
      <div className="mx-auto max-w-screen-md">
        <Alert show={true} type="error" message="Failed to load comments. Please refresh the page." />
      </div>
    );
  }

  // Loading state
  if (!data) {
    return (
      <div className="mx-auto max-w-screen-md flex justify-center py-8">
        <AiOutlineLoading className="animate-spin text-2xl text-gray-500" />
      </div>
    );
  }

  return (
    <>
      <Alert show={viewAlert} type={alertType} message={alertMessage} />
      
      {/* Debug info */}
      {/* {process.env.NODE_ENV === 'development' && firebaseUser && (
        <div className="mx-auto max-w-screen-md mb-4 p-3 bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 rounded text-xs">
          <h4 className="font-semibold mb-2">Profile Debug:</h4>
          <p><strong>Display Name:</strong> {firebaseUser.displayName || 'None'}</p>
          <p><strong>Photo URL:</strong> {firebaseUser.photoURL || 'None'}</p>
          <p><strong>Selected Image:</strong> {getUserProfileImage(firebaseUser)}</p>
          <p><strong>Selected Name:</strong> {getUserDisplayName(firebaseUser)}</p>
        </div>
      )} */}
      
      {/* Comment Form */}
      <div className="flex flex-wrap mb-6 mt-6 mx-auto max-w-screen-md">
        <div className="relative container p-1 appearance-none label-floating">
          {!firebaseUser ? (
            <div className="text-center p-4 bg-gray-100 dark:bg-gray-800 rounded">
              <p className="text-gray-600 dark:text-gray-400">Please sign in to post comments</p>
            </div>
          ) : (
            <>
              {/* Preview of current user */}
              <div className="flex items-center mb-3 p-2 bg-gray-50 dark:bg-gray-800 rounded">
                <div className="flex-shrink-0 mr-3 relative">
                  <img
                    className="rounded-full w-8 h-8 object-cover"
                    src={getUserProfileImage(firebaseUser)}
                    alt={getUserDisplayName(firebaseUser)}
                    onError={(e) => handleImageError(e, getUserDisplayName(firebaseUser))}
                  />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Commenting as: {getUserDisplayName(firebaseUser)}
                  </p>
                </div>
              </div>
              
              <form onSubmit={handlePost}>
                <textarea
                  className="resize-none tracking-wide py-2 px-4 mb-3 leading-relaxed appearance-none block w-full bg-gray-100 border border-gray-100 dark:bg-gray-800 dark:border-gray-800 rounded focus:outline-none focus:bg-white focus:border-gray-300 dark:focus:bg-gray-900 dark:focus:border-gray-700 disabled:opacity-50"
                  id="message"
                  type="text"
                  placeholder="What are your thoughts..?"
                  rows="3"
                  value={comment}
                  style={{ height: textAreaHeight }}
                  onChange={handleTextareaChange}
                  disabled={isPosting}
                  maxLength={1000}
                />
                
                <div className="text-xs text-gray-500 text-right mb-2">
                  {comment.length}/1000
                </div>
                
                <div className="text-right">
                  <button
                    type="button"
                    className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1.5 rounded text-sm font-semibold mr-3 disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={handleReset}
                    disabled={isPosting}
                  >
                    Reset
                  </button>
                  <button
                    type="submit"
                    className="bg-indigo-500 hover:bg-indigo-600 dark:bg-indigo-600 dark:hover:bg-indigo-700 text-white px-3 py-1.5 rounded text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center"
                    disabled={isPosting || !comment.trim()}
                  >
                    {isPosting ? (
                      <>
                        <AiOutlineLoading className="animate-spin mr-2" />
                        Posting...
                      </>
                    ) : (
                      'Post Comment'
                    )}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>

      {/* Comments List */}
      <div className="mx-auto max-w-screen-md">
        <div className="m-2 md:m-0">
          {data.comments && data.comments.length > 0 && (
            <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
              {data.comments.length} {data.comments.length === 1 ? 'comment' : 'comments'}
            </div>
          )}

          {data.comments && data.comments.length > 0 ? (
            data.comments.map((commentData) => (
              <div className="space-y-4 py-3" key={commentData.id}>
                <div className="flex">
                  <div className="flex-shrink-0 mr-1.5 md:mr-3 relative">
                    <img
                      className="mt-2 rounded-full w-8 h-8 sm:w-10 sm:h-10 object-cover border-2 border-gray-200 dark:border-gray-600"
                      src={commentData.userImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(commentData.userName)}&background=6366f1&color=fff&size=128`}
                      alt={commentData.userName}
                      onError={(e) => handleImageError(e, commentData.userName)}
                    />
                  </div>
                  <div className="flex-1 border border-gray-300 dark:border-gray-500 rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed relative">
                    <div className="flex justify-between items-start">
                      <div>
                        <strong className="text-gray-700 dark:text-gray-200">
                          {commentData.userName}
                        </strong>
                        <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                          {commentData.date}
                        </span>
                        {/* Debug info for each comment */}
                        {process.env.NODE_ENV === 'development' && (
                          <div className="text-xs text-gray-400 mt-1">
                            {/* Image: {commentData.userImage ? 'Has URL' : 'No URL'} */}
                            {/* {commentData.originalPhotoURL && ` | Original: ${commentData.originalPhotoURL.substring(0, 30)}...`} */}
                          </div>
                        )}
                      </div>
                      
                      {firebaseUser && commentData.userId === firebaseUser.uid && (
                        <button
                          className="text-red-500 hover:text-red-700 p-1 rounded transition-colors disabled:opacity-50"
                          onClick={() => handleDeleteComment(commentData.id)}
                          disabled={deletingCommentId === commentData.id}
                          aria-label="Delete comment"
                        >
                          {deletingCommentId === commentData.id ? (
                            <AiOutlineLoading className="animate-spin" />
                          ) : (
                            <AiFillDelete />
                          )}
                        </button>
                      )}
                    </div>
                    
                    <div className="mt-2">
                      {commentData.comment.split("\n").map((line, index) => (
                        <p
                          className="text-sm text-gray-600 dark:text-gray-300"
                          key={index}
                        >
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <p>No comments yet. Be the first to comment!</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Comments;