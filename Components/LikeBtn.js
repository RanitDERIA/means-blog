import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import useSWR, { useSWRConfig } from "swr";
import { AiOutlineHeart, AiFillHeart, AiOutlineLoading } from "react-icons/ai";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

function LikeBtn({ id }) {
  const { theme } = useTheme();
  const [loading, setLoading] = useState(false);
  const [hasLiked, setHasLiked] = useState(false);
  const { mutate } = useSWRConfig();
  
  const { data, error } = useSWR(`/api/likes/${id}`, fetcher);

  // Check localStorage on component mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '[]');
      setHasLiked(likedPosts.includes(id));
    }
  }, [id]);

  const handleClick = async () => {
    if (loading) return;
    
    setLoading(true);
    
    try {
      // Generate a unique browser ID
      let browserId = '';
      if (typeof window !== 'undefined') {
        browserId = localStorage.getItem('browserId');
        if (!browserId) {
          browserId = 'browser_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
          localStorage.setItem('browserId', browserId);
        }
      }
      
      console.log('Attempting to like/unlike post:', id, 'with browser ID:', browserId);
      
      const response = await fetch("/api/like-blog", {
        method: "POST",
        body: JSON.stringify({ 
          id, 
          browserId: browserId 
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log('Response status:', response.status);
      
      if (response.ok) {
        const result = await response.json();
        console.log('Like operation successful:', result);
        
        // Update localStorage
        if (typeof window !== 'undefined') {
          const likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '[]');
          if (result.action === 'liked') {
            if (!likedPosts.includes(id)) {
              likedPosts.push(id);
            }
            setHasLiked(true);
          } else {
            const index = likedPosts.indexOf(id);
            if (index > -1) likedPosts.splice(index, 1);
            setHasLiked(false);
          }
          localStorage.setItem('likedPosts', JSON.stringify(likedPosts));
        }
        
        // Refresh the likes data
        mutate(`/api/likes/${id}`);
      } else {
        const errorData = await response.json();
        console.error('Error response:', errorData);
        alert('Failed to update like. Please try again.');
      }
    } catch (error) {
      console.error('Network error:', error);
      alert('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle loading state for initial data fetch
  if (error) {
    console.error('Error fetching likes:', error);
    return (
      <div className="justify-center pt-16 pb-6 flex flex-row items-center">
        <span className="text-red-500">Error loading likes</span>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="justify-center pt-16 pb-6 flex flex-row items-center">
        <AiOutlineLoading
          className="animate-spin"
          style={{ fontSize: "1.5rem" }}
        />
      </div>
    );
  }

  return (
    <div className="justify-center pt-16 pb-6 flex flex-row items-center">
      {loading ? (
        <AiOutlineLoading
          className="animate-spin"
          style={{ fontSize: "1.5rem" }}
        />
      ) : (
        <>
          <button 
            onClick={handleClick} 
            disabled={loading}
            className="transition-transform hover:scale-110 disabled:opacity-50"
            aria-label={hasLiked ? "Unlike post" : "Like post"}
          >
            {hasLiked ? (
              <AiFillHeart
                style={{ fontSize: "2rem", color: "rgba(220, 38, 38)" }}
              />
            ) : (
              <AiOutlineHeart 
                style={{ 
                  fontSize: "2rem", 
                  color: theme === 'dark' ? '#D1D5DB' : '#374151' 
                }} 
              />
            )}
          </button>
          <span 
            style={{ fontSize: "1rem", paddingLeft: "16px" }}
            className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}
          >
            {data.totalLikes || 0}
          </span>
          
          {/* Debug info */}
          {process.env.NODE_ENV === 'development' && (
            <span className="ml-2 text-xs text-gray-500">
            </span>
          )}
        </>
      )}
    </div>
  );
}

export default LikeBtn;